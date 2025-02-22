import ContentCards from "@/components/ContentCards";
import HeroSection from "@/components/HeroSection";

import NewsSlider from "@/components/NewsSlider";
import ScrollableDetails from "@/components/ScrollableDetails";
import ReviewList from "@/components/ReviewList";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
       
    //   </main>
      
    // </div>
    <main>
      <HeroSection/>
      <ScrollableDetails/>
      <ContentCards/>
      <ReviewList />
      <NewsSlider/>

      {/* <Footer/> */}
    </main>
  );
}
