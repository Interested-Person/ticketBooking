import { useEffect, useState } from "react";
import { useEvent } from "../hooks/useEvent";
import { useAuth } from "../hooks/useAuth";
import EventCard from "../components/EventCard";
import type {Event} from "../types";
interface BookingEvent {
  eventId: string;
  userId: string;
  seatCount: number;
}



const Bookings = () => {
  const { user } = useAuth();
  const { getUserBookings, getEventById } = useEvent();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        console.log("Fetching bookings for user:", user.uid);
        const bookings: BookingEvent[] = await getUserBookings(user.uid);

        const eventPromises = bookings.map((booking) =>
          getEventById(booking.eventId)
        );

        const resolvedEvents = await Promise.all(eventPromises);

        // Filter out nulls in case some events are not found
        setEvents(resolvedEvents.filter((e) => e !== null) as Event[]);
        setLoading(false);
      } catch (err) {
        console.error("Error loading bookings:", err);
        setEvents([]);
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
        {events.map((event,index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Bookings;
