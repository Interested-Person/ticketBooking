import EventCard from '../components/EventCard'
import LoadingSpinner from '../components/LoadingSpinner';
import { useEvent } from '../hooks/useEvent'
const Home = () => {
    const { ticketsFeed, loading } = useEvent();
    if(loading){
        return <LoadingSpinner/>
    }
    return (
        <div>
            <h1 className='text-white text-xl p-4'>Available Events</h1>
            <div className='flex p-4 basis-1/2 flex-wrap md:basis-1/3 xl:basis-1/4 gap-5'>
                {ticketsFeed.map((event) => (
                    <EventCard
                        event={event}
                    />
                ))}
            </div>


        </div>
    )
}

export default Home