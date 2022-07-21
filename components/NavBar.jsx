import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Login from "./Login";
import SignUp from "./SignUp";
import Notification from "./Notification";
import { signOut } from "firebase/auth";
import { useStores } from "../stores";
import { observer } from "mobx-react-lite";
import { auth } from "./helpers/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Watchlist", href: "/watchlist", current: false },
];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const NavBar = () => {
  // Get current route
  const router = useRouter();
  const currentRoute = router.pathname;

  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showSignUpModal, setShowSignUpModal] = React.useState(false);
  const [showNotificationModal, setShowNotificationModal] =
    React.useState(false);
  const [notificationTitle, setNotificationTitle] = React.useState("");
  const [notificationDescription, setNotificationDescription] =
    React.useState("");
  const [notificationType, setNotificationType] = React.useState("");

  const { user_store } = useStores();

  const handleLogout = () => {
    signOut(auth)
      .then((response) => {
        user_store.setUser(auth.currentUser);
        setNotificationTitle("Successfully logged out!");
        setNotificationDescription("You are now logged out.");
        setNotificationType("message");
        setShowNotificationModal(true);
      })
      .catch((error) => {});
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user_store.setUser(user);
    });
  }, [user_store.user]);

  React.useEffect(() => {
    if (user_store.authenticationState == "login") {
      setNotificationTitle("Successfully logged in!");
      setNotificationDescription("You are now logged in.");
      setNotificationType("message");
      setShowNotificationModal(true);
      user_store.setAuthenticationState("");
    }

    if (user_store.authenticationState == "signup") {
      setNotificationTitle("Successfully signed up!");
      setNotificationDescription("Welcome to BoomKripto, anon.");
      setNotificationType("message");
      setShowNotificationModal(true);
      user_store.setAuthenticationState("");
    }
  }, [user_store.authenticationState]);

  React.useEffect(() => {
    if (user_store.errorState == "error") {
      setNotificationTitle("Successfully logged in!");
      setNotificationDescription("You are now logged in.");
      setNotificationType("message");
      setShowNotificationModal(true);
      user_store.setAuthenticationState("");
    }
  }, [user_store.errorState]);

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <p className="normal-case text-xl font-bold">BoomKripto</p>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          currentRoute === `${item.href}`
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",

                          "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              {!auth.currentUser ? (
                <div className="flex items-center">
                  <div className="flex-shrink-0 pr-2">
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-solid text-sm font-medium rounded-md text-purple-600 bg-white shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      onClick={() => setShowLoginModal(!showLoginModal)}
                    >
                      <span>Login</span>
                    </button>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      onClick={() => setShowSignUpModal(!showSignUpModal)}
                    >
                      <span>Sign Up</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      onClick={() => handleLogout()}
                    >
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Disclosure.Button
                    as="a"
                    className={classNames(
                      currentRoute === `${item.href}`
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                        : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700",
                      "block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
          <Login
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
          />
          <SignUp
            showSignUpModal={showSignUpModal}
            setShowSignUpModal={setShowSignUpModal}
          />
          <Notification
            showNotificationModal={showNotificationModal}
            setShowNotificationModal={setShowNotificationModal}
            notificationTitle={notificationTitle}
            notificationDescription={notificationDescription}
            notificationType={notificationType}
          />
        </>
      )}
    </Disclosure>
  );
};

export default observer(NavBar);
