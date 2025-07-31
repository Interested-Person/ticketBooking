import EventCard from '../components/EventCard'
import LoadingSpinner from '../components/LoadingSpinner';
import { useEvent } from '../hooks/useEvent'
import ChatIcon from '../assets/chat.svg'
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const Navigate = useNavigate();
    const { ticketsFeed, loading, isSearching, searchFeed } = useEvent();
    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <div>
            <h1 className='text-white text-xl p-4'>Available Events</h1>
            <div className="flex flex-wrap gap-x-5 gap-y-5 pl-[2.5%]">
                {(isSearching ? searchFeed : ticketsFeed).map(event => (
                    <div key={event.id}  className="w-[calc(50%-10px)] md:w-[calc(33.333%-13.33px)] lg:w-[calc(25%-15px)]">
                        <EventCard event={event} />
                    </div>
                ))}
            </div>


            <img onClick={() => Navigate("/chat")} src={ChatIcon} className='sticky bottom-1 left-99 w-12 h-12' />

        </div>
    )
}

export default Home