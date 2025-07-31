
import placeholder from '../assets/placeholder.png'
import { useNavigate } from 'react-router-dom'
import EventCardTag from '../modals/EventCardTag'
import type { Event } from '../types'
import { useEvent } from '../hooks/useEvent'

const EventCard = ({ event, whatPage }: { event: Event, whatPage?: string }) => {
    const { deleteEvent } = useEvent()
    const eventName = event.name
    const eventID = event.id
    const eventImg = event.imageURL
    const price = event.price
    const date = event.time

    const navigate = useNavigate()

    return (
        <div className="max-w-38 md:max-w-64 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="cursor-pointer" onClick={() => navigate("/event/" + eventID || "")}>
                <img className="rounded-t-lg h-40 w-full  object-cover " src={eventImg || placeholder} alt="" />
            </div>
            <div className="p-2">
                <div >
                    <div onClick={() => navigate("/event/" + eventID || "")} className="cursor-pointer mb-1 text-md md:text-xl xl:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {eventName}
                    </div>
                </div>
              
                <div className='flex mb-2 overflow-x-scroll hide-scrollbar'>
                    <EventCardTag colour='pink' tag={"₹" + String(price)} />
                    <EventCardTag colour='indigo' tag={date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()} />
                </div>
                {whatPage === "admin" && <button
                    onClick={() => { () => console.log("clicked"); deleteEvent(eventID) }}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Delist Event
                    <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </button>}

            </div>
        </div>

    )
}

export default EventCard