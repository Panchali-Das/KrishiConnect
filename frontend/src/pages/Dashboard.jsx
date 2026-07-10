import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { Phone, MapPin, Mail } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const scrollToSection = (id, key) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(key); // update which tab is active
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <main className="pt-0">
        {/* HERO SECTION */}
        <Hero scrollToSection={scrollToSection} />

        <Reveal>
          <About />
        </Reveal>

        <Reveal delay={0.1}>
          <Services />
        </Reveal>

        <Reveal delay={0.15}>
          <Testimonials />
        </Reveal>

        <Reveal delay={0.2}>
          <Contact />
        </Reveal>
        <Reveal delay={0.25}>
          <Footer scrollToSection={scrollToSection} />
        </Reveal>
      </main>
    </div>
  );
};

export default Dashboard;
