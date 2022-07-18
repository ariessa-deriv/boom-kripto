import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Dashboard />
    </div>
  );
}
