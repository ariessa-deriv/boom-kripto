import NavBar from "../components/NavBar";
import "../styles/globals.css";
import React from "react";
import { auth } from "../components/helpers/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useStores } from "../stores";
import { observer } from "mobx-react-lite";

function MyApp({ Component, pageProps }) {
  const { user_store } = useStores();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // setCurrentUser(user);
      user_store.setUser(user);
    });
  }, [user_store.user]);

  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default observer(MyApp);
