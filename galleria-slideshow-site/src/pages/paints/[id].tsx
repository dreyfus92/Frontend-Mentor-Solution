import Head from "next/head";
import { paints, paintsLength } from "../../data/data";
import { Navbar } from "../../components/Navbar";
import { Modal } from "../../components/Modal";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect, useState } from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = paints.map((paint) => ({
    params: { id: paint.id.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const paint = paints.filter((p) => p.id.toString() === params?.id);
  return {
    props: {
      allPaintsData: paint[0],
    },
  };
};

const Paint = ({
  allPaintsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    const [windowSize, setWindowSize] = useState({
      width: 0,
      height: 0,
    });

    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== "undefined") {
        // Handler to call on window resize
        // @ts-ignore
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize.width;
  }

  const desiredWidth = Math.ceil(
    (allPaintsData.id / paintsLength) * useWindowSize()
  );

  const tailwindWidth = `w-[${desiredWidth}px]`;
  console.log(tailwindWidth);
  return (
    <>
      <Head>
        <title>Galleria SlideShow Site</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Navbar />
      <main className="container mt-[24px] mb-[207px] mx-auto flex flex-col items-center min-h-screen">
        <div className="relative w-[327px]">
          <img src={allPaintsData.images.hero.small} alt={allPaintsData.name} />
          <Modal
            imgSrc={allPaintsData.images.thumbnail}
            imgAlt={allPaintsData.name}
          />
          <div className="absolute w-[280px] h-[104px] bg-white -bottom-[52px] flex flex-col items-start justify-center">
            <div className="ml-[24px]">
              <h2 className="text-[24px] leading-[29px] font-bold">
                {allPaintsData.name}
              </h2>
              <p className="text-[#7D7D7D] text-[15px] mt-[8px]">
                {allPaintsData.artist.name}
              </p>
            </div>
          </div>
        </div>
        <div className="relative mt-[98px] w-[327px]">
          <img
            src={allPaintsData.artist.image}
            width="64"
            height="64"
            alt={allPaintsData.artist.name}
            className="absolute -top-[46px]"
          />
          <h1 className="absolute -top-[25px] right-[10px] text-[100px] text-[#F3F3F3] -z-10">
            {allPaintsData.year}
          </h1>
          <p className="text-[#7D7D7D] text-[14px] font-bold leading-[28px] mt-[74px] mb-[40px]">
            {allPaintsData.description}
          </p>
          <a
            href={allPaintsData.source}
            className=" text-[9px] text-[#7D7D7D] underline my-[68px] self-start tracking-[1.92px]"
          >
            GO TO SOURCE
          </a>
        </div>
      </main>
      {/*BottomBar*/}
      <div className="relative h-[72px] border-t-[1px] border-[#E5E5E5] flex items-center justify-between">
        <div
          className={`absolute top-0 h-[2px] ${tailwindWidth} bg-black`}
        ></div>
        <div className="ml-[24px]">
          <p className="text-[14px] leading-[17px]">{allPaintsData.name}</p>
          <p className="text-[10px] mt-[9px]">{allPaintsData.artist.name}</p>
        </div>
        <div className="flex justify-between mr-[24px]">
          <img src="/shared/icon-back-button.svg" />
          <img src="/shared/icon-next-button.svg" className="ml-[24px]" />
        </div>
      </div>
    </>
  );
};

export default Paint;
