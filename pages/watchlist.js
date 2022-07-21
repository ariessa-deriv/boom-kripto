import React from "react";
import { useStores } from "../stores";
import { observer } from "mobx-react-lite";
import { PlusIcon, StarIcon } from "@heroicons/react/solid";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { firestoreDatabase } from "../components/helpers/firebaseConfig";
import SkeletonLoader from "../components/SkeletonLoader";
import { auth } from "../components/helpers/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Watchlist = () => {
  const { watchlist_store, user_store } = useStores();
  const [loader, setLoader] = React.useState(false);
  const [favoriteList, setFavoriteList] = React.useState([]);

  const onFavorite = (coin) => {
    setFavoriteList([...favoriteList, coin]);
    watchlist_store.setWatchlist([...watchlist_store.watchlist, coin]);

    if (auth.currentUser !== null) {
      setDoc(doc(firestoreDatabase, "users", user_store.user.uid), {
        userId: user_store.user.uid,
        userEmail: user_store.user.email,
        watchlist: watchlist_store.watchlist,
      });
    }
  };

  const onRemoveFavorite = (coin) => {
    const filteredList = favoriteList.filter((item) => item.id !== coin.id);
    setFavoriteList(filteredList);

    watchlist_store.setWatchlist(filteredList);

    if (auth.currentUser !== null) {
      setDoc(doc(firestoreDatabase, "users", user_store.user.uid), {
        userId: user_store.user.uid,
        userEmail: user_store.user.email,
        watchlist: watchlist_store.watchlist,
      });
    }
  };

  const ifExists = (coin) => {
    if (
      watchlist_store.watchlist.filter((item) => item.id === coin.id).length > 0
    ) {
      return true;
    }
    return false;
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user_store.setUser(user);
    });
  }, [auth.currentUser]);

  // Get watchlist from Firestore db
  React.useEffect(() => {
    setLoader(true);
    setFavoriteList(watchlist_store.watchlist);
    setTimeout(async () => {
      if (auth.currentUser !== null) {
        getDoc(doc(firestoreDatabase, "users", user_store.user.uid)).then(
          (docSnap) => {
            if (docSnap.exists()) {
              setLoader(false);
              watchlist_store.setWatchlist(docSnap.data().watchlist);
            } else {
              setLoader(false);
            }
          }
        );
      }
      setLoader(false);
    }, 1000);
  }, [watchlist_store.watchlist]);

  return (
    <>
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-center pt-24">
        Watchlist
      </p>
      <p className="tracking-normal text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans font-normal text-center pt-10">
        Track prices of 50 cryptocurrencies
      </p>
      {watchlist_store.watchlist.length > 0 ? (
        <div className="px-4 sm:px-6 lg:px-8 mt-16">
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
                        ></th>
                        <th
                          scope="col"
                          className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        ></th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="pl-3 pr-4 sm:pr-6 py-3.5 text-right text-sm font-semibold text-gray-900"
                        >
                          24h
                        </th>
                        <th
                          scope="col"
                          className="pl-3 pr-4 sm:pr-6 py-3.5 text-right text-sm font-semibold text-gray-900"
                        >
                          Total Volume
                        </th>
                        <th
                          scope="col"
                          className="pl-3 pr-4 sm:pr-6 py-3.5 text-right text-sm font-semibold text-gray-900"
                        >
                          Market Cap
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {loader ? (
                        <SkeletonLoader />
                      ) : (
                        watchlist_store.watchlist.map((coin) => (
                          <tr key={coin.symbol}>
                            {/* <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <button onClick={() => onRemoveFavorite(coin)}>
                                <StarIcon className="text-yellow-400 h-5 w-5" />
                              </button>
                            </td> */}
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <button
                                onClick={() =>
                                  ifExists(coin)
                                    ? onRemoveFavorite(coin)
                                    : onFavorite(coin)
                                }
                              >
                                <StarIcon
                                  className={classNames(
                                    ifExists(coin)
                                      ? "text-yellow-400"
                                      : "text-gray-400",
                                    "h-5 w-5"
                                  )}
                                />
                              </button>
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm sm:pl-6">
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
                            <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                              <div className="text-gray-900">
                                ${coin.current_price}
                              </div>
                            </td>
                            <td className="whitespace-nowrap pl-3 pr-4 sm:pr-6 py-4 text-right text-sm text-gray-500">
                              <div
                                className={
                                  coin.price_change_percentage_24h < 0
                                    ? "text-red-500"
                                    : "text-green-500"
                                }
                              >
                                {coin.price_change_percentage_24h}%
                              </div>
                            </td>
                            <td className="whitespace-nowrap pl-3 pr-4 sm:pr-6 py-4 text-right text-sm text-gray-500">
                              <div className="text-gray-900">
                                {coin.total_volume}
                              </div>
                            </td>
                            <td className="whitespace-nowrap pl-3 pr-4 sm:pr-6 py-4 text-right text-sm text-gray-500">
                              <div className="text-gray-900">
                                {coin.market_cap}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center pt-48">
          <h3 className="mt-1 text-sm text-gray-500">
            Oh snap, you do not have any coins in your watchlist.
          </h3>
        </div>
      )}
    </>
  );
};

export default observer(Watchlist);
