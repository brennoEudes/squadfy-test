"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-lg font-bold">LOREM IPSUM</div>

        <button onClick={toggleMenu} className="md:hidden">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav
          className={`fixed top-0 left-0 w-full h-full bg-white text-secondary transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } md:relative md:flex md:items-center md:transform-none md:translate-x-0`}
        >
          <ul className="flex flex-col items-center justify-center h-full space-y-8 md:flex-row md:space-y-0 md:space-x-6">
            <li>
              <a href="#home" className="text-lg">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="text-lg">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="text-lg">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="text-lg">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
