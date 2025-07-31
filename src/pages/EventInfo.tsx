import { useParams } from "react-router-dom";
import placeholder from '../assets/placeholder.png'
import Rating from "../components/Review";
import { useState } from "react";
import { useEvent } from "../hooks/useEvent";

const EventInfo = () => {
    const { ticketsFeed } = useEvent();
const { eventID } = useParams();

const event = ticketsFeed.find((e) => e.id === eventID);

if (!event) return <div className="text-white">Loading event...</div>;




    const [quantity, setQuantity] = useState(0);
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
                            <h2 className="text-3xl font-bold mb-2">{event.name}</h2>
                            <div className="mb-4">
                                <span className="text-2xl font-bold mr-2">₹{event.price}</span>
                            </div>
                            {/**ADD REVIEWS RATING STARS HERE */}
                            <Rating rating={4}></Rating>
                            <p className="text-white mb-6">
                                {event.description}
                            </p>


                            <div className="flex space-x-4 mb-6">


                                {/* <div className="mb-6">
                                    <label
                                        htmlFor="quantity"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Quantity:
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        min={1}
                                        defaultValue={1}
                                        className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div> */}
                                <div className="flex items-center">
                                    <button className="bg-sky-700 mr-5 h-12  hover:bg-blue-700 text-white font-bold  px-4 border border-blue-700 rounded-md ">
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
                                                onClick={() => setQuantity(quantity - 1)}
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
                                                aria-describedby="helper-text-explanation"
                                                className=" items-center m-auto appearance-none bg-gray-50 border-x-0 border-gray-300  font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder=""
                                                value={quantity}

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

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EventInfo