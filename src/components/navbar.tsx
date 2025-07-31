import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import PromptMore from "./Modal/promptMore";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate()
    const handleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }
    const { completeRegistration, isLoggedIn, user, needsInfo } = useAuth();
    return (<>
        <nav className="bg-sky-950 w-screen items-center px-4 text-white h-16 flex justify-between">

            <div className="flex items-center gap-2">
                <img onClick={() => navigate("/")} src="/logo.svg" className="h-16 cursor-pointer" alt="" />
            </div>
            {isLoggedIn ? (<div className="cursor-pointer"  >

                <img onClick={() => navigate("/account")} referrerPolicy="no-referrer" className="w-10 rounded-full" loading="lazy" src={user?.pfpUrl} alt="" />

            </div>) : (

                <button className="cursor-pointer" onClick={handleLogin}>Login</button>
            )}

        </nav>
        {needsInfo &&
            <PromptMore onSelect={completeRegistration} />
        }
    </>
    )
}