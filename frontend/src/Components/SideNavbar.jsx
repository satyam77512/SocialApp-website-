import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideNavbar.css';

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", emoji: "🏠", path: "/home" },
    { label: "Create Post", emoji: "✍️", path: "/create" },
    { label: "Search", emoji: "🔍", path: "/search" },
    { label: "Profile", emoji: "🙍‍♂️", path: "/profile" },
    { label: "My Posts", emoji: "🗂️", path: "/myposts" },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false); // auto-close sidebar on mobile
  };

  return (
    <>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={`side-navbar ${isOpen ? 'open' : ''}`}>
        <div className="nav-header">📘 SocialApp</div>
        <div className="nav-links">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="nav-button"
              onClick={() => handleNavClick(item.path)}
            >
              <span className="emoji">{item.emoji}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default SideNavbar;
