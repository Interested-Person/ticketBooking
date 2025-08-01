import { useEffect, useState } from "react";
import { useEvent } from "../hooks/useEvent";
import { useAuth } from "../hooks/useAuth";
import EventCard from "../components/EventCard";
import type { Event } from "../types";

export interface BookingEvent {
  id: string;
  eventId: string;
  userId: string;
  seatCount: number;
}

interface EventWithQuantity extends Event {
  quantity: number;
}

const Bookings = () => {
  const { user } = useAuth();
  const { getUserBookings, getEventById, getQuantity } = useEvent();
  const [eventsWithQuantities, setEventsWithQuantities] = useState<EventWithQuantity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const bookings: BookingEvent[] = await getUserBookings(user.uid);

        // Remove duplicates by eventId
        const uniqueEventMap = new Map<string, BookingEvent>();
        bookings.forEach((booking) => {
          if (!uniqueEventMap.has(booking.eventId)) {
            uniqueEventMap.set(booking.eventId, booking);
          }
        });
        const uniqueBookings = Array.from(uniqueEventMap.values());

        const eventData = await Promise.all(
          uniqueBookings.map(async (booking) => {
            const event = await getEventById(booking.eventId);
            if (!event) return null;
            const quantity = await getQuantity(booking.eventId);
            if (quantity === 0) return null;
            return { ...event, quantity };
          })
        );

        setEventsWithQuantities(eventData.filter(Boolean) as EventWithQuantity[]);
      } catch (err) {
        console.error("Error loading bookings:", err);
        setEventsWithQuantities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) return <div>Loading user...</div>;
  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="text-white">
      <h1 className="text-xl font-bold p-4">My Bookings</h1>
      <div className="flex gap-5 p-4 flex-wrap">
        {eventsWithQuantities.map((event, index) => (
          <EventCard key={index} event={event} quantity={event.quantity} />
        ))}
      </div>
    </div>
  );
};

export default Bookings;
