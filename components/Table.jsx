import { StarIcon } from "@heroicons/react/outline";
import { useStores } from "../stores";
import { observer } from "mobx-react-lite";
import React from "react";

const Table = () => {
  const { coin_store, watchlist_store } = useStores();
  const [filteredCoins, setFilteredCoins] = React.useState([]);

  React.useEffect(() => {
    const filterCoins = coin_store.coins.filter((c) =>
      c.name.toLowerCase().includes(coin_store.search)
    );

    if (!filterCoins.length) {
      setFilteredCoins(coin_store.coins);
    } else {
      setFilteredCoins(filterCoins);
    }

    console.log("filteredCoins: ", filterCoins);
  }, [coin_store.search]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flex flex-col">
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
                  {coin_store.coins.map((coin) => (
                    <tr key={coin.symbol}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <StarIcon className="h-5 w-5 text-gray-500" />
                      </td>
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
                          ${coin.current_price.toLocaleString("en-US")}
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
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">
                          {coin.total_volume.toLocaleString("en-US")}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">
                          {coin.market_cap.toLocaleString("en-US")}
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
  );
};

export default observer(Table);
