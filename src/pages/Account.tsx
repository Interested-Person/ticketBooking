
import { useAuth } from "../hooks/useAuth"

const Account = () => {
    const { user } = useAuth()
    return (
        <div className="text-white">
            <img src={user?.pfpUrl} alt="" />
            <h1 className="text-xl m-4 mx-auto text-white">Username: {user?.username}</h1>
            <h1 className="text-xl m-4 mx-auto text-white">Age: {user?.age}</h1>
            <h1 className="text-xl m-4 mx-auto text-white">Gender: {user?.gender}</h1>
            <h1 className="text-xl m-4 mx-auto text-white">WALLET</h1>
            <form action="">
                <label htmlFor=""></label>
            </form>


        </div>
    )
}

export default Account