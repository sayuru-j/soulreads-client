import Body from "./components/Body";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-[#ededed] overflow-hidden">
      <Header />
      <Hero />
      <Body />
    </div>
  );
}
