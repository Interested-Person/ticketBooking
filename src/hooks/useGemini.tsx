import { GoogleGenAI } from "@google/genai";
import { useEvent } from "./useEvent";
import { useAuth } from "./useAuth";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyC0rL9Eswolp56Is0CqK9UsCF1GAp-23ok", 
});

export const useGemini = () => {
  const { ticketsFeed, bookEvent,unbookEvent,getUserBookings } = useEvent();
  const {user} = useAuth();

  const getEventBookingStatus = async () => {
    if(!user) return [];
    const bookings = await getUserBookings(user.uid);
    const bookedids = bookings.map((b) => b.id);
    return bookedids;
  };

  const generateContent = async (prompt: string, history: string[]) => {
    if(!user) return "❌ You must be logged in to use this feature.";
    try {
      const userBookings = await getUserBookings(user.uid);
      const bookedIds = new Set(userBookings.map((b) => b.id));

      const formattedTickets = ticketsFeed
        ?.map((ticket, index) => {
          const isBooked = bookedIds.has(ticket.id);
          return `${index + 1}. ${ticket.name} – ${ticket.time} - Available: ${ticket.availableCapacity
            } - Museum: ${ticket.museumName} - Description: ${ticket.description} - Price: ${ticket.price
            } -id${ticket.id}- ${isBooked ? " ✅ Booked by you" : ""}`;
        })
        .join("\n") || "No events available.";

      const chatContext = [
        {
          role: "user",
          parts: [
            {
              text: `You are an AI assistant for museum events.

Here are current events:
${formattedTickets}

If the user says things like "book 2 seats for event 1", then say exactly this:
__BOOK__ event_id=<id> seat_count=<count>

If the user says "cancel/unbook event 2", then say:
__UNBOOK__ event_id=<id>

Otherwise just reply normally.

Conversation:
${history.join("\n")}
User: ${prompt}`,
            },
          ],
        },
      ];

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: chatContext,
      });

      const text = result.text ?? "";

      // Check if Gemini decided to issue a command
      if (text.startsWith("__BOOK__")) {
        const match = text.match(/event_id=(\w+)\s+seat_count=(\d+)/);
        if (match) {
          const [, id, seatStr] = match;
          const seatCount = parseInt(seatStr);
          return await bookEvent(id, seatCount,user?.uid);
        }
      } else if (text.startsWith("__UNBOOK__")) {
        const match = text.match(/event_id=(\w+)/);
        if (match) {
          const [, id] = match;
          return await unbookEvent(id);
        }
      }

      return text;
    } catch (error) {
      console.error("Gemini error:", error);
      return "❌ Oops! Something went wrong.";
    }
  };


  return {
    generateContent,
    bookEvent,
    unbookEvent,
    getUserBookings,
    getEventBookingStatus,
  };
};
