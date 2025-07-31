
import { useState } from "react";
import { useAuth } from "../hooks/useAuth"
import { useUser } from "../hooks/useUser"

const Account = () => {
    const { user, logOut, } = useAuth()
    const { wallet, editWallet } = useUser();
    const [moneyToAdd, setMoneyToAdd] = useState(0);
    const handleSubmit = async () => {

        await editWallet(moneyToAdd)
    }


    return (
        <div className="text-white">
            <img src={user?.pfpUrl} alt="" />
            <h1 className="text-xl m-4 mx-auto text-white">Username: {user?.username}</h1>
            <h1 className="text-xl m-4 mx-auto text-white">Age: {user?.age}</h1>
            <h1 className="text-xl m-4 mx-auto text-white">Gender: {user?.gender}</h1>
            <h1 className="text-xl m-4 mx-auto text-white">Wallet: ₹{wallet}</h1>
            <form action="">
                <label htmlFor="">Add money to in-app wallet</label>
                <br />
                <div className="max-w-sm space-y-3">
                    <input value={moneyToAdd} onChange={(e) => setMoneyToAdd(Number(e.target.value))} type="number" placeholder="₹ Enter amount" className="py-2.5 sm:py-3 px-4 block w-full bg-cyan-700 border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " />
                    <button onClick={(e) => { e.preventDefault(); handleSubmit() }} className="bg-sky-700 mr-5 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-md ">
                        Add
                    </button>
                </div>
            </form>
            <br />
            <button onClick={(e) => { e.preventDefault(); logOut() }} className="bg-sky-700 mr-5 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-md ">
                Log Out
            </button>


        </div>
    )
}

export default Account