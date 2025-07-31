import EventCard from '../components/EventCard'
import LoadingSpinner from '../components/LoadingSpinner';
import { useEvent } from '../hooks/useEvent'
import ChatIcon from '../assets/chat.svg'
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const Navigate = useNavigate();
    const { ticketsFeed, loading,isSearching,searchFeed } = useEvent();
    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <div>
            <h1 className='text-white text-xl p-4'>Available Events</h1>
            <div className='flex p-4 basis-1/2 flex-wrap md:basis-1/3 xl:basis-1/4 gap-5'>
    {(isSearching ? searchFeed : ticketsFeed).map(event => (
        <EventCard key={event.id} event={event} />
    ))}
</div>

            <img onClick={() => Navigate("/chat")} src={ChatIcon} className='absolute bottom-4 right-4 w-12 h-12' />

        </div>
    )
}

export default Home