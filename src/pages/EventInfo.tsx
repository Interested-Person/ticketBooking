import { useParams } from "react-router-dom";
import placeholder from '../assets/placeholder.png'
import { useEffect, useState } from "react";
import { useEvent } from "../hooks/useEvent";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import { useModal } from "../hooks/useModal";


const EventInfo = () => {
    //We inport the ticket feed from hooks
    const { ticketsFeed, bookEvent } = useEvent();
    //We grab the eventID from the URL parameters
    const { eventID } = useParams();
    const {open} = useModal();
    const event = ticketsFeed.find((e) => e.id === eventID);
    const { user } = useAuth()
    const [quantity, setQuantity] = useState(0);
    const [currentTotal, setCurrentTotal] = useState(0); //to store total cost
    const { wallet, editWallet } = useUser();
    useEffect(() => {
        setCurrentTotal(event ? quantity * event.price : 0);
    }, [quantity]);
    if (!event) return <LoadingSpinner />



    const handleBuy = async () => {
        if (!user) return;
        if (currentTotal > wallet) return open("Insufficient funds to book tickets");
        else if (event.availableCapacity < quantity) return open("Not enough seats available");
        else {

            if (await bookEvent(event.id, quantity, user.uid))
                editWallet(-1 * currentTotal)
        }

    }
    return (
        <div className="bg-slate-950 text-white">
            <div className="bg-slate-950">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-wrap -mx-4">
                        {/* Product Images */}
                        <div className="w-full md:w-1/2 px-4 mb-8">
                            <img
                                src={event.imageURL || placeholder}
                                alt="Product"
                                className="w-full h-auto rounded-lg shadow-md mb-4"
                                id="mainImage"
                            />

                        </div>
                        {/* Product Details */}
                        <div className="w-full md:w-1/2 px-4">
                            <h2 className="text-4xl font-bold mb-2">{event.name}, at {event.museumName}</h2>
                            <div className="mb-4">
                                <span className="text-2xl font-bold mr-2">₹{event.price}</span>
                            </div>

                            <div className="text-white mb-6">
                                On {`${event.time.getDate()}/${event.time.getMonth() + 1}/${event.time.getFullYear()} at ${event.time.getHours()}:${event.time.getMinutes()}`}<br />
                                <div></div>
                                Description: {event.description}

                            </div>


                            <div className="flex space-x-4 mb-6">



                                <div className="flex items-center">
                                    <button onClick={() => { if (!user) return; handleBuy() }} className="bg-sky-700 mr-5 h-12  hover:bg-blue-700 text-white font-bold  px-4 border border-blue-700 rounded-md ">
                                        Book tickets
                                    </button>
                                    <form className="max-w-30 ">
                                        <label
                                            htmlFor="bedrooms-input"
                                            className="block  text-sm font-medium text-gray-900 dark:text-white"
                                        >

                                        </label>
                                        <div className=" relative flex items-center ">
                                            <button
                                                onClick={() => setQuantity((prev) => (prev - 1))}
                                                type="button"
                                                id="decrement-button"
                                                data-input-counter-decrement="bedrooms-input"
                                                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                            >
                                                <svg
                                                    className="w-3 h-3 text-gray-900 dark:text-white"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 18 2"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M1 1h16"
                                                    />
                                                </svg>
                                            </button>
                                            <input
                                                type="text"
                                                id="quantity-input"
                                                data-input-counter=""
                                                data-input-counter-min={1}
                                                data-input-counter-max={5}
                                                className=" items-center m-auto appearance-none bg-gray-50 border-x-0 border-gray-300  font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder=""
                                                value={quantity}
                                                onChange={() => { }}

                                            />


                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                type="button"
                                                id="increment-button"
                                                data-input-counter-increment="bedrooms-input"
                                                className=" bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                            >
                                                <svg
                                                    className="w-3 h-3 text-gray-900 dark:text-white"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 18 18"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 1v16M1 9h16"
                                                    />
                                                </svg>
                                            </button>

                                        </div>

                                    </form>
                                    {/**input */}
                                </div>



                            </div>
                            <div className="mb-1">{event.availableCapacity} tickets available out of {event.totalCapacity}</div>
                            <div className="text-3xl">Total: ₹{currentTotal}</div>
                            <div className="text-3xl">Available funds: ₹{wallet}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EventInfo

