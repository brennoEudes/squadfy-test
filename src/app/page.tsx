"use client";

import { useState, useEffect } from "react";
import { fetchPayloadData } from "../services/api";

import "./styles/globals.css";

import { Header } from "@/components/Header";

export default function Home() {
  const [heroContent, setHeroContent] = useState<any>(null);
  const [section2Content, setSection2Content] = useState<any[]>([]);
  //const [section3Content, setSection3Content] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

 

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPayloadData();

        // hero data extraction
        const heroSection = data.data.page.properties
          .find((property: any) => property.value.alias === "hero")
          ?.value.blocks.find(
            (block: any) => block.contentAlias === "heroImage"
          );

        if (heroSection) {
          const overline =
            heroSection.contentProperties.find(
              (prop: any) => prop.alias === "overline"
            )?.value.value || "";
          const title =
            heroSection.contentProperties.find(
              (prop: any) => prop.alias === "title"
            )?.value.value || "";
          const description =
            heroSection.contentProperties.find(
              (prop: any) => prop.alias === "description"
            )?.value.sourceValue || "";
          const imageUrl =
            heroSection.contentProperties.find(
              (prop: any) => prop.alias === "image"
            )?.value.mediaItems[0].url || "";
          const altText =
            heroSection.contentProperties.find(
              (prop: any) => prop.alias === "altText"
            )?.value.value || "";

          setHeroContent({ overline, title, description, imageUrl, altText });
        }

        // sections data extraction
        const sections = data.data.page.properties.find(
          (property: any) => property.value.alias === "sections"
        )?.value.blocks;

        if (sections) {
          const section2Data = sections.filter(
            (section: any) => section.contentAlias === "contentImage"
          ).map((section: any) => {
            const overline = section.contentProperties.find(
              (prop: any) => prop.alias === "overline"
            )?.value.value || "";
            const title = section.contentProperties.find(
              (prop: any) => prop.alias === "title"
            )?.value.value || "";
            const description = section.contentProperties.find(
              (prop: any) => prop.alias === "description"
            )?.value.sourceValue || "";
            const imageUrl = section.contentProperties.find(
              (prop: any) => prop.alias === "image"
            )?.value.mediaItems[0].url || "";
            const altText = section.contentProperties.find(
              (prop: any) => prop.alias === "altText"
            )?.value.value || "";

            return { overline, title, description, imageUrl, altText };
          });

          // const section3Data = sections.filter(
          //   (section: any) => section.contentAlias === "widgetCapture"
          // ).map((section: any) => {
          //   const overline = section.contentProperties.find(
          //     (prop: any) => prop.alias === "overline"
          //   )?.value.value || "";
          //   const title = section.contentProperties.find(
          //     (prop: any) => prop.alias === "title"
          //   )?.value.value || "";
          //   const description = section.contentProperties.find(
          //     (prop: any) => prop.alias === "description"
          //   )?.value.sourceValue || "";
          //   const socialLoginOptions = section.contentProperties.find(
          //     (prop: any) => prop.alias === "socialLoginOptions"
          //   )?.value.value || [];

          //   return { overline, title, description, socialLoginOptions };
          // });

          setSection2Content(section2Data);
          //setSection3Content(section3Data);
        }

      } catch (error) {
        setError("Failed to load data");
        console.error("Error loading payload:", error);
      }
    };

    loadData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!heroContent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <main>
        <section className="hero">
          <img src={heroContent.imageUrl} alt={heroContent.altText} />
          <div>
            <h3>{heroContent.overline}</h3>
            <h1>{heroContent.title}</h1>
            <h4>{heroContent.description}</h4>
            <img src="/assets/icons/plus-icon.svg" alt="Black plus icon" />
          </div>
        </section>
        <section className="section-2">
        {section2Content.map((section, index) => (
            <div key={index}>
              <h3>{section.overline}</h3>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
              <img src="/assets/icons/plus-icon.svg" alt="Black plus icon" />
              <img src={section.imageUrl} alt={section.altText} />
            </div>
          ))}
        </section>
        <section className="section-3">
          <div>
            <h3></h3>
            <h2></h2>
            <p></p>
            <img src="" alt="" />
          </div>
          <div>
            <p></p>
            <button></button>
            <button></button>
            <div>
              <p>OU</p>
            </div>
            <div>
              <p>Próximo</p>
              <img src="" alt="" />
              
            </div>
          </div>
        </section>
      </main>
      <footer>Footer</footer>
    </div>
  );
}
