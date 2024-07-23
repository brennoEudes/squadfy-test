"use client";

import React, { useState, useEffect } from "react";
import { fetchPayloadData } from "../services/api";

import SocialLinks from "./SocialLinks";
import FooterColumn from "./FooterColumn";

export default function Footer() {
  const [footerContent, setFooterContent] = useState<
    { title: string; links: { name: string; url: string }[] }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPayloadData();

        const footerSections = data.data.navigation.nodes
          .find((node: any) =>
            node.properties.some(
              (property: any) => property.value.alias === "footers"
            )
          )
          ?.properties.find(
            (property: any) => property.value.alias === "footers"
          )
          ?.value.blocks.find((block: any) => block.contentAlias === "footer")
          ?.contentProperties.find(
            (content: any) => content.value.alias === "navigationFooter"
          )?.value.blocks;

        if (footerSections) {
          const parsedSections = footerSections.map((section: any) => {
            const titleProp = section.contentProperties.find(
              (prop: any) => prop.value.alias === "titleFooter"
            );
            const linkProp = section.contentProperties.find(
              (prop: any) => prop.value.alias === "linkFooter"
            );

            const title = titleProp?.value.value || "No title";
            const links = linkProp?.value.links || [];

            return { title, links };
          });

          setFooterContent(parsedSections);
        }
      } catch (error) {
        setError("Failed to load footer data");
        console.error("Error loading payload:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (footerContent.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <footer className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 p-10 md:px-20 md:gap-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between lg:w-[85%]">
        {isLargeScreen ? (
          <h2 className="flex-1">LOREM IPSUM</h2>
        ) : (
          <h3 className="flex-1">LOREM IPSUM</h3>
        )}
        <div className="flex gap-6">
          <SocialLinks />
        </div>
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:flex-wrap md:items-start md:justify-between">
        {footerContent.map((section, index) => (
          <FooterColumn
            key={index}
            title={section.title}
            links={section.links}
          />
        ))}
      </div>
    </footer>
  );
}
