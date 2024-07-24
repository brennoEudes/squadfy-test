"use client";

import { useState, useEffect, SyntheticEvent, MouseEvent } from "react";
import { fetchPayloadData } from "../services/api";

import "./styles/globals.css";

import facebookWhiteIcon from "../../public/assets/icons/fb-white.svg";
import googleIcon from "../../public/assets/icons/google.svg";
import { ChevronRight } from "lucide-react";

import Header from "@/components/Header";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

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
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setFeedbackMessage("Por favor, insira um endereço de e-mail válido.");
      setIsError(true);
    } else {
      setFeedbackMessage("E-mail enviado com sucesso!");
      setIsError(false);
      setEmail("");
      console.log("Formulário enviado com sucesso.");
    }
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    handleSubmit(e as SyntheticEvent);
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
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
        <AnimatedSection
          className="hero bg-cover bg-center h-[70vh]"
          style={{ backgroundImage: `url(${heroContent.imageUrl})` }}
        >
          <div className="w-full h-full relative p-10vh p-60vw">
            <div
              className=" bg-white flex flex-col p-4 gap-2 absolute bottom-0 right-0 m-4 max-w-90p max-h-90p"
              
            >
              <h6 className="text-sm md:text-base lg:text-lg xl:text-xl">
                {heroContent.overline}
              </h6>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                {heroContent.title}
              </h1>
              <h5 className="text-base md:text-lg lg:text-xl xl:text-2xl">
                {heroContent.description}
              </h5>
              <div className="flex justify-end items-end mt-auto">
                <p className="text-secondary text-4xl font-bold">+</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="section-2 flex flex-col gap-2 pt-10 md:pt-20">
          {section2Content.map((section, index) => (
            <div key={index} className="md:flex md:justify-between md:gap-4">
              <div className="px-4 flex flex-col gap-2 pb-4 md:px-20 md:justify-center md:flex-grow">
                <h6>{section.overline}</h6>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
                <div className="flex justify-end items-end">
                  <p className="text-secondary text-4xl font-bold">+</p>
                </div>
              </div>
              <img
                src={section.imageUrl}
                alt={section.altText}
                className="md:w-1/2 w-full h-auto object-cover"
              />
            </div>
          ))}
        </AnimatedSection>

        <AnimatedSection className="section-3 flex flex-col gap-2 px-4 pt-10 md:p-20">
          {section3Content.map((section, index) => (
            <div
              className="space-y-4 md:flex md:space-y-0 md:gap-6 lg:gap-8"
              key={index}
            >
              <div className="flex flex-col gap-2 pb-4 md:pb-0 md:w-1/2 md:justify-center md:flex-frow">
                <h6>{section.overline}</h6>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>

              <div className="space-y-4 md:w-1/2">
                <p>Cadastre-se com a sua rede social:</p>
                <div className="social-buttons flex flex-col gap-4 md:flex-row">
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
                        } w-full md:flex-1`}
                        onClick={() => console.log(`Clicked on ${option}`)}
                        icon={
                          option === "Facebook"
                            ? facebookWhiteIcon
                            : option === "Google"
                            ? googleIcon
                            : null
                        }
                        iconAlt={`${option} icon`}
                      >
                        {option}
                      </Button>
                    )
                  )}
                </div>

                <div className="flex items-center justify-center py-4">
                  <div className="flex-grow border-t border-dotted border-quaternary "></div>
                  <span className="mx-4 text-gray-500">OU</span>
                  <div className="flex-grow border-t border-dotted border-quaternary"></div>
                </div>

                <form
                  className="flex flex-col gap-4 mb-4 bg-white w-full"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-4 md:flex md:items-center md:space-x-4 w-full">
                    <div className="email-data-group flex flex-col md:flex-row md:items-center md:space-x-4 md:flex-grow">
                      <div className="email-data md:flex md:flex-col md:w-full">
                        <label
                          htmlFor="email"
                          className="block text-gray-700 mb-2"
                        >
                          Seu e-mail:
                        </label>
                        {feedbackMessage && (
                          <p
                            className={`text-sm ${
                              isError ? "text-red-500" : "text-green-500"
                            } md:ml-0`}
                          >
                            {feedbackMessage}
                          </p>
                        )}
                        <div className="flex flex-col items-center w-full md:flex-row md:space-x-8">
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
                          <div className="flex-shrink-0 md:ml-4 mt-4 md:mt-0">
                            <Button
                              type="submit"
                              onClick={handleClick}
                              className="py-3 flex items-center justify-center w-full md:w-auto"
                            >
                              Próximo
                              <ChevronRight className="ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
