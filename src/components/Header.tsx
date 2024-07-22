"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { fetchPayloadData } from "../services/api";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [links, setLinks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPayloadData();

        const headerLinks = data.data.navigation.nodes
          .flatMap((node: any) => node.properties)
          .find((property: any) => property.value.alias === "headers")
          ?.value.blocks.flatMap((block: any) => block.contentProperties)
          .find((content: any) => content.value.alias === "navigation")
          ?.value.links;

        setLinks(headerLinks || []);
      } catch (error) {
        setError("Failed to load data");
        console.error("Error loading payload:", error);
      }
    };

    loadData();
  }, []);

  return (
    <header>
      <div className="container mx-auto flex items-center justify-between p-2 h-[72px]">
        <div className="text-lg font-bold">LOREM IPSUM</div>

        <button onClick={toggleMenu} className={`md:hidden ${menuOpen ? "fixed top-4 right-4 z-50" : "relative"}`}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav
          className={`fixed top-0 left-0 w-full h-1/3 bg-white text-secondary transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          } md:relative md:flex md:items-center md:transform-none md:translate-y-0`}
        >
          {menuOpen && (
            <ul className="flex flex-col items-center justify-center h-full space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              {links.map((link: any) => (
                <li key={link.url}>
                  <a href={link.url} >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </header>
  );
}
