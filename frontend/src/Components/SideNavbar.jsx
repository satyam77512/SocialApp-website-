import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SideNavbar.css';

const SideNavbar = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", emoji: "🏠", path: "/home" },
    { label: "Create Post", emoji: "✍️", path: "/create" },
    { label: "Search", emoji: "🔍", path: "/search" },
    { label: "Profile", emoji: "🙍‍♂️", path: "/profile" },
    { label: "My Posts", emoji: "🗂️", path: "/myposts" },
  ];

  return (
    <div className="side-navbar">
      <div className="nav-header">📘 SocialApp</div>
      <div className="nav-links">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="nav-button"
            onClick={() => navigate(item.path)}
          >
            <span className="emoji">{item.emoji}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideNavbar;
