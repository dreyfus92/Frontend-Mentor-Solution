import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import type { PaintDetailProps } from "../data/data";
import { paints } from "../data/data";
import { Navbar } from "../components/Navbar";
import { Breakpoint, Plock } from "react-plock";

const Home: NextPage = () => {
  const breakpoints: Breakpoint[] = [
    { size: 640, columns: 1 },
    { size: 768, columns: 2 },
    { size: 1024, columns: 3 },
    { size: 1280, columns: 4 },
  ];
  return (
    <>
      <Head>
        <title>Galleria SlideShow Site</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Navbar />
      <main className="flex items-center justify-center my-[24px] md:my-[40px]">
        <Plock breakpoints={breakpoints} debounce={10}>
          {paints.map(
            ({ name, images, id, artist }: PaintDetailProps, index: number) => (
              <Link key={index} href={`/paints/${id}`}>
                <div className="relative mx-[24px] mb-[24px] last:mb-0 hover:opacity-75 md:mx-[14px]">
                  <img src={images.thumbnail} alt={name} />
                  <div
                    id="fade-layer"
                    className="absolute bottom-0 left-0 w-[327px] h-[170px] lg: flex items-end"
                  >
                    <div className="text-white ml-[32px] mb-[33px] w-[246px]">
                      <h2 className="font-bold text-[24px] leading-[30px]">
                        {name}
                      </h2>
                      <p className="text-[13px] leading-[16px] opacity-75 mt-[6px]">
                        {artist.name}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </Plock>
      </main>
    </>
  );
};

export default Home;
