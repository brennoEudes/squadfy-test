"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { fetchPayloadData } from "../services/api";
import SocialLinks from "./SocialLinks";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [links, setLinks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

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

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(true);
        setIsLargeScreen(true);
      } else {
        setMenuOpen(false);
        setIsLargeScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="w-full px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-10 lg:py-8">
      <div className="container mx-auto flex flex-col gap-2 items-center lg:w-9/10">
        <div className="container mx-auto flex items-center justify-between">
          {isLargeScreen ? (
            <h2 className="flex-1">LOREM IPSUM</h2>
          ) : (
            <h3 className="flex-1">LOREM IPSUM</h3>
          )}
          <div className="hidden md:flex md:flex-1 md:justify-end">
            <SocialLinks />
          </div>
          <button
            onClick={toggleMenu}
            className={`md:hidden ${
              menuOpen ? "fixed top-4 right-4 z-50" : "relative"
            }`}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav
          className={`fixed top-0 left-0 w-full lg:w-full h-1/3 bg-white text-secondary transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-y-0 z-40" : "-translate-y-full"
          } md:relative md:flex md:items-center md:transform-none md:translate-y-0 lg:mx-auto`}
        >
          {menuOpen && (
            <ul
              className={`flex flex-col items-center justify-center h-full space-y-4 md:flex-row md:space-y-0 md:space-x-6 ${
                menuOpen ? "" : "hidden md:flex"
              }`}
            >
              {links.map((link: any) => (
                <li key={link.url}>
                  <a href={link.url}>{link.name}</a>
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
