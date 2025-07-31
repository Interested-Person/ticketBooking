import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { user, logOut } = useAuth();
  const { wallet, editWallet, loading } = useUser();
  const [moneyToAdd, setMoneyToAdd] = useState(0);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (moneyToAdd > 0) await editWallet(moneyToAdd);
    setMoneyToAdd(0);
  };
  if (loading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-cyan-900 text-white flex items-center justify-center p-6">
      <div className="bg-slate-800 p-6 rounded-2xl shadow-2xl max-w-md w-full space-y-6 text-center">
        <img
          loading="lazy"
          referrerPolicy="no-referrer"
          src={user?.pfpUrl}
          className="w-24 h-24 rounded-full mx-auto border-4 border-cyan-400 shadow-md"
        />
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">{user?.username}</h1>
          <p className="text-lg font-medium text-cyan-300">Wallet: ₹{wallet}</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div className="text-left text-sm font-medium text-cyan-300">
            Add money to wallet
          </div>
          <input
            type="number"
            value={moneyToAdd}
            onChange={(e) => setMoneyToAdd(Number(e.target.value))}
            placeholder="₹ Enter amount"
            className="w-full px-4 py-2 rounded-lg bg-cyan-700 border-none focus:ring-2 focus:ring-cyan-400 outline-none text-white"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
          >
            Add Money
          </button>
        </form>
        {user?.isAdmin && <button
          onClick={() => navigate("/admin")}
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
        >
          Admin Panel
        </button>}

        <button
          onClick={() => logOut()}
          className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 font-semibold"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Account;
