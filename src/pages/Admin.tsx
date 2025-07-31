import { useState } from "react";
import EventCard from "../components/EventCard"
import AddEntry from "../components/Modal/addEntryAdmin"
import { useEvent } from "../hooks/useEvent"
const Admin = () => {
    const [openAddEntry, setOpenAddEntry] = useState(false);
    const { ticketsFeed } = useEvent()
    if (!ticketsFeed) return (<div className="text-white">Loading</div>)
    return (
        <div className="">

            <div className="text-white flex flex-col gap-5 py-5">
                {/* <h1>Admin</h1> */}
                <section className="flex items-center justify-center ">
                    <button className="bg-sky-500 p-2 rounded-md " onClick={() => { setOpenAddEntry(true) }}>Add new entry</button>
                </section>

                {openAddEntry && <AddEntry onClose={() => setOpenAddEntry(false)} />}
            </div>
            <div className="flex gap-5">
                {ticketsFeed.map((event) => (
                    <EventCard
                        event={event}
                        whatPage="admin"
                    />
                ))}
            </div>
        </div>
    )
}

export default Admin