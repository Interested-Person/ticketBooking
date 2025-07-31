import { useParams } from "react-router-dom";
import placeholder from '../assets/placeholder.png'
import EventCardTag from "../modals/EventCardTag";


const EventInfo = () => {
    const { eventID } = useParams(); //EVENT ID
    const eventIMG = ""
    return (
        <div>
            <div className="bg-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-wrap -mx-4">
                        {/* Product Images */}
                        <div className="w-full md:w-1/2 px-4 mb-8">
                            <img
                                src={eventIMG || placeholder}
                                alt="Product"
                                className="w-full h-auto rounded-lg shadow-md mb-4"
                                id="mainImage"
                            />

                        </div>
                        {/* Product Details */}
                        <div className="w-full md:w-1/2 px-4">
                            <h2 className="text-3xl font-bold mb-2">Premium Wireless Headphones</h2>
                            <div className="mb-4">
                                <span className="text-2xl font-bold mr-2">$349.99</span>
                                <span className="text-gray-500 line-through">$399.99</span>
                            </div>
                            {/**ADD REVIEWS RATING STARS HERE */}
                            <p className="text-gray-700 mb-6">
                                Experience premium sound quality and industry-leading noise
                                cancellation with these wireless headphones. Perfect for music lovers
                                and frequent travelers.
                            </p>
                            {/* <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Color:</h3>
                                <div className="flex space-x-2">
                                    <button className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" />
                                    <button className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300" />
                                    <button className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
                                </div>
                            </div> */}

                            <div className="flex space-x-4 mb-6">

                                <button className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                        />
                                    </svg>
                                    Book tickets
                                </button>
                                <div className="mb-6">
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
                                </div>

                            </div>
                            <div>
                                <h3 className=" flex 0text-lg font-semibold mb-2">Tags:</h3>
                                <ul className="list-disc list-inside text-gray-700">
                                    {["horror", "comedy", "action"].map((tag, index) => <EventCardTag colour='default' tag={tag || ""} key={index} />)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EventInfo