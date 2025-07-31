import { GoogleGenAI } from "@google/genai";
import { useEvent } from "./useEvent";
import { useAuth } from "./useAuth";


const ai = new GoogleGenAI({
  apiKey: "AIzaSyC0rL9Eswolp56Is0CqK9UsCF1GAp-23ok",
});

export const useGemini = () => {
  const { ticketsFeed, unbookEvent, getUserBookings,bookEventAI } = useEvent();
  const { user } = useAuth();

  const getEventBookingStatus = async () => {
    if (!user) return [];
    const bookings = await getUserBookings(user.uid);
    return bookings.map((b) => b.id);
  };

  const generateContent = async (prompt: string, history: string[]) => {
    if (!user) return "❌ You must be logged in to use this feature.";

    try {
      const userBookings = await getUserBookings(user.uid);
      const bookedIds = new Set(userBookings.map((b) => b.id));

      // Build ticket-to-index map
      const idMap: string[] = [];
      const formattedTickets =
        ticketsFeed?.map((ticket, index) => {
          idMap.push(ticket.id); // index 0 = event 1
          const isBooked = bookedIds.has(ticket.id);
          return `${index + 1}. ${ticket.name} – ${ticket.time} - Available: ${ticket.availableCapacity
            } - Museum: ${ticket.museumName} - Description: ${ticket.description
            } - Price: ${ticket.price} ${isBooked ? "✅ Booked by you" : ""}`;
        }).join("\n") || "No events available.";

      const chatContext = [
        {
          role: "user",
          parts: [
            {
              text: `You are a helpful AI assistant for a museum.

Below are the events:
${formattedTickets}

If the user says "book 2 seats for event 1", you must reply with:
__BOOK__ event_index=1 seat_count=2

If the user says "cancel event 2", reply:
__UNBOOK__ event_index=2

Only return the exact commands above for such actions.

Conversation history:
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

      // Parse AI instructions
      if (text.startsWith("__BOOK__")) {
        const match = text.match(/event_index=(\d+)\s+seat_count=(\d+)/);
        if (match) {
          const [, indexStr, seatStr] = match;
          const index = parseInt(indexStr) - 1;
          const seatCount = parseInt(seatStr);
          const id = idMap[index];
          if (!id) return "❌ Invalid event index.";
          return await bookEventAI(id, seatCount,user.uid);
        }
      } else if (text.startsWith("__UNBOOK__")) {
        const match = text.match(/event_index=(\d+)/);
        if (match) {
          const [, indexStr] = match;
          const index = parseInt(indexStr) - 1;
          const id = idMap[index];
          if (!id) return "❌ Invalid event index.";
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
    getUserBookings,
    getEventBookingStatus,
  };
};
