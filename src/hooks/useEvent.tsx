import React, { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Event } from "../types";
import { useAuth } from "./useAuth";

interface EventContextType {
  ticketsFeed: Event[];
  addEvent: (formData: Omit<Event, "id">) => Promise<void>;
  bookEvent: (eventId: string, seatCount: number, userId: string) => Promise<string>;
  getUserBookings: (userId: string) => Promise<any[]>;
  loading: boolean;
  unbookEvent: (id: string) => Promise<string>;
  deleteEvent: (eventID: string) => Promise<void>
}

const EventContext = createContext<EventContextType | null>(null);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ticketsFeed, setTicketFeed] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    setLoading(true);
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, orderBy("time"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const events: Event[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          imageURL: data.imageURL,
          TheatreName: data.TheatreName,
          time:
            data.time instanceof Timestamp
              ? data.time.toDate()
              : new Date(data.time),
          description: data.description,
          price: data.price,
          totalCapacity: data.totalCapacity,
          availableCapacity: data.availableCapacity,
          museumName: data.museumName,
        };
      });

      setTicketFeed(events);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //for admins
  const addEvent = async (formData: Omit<Event, "id">) => {
    try {
      await addDoc(collection(db, "events"), {
        ...formData,
        time: formData.time.toISOString(),
      });
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  //booking an event
  const bookEvent = async (eventId: string, seatCount: number, userId: string) => {
    // console.log
    try {
      if (seatCount <= 0) return "less than 1 seat  ";
      const eventRef = doc(db, "events", eventId);
      const eventSnap = await getDoc(eventRef);

      if (!eventSnap.exists()) return "Event not found";

      const eventData = eventSnap.data();
      const currentCapacity = eventData.availableCapacity ?? 0;

      if (currentCapacity < seatCount) {
        throw new Error("Not enough seats available");
      }

      await updateDoc(eventRef, {
        availableCapacity: currentCapacity - seatCount,
      });

      await addDoc(collection(db, "bookings"), {
        eventId,
        userId,
        seatCount,
        timestamp: Timestamp.now(),
      });
return `✅ Booked ${seatCount} seats for event ${eventId}.`;
    } catch (error) {
      console.error("Error booking event: ", error);
      return "❌ Failed to book event.";
    }
  };
  const unbookEvent = async (id: string) => {
    if (!user) return "❌ You must be logged in to unbook.";
    try {
      const q = query(
        collection(db, "bookings"),
        where("uid", "==", user.uid),
        where("id", "==", id)
      );
      const snapshot = await getDocs(q);
      snapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "bookings", docSnap.id));
      });
      return `✅ Booking for event ${id} cancelled.`;
    } catch (error) {
      console.error("Unbooking error:", error);
      return "❌ Failed to cancel booking.";
    }
  };



  const getUserBookings = async (userId: string) => {
    try {
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching user bookings: ", error);
      return [];
    }
  };

  const deleteEvent = async (eventID: string) => {
    console.log("hi")
    try {
      await deleteDoc(doc(db, "events", eventID));
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  return (
    <EventContext.Provider
      value={{
        ticketsFeed,
        addEvent,
        bookEvent,
        unbookEvent,
        getUserBookings,
        loading,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
