import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export interface Event {
  name: string;
  totalSeats: number;
  availableSeats: number;
  imageURL: string;
  TheatreName: string;
  time: Date;
  description: string;
  price: number;
  id: string;
}

export const useEvent = () => {
  const [ticketsFeed, setTicketFeed] = useState<Event[]>([]);

  // Realtime fetching of events
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
        };
      });

      setTicketFeed(events);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Adding new event
  const addEvent = async (formData: Omit<Event, "id">) => {
    try {
      await addDoc(collection(db, "events"), {
        ...formData,
        time: formData.time.toISOString(), // store in ISO format
      });
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  return {
    ticketsFeed,
    addEvent,
  };
};
