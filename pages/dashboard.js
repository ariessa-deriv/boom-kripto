import React from "react";
import axios from "axios";
import { useStores } from "../stores";
import { observer } from "mobx-react-lite";
import SkeletonLoader from "../components/SkeletonLoader";
import { StarIcon } from "@heroicons/react/solid";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { auth } from "../components/helpers/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { firestoreDatabase } from "../components/helpers/firebaseConfig";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Dashboard = () => {
  const { coin_store, watchlist_store, user_store } = useStores();
  const [search, setSearch] = React.useState("");
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

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coin_store.coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const coinslist =
    "bitcoin,ethereum,tether,usd-coin,binancecoin,binance-usd,ripple,cardano,solana,dogecoin,polkadot,matic-network,defichain,dai,avalanche-2,tron,staked-ether,wrapped-bitcoin,leo-token,litecoin,ftx-token,okb,uniswap,crypto-com-chain,chainlink,ethereum-classic,near,stellar,cosmos,monero,algorand,bitcoin-cash,flow,vechain,chain-2,apecoin,theta-fuel,internet-computer,the-sandbox,decentraland,hedera-hashgraph,tezos,filecoin,quant-network,axie-infinity,frax,elrond-erd-2,aave,theta-token,true-usd";

  React.useEffect(() => {
    setLoader(true);
    setFavoriteList(watchlist_store.watchlist);
    setTimeout(async () => {
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" +
            coinslist +
            "&price_change_percentage=1h,24h,7d"
        )
        .then((res) => {
          setLoader(false);
          coin_store.setCoins(res.data);
        })
        .catch((error) => {});
    }, 1000);
  }, []);

  return (
    <div>
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-center pt-24">
        Dashboard
      </p>
      <p className="tracking-normal text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans font-normal text-center pt-10">
        Track prices of 50 cryptocurrencies
      </p>
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
                        1h
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
                        7d
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
                      filteredCoins.map((coin) => (
                        <tr key={coin.symbol}>
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
                          <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                            <div className="text-gray-900 uppercase">
                              {coin.symbol}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                            <div className="text-gray-900">
                              ${coin.current_price.toLocaleString()}
                            </div>
                          </td>
                          <td className="whitespace-nowrap pl-3 pr-4 sm:pr-6 py-4 text-right text-sm text-gray-500">
                            <div
                              className={
                                coin.price_change_percentage_1h_in_currency < 0
                                  ? "text-red-500"
                                  : "text-green-500"
                              }
                            >
                              {coin.price_change_percentage_1h_in_currency.toFixed(
                                2
                              )}
                              %
                            </div>
                          </td>
                          <td className="whitespace-nowrap pl-3 pr-4 sm:pr-6 py-4 text-right text-sm text-gray-500">
                            <div
                              className={
                                coin.price_change_percentage_24h_in_currency < 0
                                  ? "text-red-500"
                                  : "text-green-500"
                              }
                            >
                              {coin.price_change_percentage_24h_in_currency.toFixed(
                                2
                              )}
                              %
                            </div>
                          </td>
                          <td className="whitespace-nowrap pl-3 pr-4 sm:pr-6 py-4 text-right text-sm text-gray-500">
                            <div
                              className={
                                coin.price_change_percentage_7d_in_currencyy < 0
                                  ? "text-red-500"
                                  : "text-green-500"
                              }
                            >
                              {coin.price_change_percentage_7d_in_currency.toFixed(
                                2
                              )}
                              %
                            </div>
                          </td>
                          <td className="whitespace-nowrap pl-3 pr-4 sm:pr-6 py-4 text-right text-sm text-gray-500">
                            <div className="text-gray-900">
                              {coin.total_volume.toLocaleString()}
                            </div>
                          </td>
                          <td className="whitespace-nowrap pl-3 pr-4 sm:pr-6 py-4 text-right text-sm text-gray-500">
                            <div className="text-gray-900">
                              {coin.market_cap.toLocaleString()}
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
    </div>
  );
};

export default observer(Dashboard);
