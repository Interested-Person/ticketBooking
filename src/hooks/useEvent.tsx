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

import type { Event } from "../types";

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
          totalCapacity: data.totalCapacity ?? data.totalSeats, // fallback if needed
          availableCapacity: data.availableCapacity ?? data.availableSeats, // fallback if needed
          museumName: data.museumName ?? data.TheatreName, // fallback if needed
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
