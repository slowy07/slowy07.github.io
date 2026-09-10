import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import AboutMe from "./pages/AboutMe";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Projects from "./pages/Projects";
import Requests from "./pages/Requests";

export default function App() {
  const [isNavbar, setIsNavbar] = useState("/");

  function render(value: string) {
    if (value === "/") return <Home />;
    if (value === "about-me") return <AboutMe />;
    if (value === "projects") return <Projects />;
    if (value === "requests") return <Requests />;
    return null;
  }

  return (
    <Layout isNavbar={isNavbar} setIsNavbar={setIsNavbar}>
      <AnimatePresence>{render(isNavbar)}</AnimatePresence>
    </Layout>
  );
}
