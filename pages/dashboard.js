import React from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import axios from "axios";
import { useStores } from "../stores";
import { observer } from "mobx-react-lite";

const Dashboard = () => {
  const { coin_store, watchlist_store } = useStores();
  const coinslist =
    "bitcoin,ethereum,tether,usd-coin,binancecoin,binance-usd,ripple,cardano,solana,dogecoin,polkadot,matic-network,shiba-inu,dai,avalanche-2,tron,staked-ether,wrapped-bitcoin,leo-token,litecoin,ftx-token,okb,uniswap,crypto-com-chain,chainlink,ethereum-classic,near,stellar,cosmos,monero,algorand,bitcoin-cash,flow,vechain,chain-2,apecoin,theta-fuel,internet-computer,the-sandbox,decentraland,hedera-hashgraph,tezos,filecoin,quant-network,axie-infinity,frax,elrond-erd-2,aave,theta-token,defichain";

  React.useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" +
          coinslist
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
      <p className="tracking-normal text-2xl font-sans font-normal text-center pt-10">
        Track prices of 30 cryptocurrencies
      </p>
      {/* <SearchBar /> */}
      <Table />
    </div>
  );
};

export default observer(Dashboard);
