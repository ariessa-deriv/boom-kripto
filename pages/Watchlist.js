import React from "react";
import { useStores } from "../stores";
import { observer } from "mobx-react-lite";

const Watchlist = () => {
  const { coin_store, watchlist_store } = useStores();

  return (
    <>
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-sans text-8xl font-extrabold text-center pt-24">
        Watchlist
      </p>
      <p className="tracking-normal text-2xl font-sans font-light text-center pt-12">
        Track prices of 50 cryptocurrencies
      </p>
      <Table />
    </>
  );
};

export default observer(Watchlist);
