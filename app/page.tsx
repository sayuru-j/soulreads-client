import Body from "./components/Body";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-auto md:overflow-hidden px-8">
      <Header />
      <Hero />
      <Body />
    </div>
  );
}
