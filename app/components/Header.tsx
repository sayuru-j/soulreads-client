import { navItems as niList } from "../data";
import { NavigationItem } from "../@types";

const Header = () => {
  const navItems: NavigationItem[] = niList;

  return (
    <nav className="flex items-center justify-between max-w-5xl mx-auto py-6 text-black border-b border-black/20">
      <div
        id="left"
        className="flex items-center gap-6 w-1/3 font-semibold text-sm"
      >
        {navItems.slice(0, Math.floor(navItems.length / 2)).map((ni) => (
          <h2 key={ni.id}>{ni.name}</h2>
        ))}
      </div>
      <div id="center" className="flex items-center justify-center w-1/3">
        <h2 className="font-extrabold text-2xl">SOULREADS</h2>
      </div>
      <div
        id="right"
        className="flex items-center gap-6 w-1/3 justify-end font-semibold text-sm"
      >
        {navItems.slice(Math.floor(navItems.length / 2)).map((ni) => (
          <h2 key={ni.id}>{ni.name}</h2>
        ))}
      </div>
    </nav>
  );
};

export default Header;
