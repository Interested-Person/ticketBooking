import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import PromptMore from "./Modal/promptMore";
import { auth } from "../firebase";

export default function Navbar() {
    const handleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }
    const { completeRegistration, isLoggedIn, user, needsInfo } = useAuth();
    return (<>
        <nav>
            {isLoggedIn ? (<div>

                <img referrerPolicy="no-referrer"  loading="lazy" src={user?.pfpUrl} alt="" />

            </div>) : (

                <button onClick={handleLogin}>Login</button>
            )}

        </nav>
        {needsInfo &&
            <PromptMore onSelect={completeRegistration} />
        }
    </>
    )
}