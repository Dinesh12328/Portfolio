import { navLinks } from "@/app/data/portfolio";

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label="Dinesh Pyla home">
          <span>DP</span>
          <strong>Dinesh Pyla</strong>
        </a>
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
