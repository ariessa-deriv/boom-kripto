import React from "react";
import { useStores } from "../stores";
import { observer } from "mobx-react-lite";
import { PlusIcon } from "@heroicons/react/outline";
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
import { firestoreDatabase } from "../components/helpers/firebaseConfig";

const Watchlist = () => {
  const { coin_store, watchlist_store, user_store } = useStores();

  const [search, setSearch] = React.useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coin_store.coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const createWatchlist = () => {
    const userId = user_store.user.uid;
    // const userEmail = user_store.user.email;
    // console.log("userID, ", userId);

    setDoc(doc(firestoreDatabase, "users", "Tvm3NuKxX0NG77OhxLLMociGvtR2"), {
      userId: "Tvm3NuKxX0NG77OhxLLMociGvtR2",
      userEmail: "ariessa@gmail.com",
      watchlist: ["bitcoin", "ethereum", "solana"],
    });
  };

  const getWatchlist = () => {
    getDoc(
      doc(firestoreDatabase, "users", "Tvm3NuKxX0NG77OhxLLMociGvtR2")
    ).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        console.log("watchlist: ", docSnap.data().watchlist);
        watchlist_store.setWatchlist(docSnap.data().watchlist);
        console.log("watchlist store: ", watchlist_store.watchlist);
      } else {
        console.log("No such document!");
      }
    });
  };

  // Edit watchlist value
  const editWatchlist = () => {
    updateDoc(doc(firestoreDatabase, "users", "Tvm3NuKxX0NG77OhxLLMociGvtR2"), {
      watchlist: ["tether", "bitcoin", "ethereum", "solana"],
    });
  };

  // subscribe to firestore changes
  // React.useEffect(() => {
  //   const userId = user_store.user.uid;
  //   console.log("userId: ", userId);
  //   console.log("userId === : ", userId === "");

  //   if (userId === "") {
  //     const docRef = doc(firestoreDatabase, "users", userId);
  //     const docSnap = getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   } else {
  //     console.log("userId is empty");
  //   }
  // }, [user_store.user]);

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
      {user_store.user && doc ? (
        <div className="px-48 py-16">
          <button
            type="button"
            className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => getWatchlist()}
          >
            <PlusIcon className="h-10 w-10 text-gray-400 mx-auto" />
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Create a new watchlist
            </span>
          </button>
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8 mt-16">
          <div className=" ml-20 mr-20 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              name="coin-search"
              onChange={handleChange}
              id="coin-search"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search for a coin..."
            />
          </div>
          <div className="mt-16 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        ></th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          24h
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Total Volume
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Market Cap
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {filteredCoins.map((coin) => (
                        <tr key={coin.symbol}>
                          {/* <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <StarIcon className="h-5 w-5 text-gray-500" />
                      </td> */}
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-8 w-8 flex-shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={coin.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {coin.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900 uppercase">
                              {coin.symbol}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              ${coin.current_price}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div
                              className={
                                coin.price_change_percentage_24h < 0
                                  ? "text-red-900"
                                  : "text-green-900"
                              }
                            >
                              {coin.price_change_percentage_24h}%
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {coin.total_volume}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {coin.market_cap}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Watchlist);
