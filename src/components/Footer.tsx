export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="section-shell flex flex-col gap-3 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
        <p>Copyright {new Date().getFullYear()} Mahmoud Akram. All rights reserved.</p>
        <p className="font-fredoka text-white/70">Built for Speed. Designed to Impress.</p>
      </div>
    </footer>
  );
}
