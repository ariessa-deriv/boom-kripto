import React from "react";
import { useStores } from "../stores";
import { observer } from "mobx-react-lite";
import { PlusIcon } from "@heroicons/react/outline";
import firebaseApp from "../components/helpers/firebaseConfig";
import {
  getFirestore,
  query,
  orderBy,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";

const Watchlist = () => {
  const { coin_store, watchlist_store, user_store } = useStores();
  const firestoreDatabase = getFirestore(firebaseApp);

  const [search, setSearch] = React.useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coin_store.coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const createWatchlist = () => {
    const userId = user_store.user.uid;
    const userEmail = user_store.user.email;
    console.log("userID, ", userId);

    setDoc(doc(firestoreDatabase, "users", userId), {
      userId: userId,
      userEmail: userEmail,
      watchlist: ["shibaInu", "ethereum", "solana"],
    });
  };

  const getWatchlist = () => {};

  const editWatchlist = () => {
    const userRef = doc(firestore, "users", userId);

    updateDoc(userRef, {
      watchlist: ["tether", "bitcoin", "ethereum", "solana"],
    });
  };

  // subscribe to firestore changes
  React.useEffect(() => {}, []);

  // Only user who has logged in can create watchlist
  // If user has logged in and watchlist is empty, display create new watchlist
  // Else, display current watchlist

  // Add remove column in current watchlist

  return (
    <>
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-sans text-8xl font-extrabold text-center pt-24">
        Watchlist
      </p>
      <p className="tracking-normal text-2xl font-sans font-light text-center pt-12">
        Track prices of 30 cryptocurrencies
      </p>
      {user_store.user ? (
        <div className="px-48 py-16">
          <button
            type="button"
            className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => createWatchlist()}
          >
            <PlusIcon className="h-10 w-10 text-gray-400 mx-auto" />
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Create a new watchlist
            </span>
          </button>
        </div>
      ) : (
        <p>test</p>
      )}
    </>
  );
};

export default observer(Watchlist);
