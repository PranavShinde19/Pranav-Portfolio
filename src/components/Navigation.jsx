import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import "./Navigation.css";

const links = [
  { label: "Work", id: "work", number: "01" },
  { label: "About", id: "about", number: "02" },
  { label: "Toolkit", id: "skills", number: "03" },
  { label: "Contact", id: "contact", number: "04" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const mobileNavRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    let disposed = false;
    const sections = links.map(({ id }) => document.getElementById(id));
    const update = () => {
      frame = 0;
      if (disposed) return;
      const headerBottom =
        headerRef.current?.getBoundingClientRect().bottom ?? 90;
      const readingLine = Math.max(headerBottom + 36, innerHeight * 0.25);
      let current = "";
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= readingLine) {
          current = section.id;
        }
      }
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 3) {
        current = "contact";
      }
      setActive(current);
      setScrolled(scrollY > 24);
    };
    const schedule = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.fonts.ready.then(schedule);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 520px)");
    const onChange = () => {
      if (!mobile.matches) {
        if (mobileNavRef.current?.contains(document.activeElement)) {
          headerRef.current?.querySelector(".brand")?.focus();
        }
        setOpen(false);
      }
    };
    mobile.addEventListener("change", onChange);
    return () => mobile.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const current = (id) => (active === id ? "location" : undefined);

  return (
    <header
      className="site-header portfolio-navigation"
      data-scrolled={scrolled}
      ref={headerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <a
        className="brand"
        href="#home"
        aria-label="Pranav Shinde, back to top"
        onClick={() => setOpen(false)}
      >
        <span className="brand-symbol">
          P<span>/</span>S
        </span>
        <span className="brand-name">
          PRANAV
          <br />
          SHINDE
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.slice(0, 3).map(({ label, id, number }) => (
          <a href={`#${id}`} key={id} aria-current={current(id)}>
            <span aria-hidden="true">{number}</span> {label}
          </a>
        ))}
      </nav>
      <a
        className="header-contact"
        href="#contact"
        aria-current={current("contact")}
        onClick={() => setOpen(false)}
      >
        Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
      </a>
      <button
        ref={toggleRef}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open && (
        <nav
          ref={mobileNavRef}
          className="mobile-nav"
          id="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map(({ label, id, number }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={current(id)}
              onClick={() => setOpen(false)}
            >
              <span className="mono" aria-hidden="true">
                {number}
              </span>
              {label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
