import { useState, useEffect } from "react";
import Sidebar from "./Admin/Sidebar";
import Footer from "./Admin/Footer";
import Header from "./Admin/Header";

export default function Demo(props) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme class to body
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable full-screen mode:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const openSidebar = () => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;
      document.documentElement.setAttribute(
        "data-sidebar-size",
        newIsOpen ? "lg" : "sm"
      );
      return newIsOpen;
    });
  };
  
  const scrollFunction = () => {
    if (document.documentElement.scrollTop > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const topFunction = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    return () => window.removeEventListener("scroll", scrollFunction);
  }, []);

  return (
    <>
      <div id="layout-wrapper">
        <Header
          theme={theme}
          isOpen={isOpen}
          openSidebar={openSidebar}
          toggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
          toggleTheme={toggleTheme}
        />
        <Sidebar isOpen={isOpen} />
        <div className="vertical-overlay" />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {props.Component}
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <button
        onClick={topFunction}
        className={`btn btn-primary scroll-to-top ${
          isVisible ? "show" : "hide"
        }`}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          display: isVisible ? "block" : "none",
          zIndex: 1000,
        }}
      >
        ↑
      </button>
    </>
  );
}
