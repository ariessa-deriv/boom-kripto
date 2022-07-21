import NavBar from "../components/NavBar";
import "../styles/globals.css";
import React from "react";
import { auth } from "../components/helpers/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useStores } from "../stores";
import { observer } from "mobx-react-lite";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const { user_store } = useStores();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user_store.setUser(user);
    });
  }, [user_store.user]);

  return (
    <>
      <Head>
        <title>BoomKripto | Track prices of 50 cryptocurrencies</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default observer(MyApp);
