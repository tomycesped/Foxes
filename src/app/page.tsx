'use client'

import { useState, useEffect, useRef } from "react";
import type { MouseEventHandler } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { LazyImage } from "./components/LazyImage";
import { random } from "lodash";
import "./globals.css";
import { motion } from "framer-motion";

const generateId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const myRandom = () => random(1, 123);

const Home: NextPage = () => {
  const [images, setImages] = useState<Array<IFoxImageItem>>([]);
  const mainRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = () => {
    const id = generateId();
    const url = `https://randomfox.ca/images/${myRandom()}.jpg`;
    setImages(prev => [...prev, { id, url }]);
  };

  // Scroll al agregar la primera imagen
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (images.length === 1) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }, [images.length]);

  return (
    <div className="overflow-x-hidden bg-amber-500 min-h-screen flex flex-col">
      <Head>
        <title>Lazy Foxes!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="fixed top-0 left-0 right-0 bg-amber-800 shadow-2xl z-10">
        <div className="p-1 px-4 flex items-center justify-between">
          <h1 className="text-5xl">🦊</h1>
          <h1 className="font-serif underline text-white text-4xl py-2">Foxes</h1>
          <h1 className="text-5xl">🦊</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={addNewFox}
              className="relative bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full mb-2 overflow-hidden"
              whileTap={{ scale: 0.9 }}
            >
              Add new fox
              <motion.span
                className="absolute inset-0 rounded-full bg-white opacity-20"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
            <motion.span
              key={images.length}
              className="text-white text-lg font-bold flex items-center gap-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {images.length} 🦊
            </motion.span>
          </div>
        </div>
      </header>

      <main 
        ref={mainRef}
        className="flex-1 pt-[115px] pb-[70px] md:pt-[170px] md:pb-[80px]"
      >
        <div className="flex flex-col items-center">
          {images.map(({ id, url }, index) => (
            <div className="p-4 w-full max-w-md" key={id}>
              <LazyImage
                src={url}
                width="320"
                height="auto"
                className="mx-auto my-auto rounded-md bg-gray-300 shadow-black shadow-lg"
                onLazyLoad={(img) => {
                  console.log(`Image #${index + 1} cargada. Nodo:`, img);
                }}
              />
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-amber-800 text-white text-center p-2 pb-3">
        <p>Hecho con amor por @tomcesped</p>
        <p>API administrada por randomfox.ca</p>
      </footer>
    </div>
  );
};

export default Home;