"use client";

import React, { useState, useEffect } from "react";
import FooterColumn from "./FooterColumn";
import { fetchPayloadData } from "../services/api";

export default function Footer() {
  const [footerContent, setFooterContent] = useState<
    { title: string; links: { name: string; url: string }[] }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

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

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (footerContent.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <footer>
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-lg font-bold">LOREM IPSUM</div>
        <div>
          <img src="/assets/icons/instagram.svg" alt="Instagram icon" />
          <img src="/assets/icons/fb-black.svg" alt="Facebook icon" />
          <img src="/assets/icons/twitter.svg" alt="X icon" />
        </div>
      </div>
      <div className="footer-columns">
        {footerContent.map((section, index) => (
          <FooterColumn
            key={index}
            title={section.title}
            links={section.links}
          />
        ))}
      </div>
      <div>
        <p>SAC: 0800 888 1010</p>
        <p>(Segunda à sexta-feira, das 09h às 19h)</p>
      </div>
    </footer>
  );
}
