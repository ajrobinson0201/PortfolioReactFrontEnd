import { useState } from "react";
import "./App.css";
import MoistureDashboard from "./MoistureSensors";

function App() {
  const [activeTab, setActiveTab] = useState<"home" | "projects" | "contact">("home");

  return (
    <div className="app">
      {/* Navigation */}
      <header className="navbar">
        <h1 className="logo">My Portfolio</h1>
        <nav>
          <button onClick={() => setActiveTab("home")}>Home</button>
          <button onClick={() => setActiveTab("projects")}>Projects</button>
          <button onClick={() => setActiveTab("contact")}>Contact</button>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {activeTab === "home" && (
          <section className="hero">
            <h2>Welcome!</h2>
            <p>
              Hi, I’m <strong>Aaron Robinson</strong>.  
              I build projects in Python, React, and data engineering.  
              This dashboard is where I share my work and experiments.
            </p>
          </section>
        )}

        {activeTab === "projects" && (
          <section className="projects">
            <h2>Projects</h2>
            <ul>
              <li>💧 Moisture Sensor with ESP32 + Raspberry Pi</li>
              <MoistureDashboard />
              <li>🎮 Python Game (Pygame experiment)</li>
              <li>📊 Data Engineering + Milvus Vector Database</li>
            </ul>
          </section>
        )}

        {activeTab === "contact" && (
          <section className="contact">
            <h2>Contact Me</h2>
            <p>Email: <a href="mailto:ajrobinson0201@gmail.com">ajrobinson0201@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com/ajrobinson0201" target="_blank" rel="noreferrer">github.com/ajrobinson0201</a></p>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer>
        <p>© {new Date().getFullYear()} Aaron Robinson. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
