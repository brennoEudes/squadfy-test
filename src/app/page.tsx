"use client";

import { useState, useEffect } from "react";
import { fetchPayloadData } from "../services/api";

import Image from "next/image";
import "./styles/globals.css";

import Header from "@/components/Header";
import { ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  const [heroContent, setHeroContent] = useState({
    overline: "",
    title: "",
    description: "",
    imageUrl: "",
    altText: "",
  });

  const [section2Content, setSection2Content] = useState<any[]>([]);
  const [section3Content, setSection3Content] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Email enviado: ${email}`);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPayloadData();

        // hero data extraction:
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

        // section 2 data extraction:
        const sections = data.data.page.properties.find(
          (property: any) => property.value.alias === "sections"
        )?.value.blocks;

        if (sections) {
          const section2Data = sections
            .filter((section: any) => section.contentAlias === "contentImage")
            .map((section: any) => {
              const overline =
                section.contentProperties.find(
                  (prop: any) => prop.alias === "overline"
                )?.value.value || "";
              const title =
                section.contentProperties.find(
                  (prop: any) => prop.alias === "title"
                )?.value.value || "";
              const description =
                section.contentProperties.find(
                  (prop: any) => prop.alias === "description"
                )?.value.sourceValue || "";
              const imageUrl =
                section.contentProperties.find(
                  (prop: any) => prop.alias === "image"
                )?.value.mediaItems[0].url || "";
              const altText =
                section.contentProperties.find(
                  (prop: any) => prop.alias === "altText"
                )?.value.value || "";

              return { overline, title, description, imageUrl, altText };
            });

          // section 3 data extraction:
          const section3Data = sections
            .filter((section: any) => section.contentAlias === "widgetCapture")
            .map((section: any) => {
              const overline =
                section.contentProperties.find(
                  (prop: any) => prop.alias === "overline"
                )?.value.value || "";
              const title =
                section.contentProperties.find(
                  (prop: any) => prop.alias === "title"
                )?.value.value || "";
              const description =
                section.contentProperties.find(
                  (prop: any) => prop.alias === "description"
                )?.value.sourceValue || "";
              const socialLoginOptions =
                section.contentProperties.find(
                  (prop: any) => prop.alias === "socialLoginOptions"
                )?.value.value || [];

              return { overline, title, description, socialLoginOptions };
            });

          setSection2Content(section2Data);
          setSection3Content(section3Data);
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
        <section
          className="hero bg-cover bg-center h-[608px]"
          style={{ backgroundImage: `url(${heroContent.imageUrl})` }}
        >
          <div className="mt-[104px] pt-[70px] pl-[72px] pb-4">
            <div className="bg-white p-4 gap-1">
              <h3>{heroContent.overline}</h3>
              <h1>{heroContent.title}</h1>
              <h4>{heroContent.description}</h4>
              <div className="flex justify-end items-end">
                <p className="text-secondary text-4xl font-bold">+</p>
              </div>
            </div>
          </div>
        </section>
        <section className="section-2 g-1">
          {section2Content.map((section, index) => (
            <div key={index}>
              <div className="p-4">
                <h3>{section.overline}</h3>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
                <div className="flex justify-end items-end">
                  <p className="text-secondary text-4xl font-bold">+</p>
                </div>
              </div>
              <img className="mb-4" src={section.imageUrl} alt={section.altText} />
            </div>
          ))}
        </section>
        <section className="section-3">
          {section3Content.map((section, index) => (
            <div key={index}>
              <h3>{section.overline}</h3>
              <h2>{section.title}</h2>
              <p>{section.description}</p>

              <div>
                <p>Cadastre-se com a sua rede social:</p>
                {section.socialLoginOptions.map((option: string, i: number) => (
                  <button key={i}>{option}</button>
                ))}
                <div>
                  <p>OU</p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
                >
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      Seu e-mail:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  >
                    Próximo
                    <ChevronRight className="ml-2" />
                  </button>
                </form>
              </div>
            </div>
          ))}

          <div></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
