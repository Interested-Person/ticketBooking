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
} from "firebase/firestore";
import { db } from "../firebase";
import type { Event } from "../types";

interface EventContextType {
  ticketsFeed: Event[];
  addEvent: (formData: Omit<Event, "id">) => Promise<void>;
  bookEvent: (eventId: string, seatCount: number, userId: string) => Promise<void>;
  getUserBookings: (userId: string) => Promise<any[]>;
}

const EventContext = createContext<EventContextType | null>(null);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ticketsFeed, setTicketFeed] = useState<Event[]>([]);

  useEffect(() => {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, orderBy("time"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const events: Event[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          totalSeats: data.totalSeats,
          availableSeats: data.availableSeats,
          imageURL: data.imageURL,
          TheatreName: data.TheatreName,
          time:
            data.time instanceof Timestamp
              ? data.time.toDate()
              : new Date(data.time),
          description: data.description,
          price: data.price,
          totalCapacity: data.totalCapacity ?? data.totalSeats,
          availableCapacity: data.availableCapacity ?? data.availableSeats,
          museumName: data.museumName ?? data.TheatreName,
        };
      });

      setTicketFeed(events);
    });

    return () => unsubscribe();
  }, []);

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

  const bookEvent = async (eventId: string, seatCount: number, userId: string) => {
    try {
      const eventRef = doc(db, "events", eventId);
      const eventSnap = await getDoc(eventRef);

      if (!eventSnap.exists()) throw new Error("Event not found");

      const eventData = eventSnap.data();
      const currentSeats = eventData.availableSeats ?? 0;

      if (currentSeats < seatCount) {
        throw new Error("Not enough seats available");
      }

      await updateDoc(eventRef, {
        availableSeats: currentSeats - seatCount,
      });

      await addDoc(collection(db, "bookings"), {
        eventId,
        userId,
        seatCount,
        timestamp: Timestamp.now(),
      });

      console.log(`Booked ${seatCount} seats for user ${userId}`);
    } catch (error) {
      console.error("Error booking event: ", error);
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

  return (
    <EventContext.Provider
      value={{
        ticketsFeed,
        addEvent,
        bookEvent,
        getUserBookings,
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
