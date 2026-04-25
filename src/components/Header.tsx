const links = ["about", "skills", "projects", "services", "experience", "contact"];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/45 backdrop-blur-xl">
      <nav className="section-shell flex h-20 items-center justify-between">
        <a href="#" className="font-fredoka text-2xl font-semibold text-white">
          Mahmoud<span className="text-soft">.</span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-white/68 lg:flex">
          {links.map((link) => (
            <a key={link} href={`#${link}`} className="capitalize transition hover:text-white">
              {link}
            </a>
          ))}
        </div>
        <a href="#contact" className="neon-button !px-4 !py-2 text-sm">
          <i className="fa-solid fa-paper-plane" />
          Hire Me
        </a>
      </nav>
    </header>
  );
}
