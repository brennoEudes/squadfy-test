"use client";

import "./styles/globals.css";
import { useEffect, useState } from "react";
import { fetchPayloadData } from "../services/api";

import { Header } from "@/components/Header";

export default function Home() {
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPayloadData();
        setTitle(data.title);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-blue-500">
          {title || "Loading..."}
        </h1>
      </div>
    </div>
  );
}
