import HeroContent from "./HeroContent";
import HeroCard from "./HeroCard";
import tractorImg from "../Images/TractorImg.jpg";

const Hero = ({ scrollToSection }) => {
  return (
    <section
      id="home-section"
      className="relative min-h-screen w-full overflow-hidden bg-zinc-950 flex items-center"
    >
      {/* Background Image Asset Wrapper */}
      <img
        src={tractorImg}
        alt="Farmer navigating fields"
        className="absolute inset-0 w-full h-full object-cover opacity-95"
      />

      {/* Premium Cinematic Grade Image Gradients */}
      <div className="absolute inset-0 bg-zinc-950/20 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/35 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent z-10" />

      {/* Text Content — no longer shares a grid row with the card */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        <div className="w-full lg:max-w-2xl">
          <HeroContent scrollToSection={scrollToSection} />
        </div>
      </div>

      {/* Floating Dashboard Card — positioned directly off the section, not the grid */}
      <HeroCard />

      {/* Minimalistic Page Scroll Pointer */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-white/10 backdrop-blur-sm flex justify-center p-1">
          {/* Combined animate-bounce with a faster 0.6s duration */}
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-duration:0.6s] mt-1" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
