import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  const Body: React.FC = () => {
    return (
      <div className="flex flex-col items-center py-2 justify-center max-w-5xl mx-auto text-black font-medium">
        <div className="flex w-full py-4">
          <div className="w-1/2 flex flex-col justify-center text-sm">
            <div className="flex gap-4 items-center">
              <h2>Gain knowledge</h2>
              <h2 className="bg-[#5D3FD3] py-1 px-2 rounded-full text-white font-semibold">
                15m / day
              </h2>
            </div>
            <h2>
              Heal starts here
              <span className="text-[#5D3FD3] text-[20px]">.</span>
            </h2>
          </div>
          <div className="w-1/2 flex gap-10 items-center justify-end text-sm">
            <div>
              <h2 className="font-bold text-[#da4363]">95%</h2>
              <h2>more reading</h2>
            </div>
            <div>
              <h2 className="font-bold text-[#da4363]">91%</h2>
              <h2>better habits</h2>
            </div>
          </div>
        </div>
        <div>Bottom</div>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen">
      <Header />
      <Hero />
      <Body />
    </div>
  );
}
