import { useState } from "react";
import EventCard from "../components/EventCard"
import AddEntry from "../components/Modal/addEntryAdmin"
import { useEvent } from "../hooks/useEvent"
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";
const Admin = () => {
    const [openAddEntry, setOpenAddEntry] = useState(false);
    const { ticketsFeed } = useEvent()
    const { user } = useAuth();
    if (!ticketsFeed) return (<LoadingSpinner />    )
        if(!user ||!user.isAdmin) return <div className="text-white text-center mt-10">You are not authorized to view this page.</div>
    return (
        <div className="">

            <div className="text-white flex flex-col gap-5 py-5">
                {/* <h1>Admin</h1> */}
                <section className="flex items-center justify-center ">
                    <button className="bg-sky-500 p-2 rounded-md " onClick={() => { setOpenAddEntry(true) }}>Add new entry</button>
                </section>

                {openAddEntry && <AddEntry onClose={() => setOpenAddEntry(false)} />}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-5 pl-[2.5%]">
                {ticketsFeed.map((event) => (
                    <div
                        key={event.id}
                        className="w-[calc(50%-10px)] md:w-[calc(33.333%-13.33px)] xl:w-[calc(25%-15px)]"
                    >
                        <EventCard event={event} whatPage="admin" />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Admin