"use client";
import HeroSection from "@/components/homePage/HeroSection";
import { Montserrat } from "next/font/google";
import ScrollTutorial from "@/components/homePage/Tuto";
import OurTeam from "@/components/homePage/OurTeam";
import Flow from "@/components/homePage/flow";
import GetStartedSection from "@/components/homePage/GetStarted";
import TutorialsSection from "@/components/homePage/Tutorials";
import VideoTutorialsSection from "@/components/homePage/YoutubeVideos";


const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"], // Example weights
  subsets: ["latin"],
  display: "swap", // Optimizes font loading
  variable: "--font-montserrat", // Optional: for CSS variables
});
export default function Home() {
  return (
    <div className={`${montserrat.className}  relative bg-background`}>
         {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          backgroundImage: resolvedTheme == "dark" ? 
            "linear-gradient(0deg, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)" : "linear-gradient(0deg, rgba(0,0,0,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.9) 1px, transparent 1px)" ,
          backgroundSize: "40px 40px",
          backgroundPosition: "-1px -1px",
          opacity: 0.25,
        }}
      /> */}
      <HeroSection />
      <ScrollTutorial></ScrollTutorial>
      {/* <OurTeam></OurTeam> */}
      {/* <WorkFlow/> */}
      <Flow/>
      <GetStartedSection/>
      <VideoTutorialsSection/>
      <TutorialsSection/>
    </div>
  );
}
