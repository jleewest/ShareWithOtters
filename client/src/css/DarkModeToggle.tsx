import { useState, useEffect } from "react";
import sun from '../assets/sun.svg';
import moon from '../assets/moon.svg';

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const root = window.document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
  }, [darkMode]);

  return (
    <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
      <img src={darkMode ? sun : moon} alt={darkMode ? "Light Mode" : "Dark Mode"} />
    </button>
  );
};

export default DarkModeToggle;
