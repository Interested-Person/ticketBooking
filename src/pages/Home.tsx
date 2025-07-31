import EventCard from '../components/EventCard'
import { useEvent } from '../hooks/useEvent'
const Home = () => {
    const { ticketsFeed } = useEvent()
    return (
        <div>
            <h1>Home</h1>
            <div className='flex gap-5'>
                {ticketsFeed.map((event) => (
                    <EventCard
                        key={event.id}
                        eventID={event.id}
                        eventImg={event.imageURL}
                        eventName={event.name}
                    />
                ))}
            </div>


        </div>
    )
}

export default Home