import {
    doc,

    onSnapshot,
    setDoc,

} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";



export const useUser = () => {
    const { user } = useAuth();
    const [wallet, setWallet] = useState(0)

    useEffect(() => {
        if (!user) return;

        const userDoc = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(userDoc, (snap) => {
            const data = snap.data();
            setWallet(data?.wallet || 0)
        });

        return () => unsubscribe();
    }, [user]);


    const editWallet = async (amount: number) => {
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { wallet: (wallet + amount) }, { merge: true });
    }

    return { wallet, editWallet };
};

