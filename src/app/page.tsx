"use client";

import { useState, useEffect } from "react";
import { fetchPayloadData } from "../services/api";

import "./styles/globals.css";
import facebookWhiteIcon from "../../public/assets/icons/fb-white.svg";
import googleIcon from "../../public/assets/icons/google.svg";

import Header from "@/components/Header";
import { ChevronRight } from "lucide-react";
import Button from "@/components/Button";
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
              <img
                className="mb-[48px]"
                src={section.imageUrl}
                alt={section.altText}
              />
            </div>
          ))}
        </section>

        <section className="section-3 p-4">
          {section3Content.map((section, index) => (
            <div className="space-y-4" key={index}>
              <div>
                <h3>{section.overline}</h3>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>

              <div className="space-y-4">
                <p>Cadastre-se com a sua rede social:</p>
                <div className="social-buttons flex flex-col gap-4">
                  {section.socialLoginOptions.map(
                    (option: string, i: number) => (
                      <Button
                        key={i}
                        textColor={
                          option === "Facebook" ? "text-white" : "text-primary"
                        }
                        bgColor={
                          option === "Facebook" ? "bg-blue-600" : "bg-white"
                        }
                        className={`flex items-center justify-center hover:opacity-75 ${
                          option === "Google" ? " border border-quaternary" : ""
                        }`}
                        onClick={() => console.log(`Clicked on ${option}`)}
                        icon={
                          option === "Facebook"
                            ? facebookWhiteIcon
                            : option === "Google"
                            ? googleIcon
                            : null
                        }
                      >
                        {option}
                      </Button>
                    )
                  )}
                </div>
                <div className="flex items-center justify-center my-2">
                  <div className="flex-grow border-t border-dotted border-quaternary"></div>
                  <span className="mx-4 text-gray-500">OU</span>
                  <div className="flex-grow border-t border-dotted border-quaternary"></div>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 bg-white w-full max-w-md"
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
                      className="border border-gray-300 p-3 w-full placeholder-quinary"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="py-3 flex items-center justify-center"
                  >
                    Próximo
                    <ChevronRight className="ml-2" />
                  </Button>
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
