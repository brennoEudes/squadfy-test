"use client";

import React, { useState, useEffect } from "react";
import { fetchPayloadData } from "../services/api";

import Image from "next/image";
import instagramIcon from "../../public/assets/icons/instagram.svg";
import facebookIcon from "../../public/assets/icons/fb-black.svg";
import twitterIcon from "../../public/assets/icons/twitter.svg";

import FooterColumn from "./FooterColumn";

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
    <footer className="p-4">
      <div className="container mx-auto flex flex-col gap-8 pt-6">
        <h2>LOREM IPSUM</h2>
        <div className="flex gap-6">
          <Image
            src={instagramIcon}
            alt="Instagram icon"
            width={24}
            height={24}
          />
          <Image
            src={facebookIcon}
            alt="Facebook icon"
            width={24}
            height={24}
          />
          <Image src={twitterIcon} alt="X icon" width={24} height={24} />
        </div>
      </div>
      <div className="py-8 flex flex-wrap gap-8">
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
