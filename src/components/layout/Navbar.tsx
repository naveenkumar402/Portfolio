import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { navItems } from '../../data/portfolio';
import { scrollToSection } from './scrollTo';

// Scenes that belong to a nav item without having one of their own.
const ALIAS: Record<string, string> = { workflow: 'aidlc', education: 'experience' };

export function Navbar() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.45;
      let current = 'home';
      document.querySelectorAll<HTMLElement>('[data-scene]').forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) current = s.dataset.scene ?? current;
      });
      setActive(ALIAS[current] ?? current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(id);
  };

  const links = (
    <ul className="nav__list">
      {navItems.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={go(item.id)}
            className={`nav__link${active === item.id ? ' is-active' : ''}`}
            aria-current={active === item.id ? 'true' : undefined}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="nav">
      <a href="#home" className="nav__brand" onClick={go('home')} aria-label="Naveenkumar D, back to top">
        <span className="nav__mark" aria-hidden="true">ND</span>
      </a>
      <nav className="nav__desktop" aria-label="Primary">
        {links}
      </nav>
      <button
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="nav__mobile"
            aria-label="Primary mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {links}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
