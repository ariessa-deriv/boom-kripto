import React from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import axios from "axios";
import { useStores } from "../stores";
import { observer } from "mobx-react-lite";

const Dashboard = () => {
  const { coin_store, watchlist_store } = useStores();

  React.useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false"
      )
      .then((res) => {
        coin_store.setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-normal font-sans text-8xl font-bold text-center pt-24">
        Dashboard
      </p>
      <p className="tracking-normal text-2xl font-sans font-normal text-center pt-12">
        Track prices of 50 cryptocurrencies
      </p>
      <SearchBar />
      <Table />
    </div>
  );
};

export default observer(Dashboard);
