import { useEffect, useState } from "react"
import { useEvent } from "../hooks/useEvent"
import { useAuth } from "../hooks/useAuth"
import EventCard from "../components/EventCard"
import type { Event } from "../types"
const Bookings = () => {
    const { user } = useAuth()
    const { getUserBookings } = useEvent()
    const [bookings, setBookings] = useState<Event[]>([])

    useEffect(() => {
        if (user) {
            getUserBookings(user.uid).then(setBookings)
        }
    }, [user])

    if (!user) return <div>Loading user...</div>
    if (!bookings) return <div>Loading bookings...</div>

    return (
        <div className="text-white">
            <h1>Bookings</h1>
            <div className="flex gap-5 p-4 basis-1/2 md:basis-1/3 xl:basis-1/4 flex-wrap">
                {bookings.map((event: Event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    )
}

export default Bookings
