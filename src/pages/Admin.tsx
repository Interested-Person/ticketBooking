import { useState } from "react";
import EventCard from "../components/EventCard"
import AddEntry from "../components/Modal/addEntryAdmin"
const Admin = () => {
    const [openAddEntry, setOpenAddEntry] = useState(false);
    return (
        <div className="text-white flex flex-col gap-5 py-5">
            {/* <h1>Admin</h1> */}
            <section className="flex items-center justify-center ">
                <button className="bg-sky-500 p-2 rounded-md " onClick={()=>{setOpenAddEntry(true)}}>Add new entry</button>
            </section>
      
        {openAddEntry && <AddEntry onClose={() => setOpenAddEntry(false)} />}
        </div>
    )
}

export default Admin