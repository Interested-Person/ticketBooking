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
                    <div key={event.id} className="w-[calc(50%-10px)] md:w-[calc(33.333%-13.33px)] lg:w-[calc(25%-15px)]">
                        <EventCard event={event} />
                    </div>
                ))}
            </div>

            <button
                onClick={() => Navigate("/chat")}
                className="fixed bottom-5 right-5 w-14 h-14 rounded-full  shadow-lg flex items-center justify-center z-50"
            >
                <img src={ChatIcon} alt="Chat" className="w-8 h-8" />
            </button>

        </div>
    )
}

export default Home