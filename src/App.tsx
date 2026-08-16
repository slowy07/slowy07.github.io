import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import AboutMe from "./pages/AboutMe";
import ContactMe from "./pages/ContactMe";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Projects from "./pages/Projects";

export default function App() {
  const [isNavbar, setIsNavbar] = useState("/");

  function render(value: string) {
    if (value === "/") return <Home />;
    if (value === "about-me") return <AboutMe />;
    if (value === "projects") return <Projects />;
    if (value === "contact-me") return <ContactMe />;
    return null;
  }

  return (
    <Layout isNavbar={isNavbar} setIsNavbar={setIsNavbar}>
      <AnimatePresence>{render(isNavbar)}</AnimatePresence>
    </Layout>
  );
}
