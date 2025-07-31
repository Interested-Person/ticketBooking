import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import PromptMore from "./Modal/promptMore";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../hooks/useEvent";
import { useState, useEffect } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const handleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const { completeRegistration, isLoggedIn, user, needsInfo } = useAuth();
    const {
        ticketsFeed,
        setSearchFeed,
        setIsSearching,
    } = useEvent();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === "") {
            setSearchFeed([]);
            setIsSearching(false);
            return;
        }

        const filtered = ticketsFeed.filter((ticket) =>
            ticket.name.toLowerCase().includes(value.toLowerCase())
        );

        setSearchFeed(filtered);
        setIsSearching(true);
    };

    // Optional: clear searchFeed on route change or blur
    useEffect(() => {
        if (!query) {
            setSearchFeed([]);
            setIsSearching(false);
        }
    }, [query]);

    return (
        <>
            <nav className="bg-sky-950 w-screen items-center px-4 text-white h-16 flex justify-between">
                <div className="flex items-center gap-2">
                    <img
                        onClick={() => navigate("/")}
                        src="/logo.svg"
                        className="h-14 cursor-pointer"
                        alt="Logo"
                    />
                </div>

                {/* 🔍 Search Bar */}
                <div className="flex-1 flex justify-center px-4">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={query}
                        onChange={handleSearch}
                        className="px-3 py-3 outline-0 w-full max-w-md rounded bg-white text-black placeholder-gray-500"
                    />
                </div>

                {isLoggedIn ? (
                    <div className="cursor-pointer">
                        <img
                            onClick={() => navigate("/account")}
                            referrerPolicy="no-referrer"
                            className="w-10 rounded-full"
                            loading="lazy"
                            src={user?.pfpUrl}
                            alt="Profile"
                        />
                    </div>
                ) : (
                    <button className="cursor-pointer" onClick={handleLogin}>
                        Login
                    </button>
                )}
            </nav>

            {needsInfo && <PromptMore onSelect={completeRegistration} />}
        </>
    );
}
