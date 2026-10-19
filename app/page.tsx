"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Menu, X } from "lucide-react";
import { projects, type Project } from "@/data/projects";

const filters = [
  "All",
  "Residential",
  "Commercial & Institutional",
  "Renovation",
  "Facade & Modelling",
  "Concepts",
];

const heroImage = "/images/juwonmain.jpg";
const aboutImage =
  "https://images.pexels.com/photos/9615249/pexels-photo-9615249.jpeg?auto=compress&cs=tinysrgb&w=1280";
const formSubmitEmail = process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL?.trim() ?? "";
const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  useEffect(() => {
    if (!activeProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalCloseRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [activeProject]);

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!formSubmitEmail) {
      setFormStatus("The enquiry form is not configured yet. Please contact us on WhatsApp.");
      return;
    }

    setIsSubmitting(true);
    setFormStatus("");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(formSubmitEmail)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(form).entries()),
          _subject: "New portfolio enquiry",
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success === false || result.success === "false") throw new Error("FormSubmit rejected the enquiry");
      form.reset();
      setFormStatus("Thanks for your enquiry. Your message has been sent.");
    } catch {
      setFormStatus("We couldn't send your message. Please try again or contact us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <div className="site-shell" id="top">
      <header className="sticky top-0 z-40 border-b border-[#cbd1d3] bg-[#f3f2ee]/95 backdrop-blur">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8"
          aria-label="Primary navigation"
        >
          <a
            href="#top"
            onClick={closeMobileMenu}
            className="text-sm font-bold uppercase tracking-[.16em] text-[#17212b]"
          >
            OA<span className="text-[#415d73]">.</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a className="nav-link text-sm font-medium" href="#about">About</a>
            <a className="nav-link text-sm font-medium" href="#projects">Projects</a>
            <a className="nav-link text-sm font-medium" href="#services">Services</a>
            <a className="nav-link text-sm font-medium" href="#contact">Contact</a>
          </div>

          <a
            href="#contact"
            className="hidden border border-[#415d73] px-4 py-2 text-xs font-bold uppercase tracking-[.1em] text-[#415d73] transition hover:bg-[#415d73] hover:text-white md:block"
          >
            Work together
          </a>
          <button
            className="inline-flex items-center justify-center border border-[#415d73] p-2 text-[#415d73] md:hidden"
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </nav>

        <div
          id="mobile-menu"
          className={`mobile-menu border-t border-[#cbd1d3] bg-[#f3f2ee] px-5 py-5 md:hidden ${mobileMenuOpen ? "" : "hidden"}`}
        >
          <div className="flex flex-col gap-4">
            <a className="text-base font-medium" href="#about" onClick={closeMobileMenu}>About</a>
            <a className="text-base font-medium" href="#projects" onClick={closeMobileMenu}>Projects</a>
            <a className="text-base font-medium" href="#services" onClick={closeMobileMenu}>Services</a>
            <a className="text-base font-medium" href="#contact" onClick={closeMobileMenu}>Contact</a>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl grid-cols-1 border-x border-[#cbd1d3] md:grid-cols-[1.05fr_.95fr]">
          <div className="flex flex-col justify-between px-5 py-12 sm:px-8 md:min-h-[650px] md:px-12 md:py-16">
            <div>
              <div className="reveal flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#3bcd21]" />
                <p
                  className="canva-tag text-xs font-bold uppercase tracking-[.16em]"
                  style={{ color: "rgb(65, 93, 115)", fontWeight: 700, fontStyle: "normal", fontSize: 12, letterSpacing: "0.12rem" }}
                >
                  Available for work
                </p>
              </div>
              <p
                className="canva-text reveal reveal-delay-1 mt-14 text-xs font-bold uppercase tracking-[.17em] text-[#65717d]"
                style={{ color: "rgb(101, 113, 125)", fontWeight: 700, fontStyle: "normal", fontSize: 12, letterSpacing: "0.12rem" }}
              >
                Portfolio / Architectural Practice
              </p>
              <h1
                className="canva-text editorial-serif reveal reveal-delay-1 mt-3 max-w-xl text-5xl leading-[.95] tracking-tight sm:text-6xl lg:text-7xl"
                style={{ color: "rgb(23, 33, 43)", fontWeight: 600, fontStyle: "normal", fontSize: 32 }}
              >
                Oluwajuwon Adewuyi
              </h1>
              <p
                className="canva-text reveal reveal-delay-2 mt-8 text-xl font-semibold text-[#415d73]"
                style={{ color: "rgb(65, 93, 115)", fontWeight: 700, fontStyle: "normal", fontSize: 20 }}
              >
                Graduate Architect
              </p>
              <p
                className="canva-text reveal reveal-delay-2 mt-2 max-w-md text-sm leading-6 text-[#65717d]"
                style={{ color: "rgb(101, 113, 125)", fontWeight: 400, fontStyle: "normal", fontSize: 15, lineHeight: 1.5 }}
              >
                Design &amp; Management · Visualizer · Interior Design
              </p>
            </div>

            <div className="reveal reveal-delay-3 mt-14">
              <div className="rule mb-6 max-w-lg" />
              <p
                className="canva-text max-w-xl text-lg leading-8 text-[#263f54]"
                style={{ color: "rgb(38, 63, 84)", fontWeight: 400, fontStyle: "normal", fontSize: 18, lineHeight: 1.6 }}
              >
                I help architecture firms turn sketches, PDFs and design concepts into clean Revit/CAD drawings.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="canva-button inline-flex items-center gap-2 bg-[#415d73] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#263f54]"
                  href="#projects"
                  style={{ background: "rgb(65, 93, 115)", color: "rgb(255, 255, 255)", fontWeight: 700, fontStyle: "normal", fontSize: 16 }}
                >
                  Selected projects
                </a>
                <a
                  className="canva-button inline-flex items-center gap-2 border border-[#415d73] px-5 py-3 text-sm font-bold text-[#415d73] transition hover:bg-[#dbe5e8]"
                  href="#services"
                  style={{ background: "rgb(243, 242, 238)", color: "rgb(65, 93, 115)", fontWeight: 700, fontStyle: "normal", fontSize: 16 }}
                >
                  View services
                </a>
              </div>
            </div>
          </div>

          <div className="hero-portrait architect-grid border-t border-[#cbd1d3] md:border-l md:border-t-0">
            <img className="canva-image" loading="lazy" src={heroImage} alt="Oluwajuwon Adewuyi" />
            <div className="blue-block" aria-hidden="true" />
            <div className="absolute bottom-7 left-7 z-10 border-l border-white pl-4 text-xs font-bold uppercase tracking-[.14em] text-white">
              Portfolio / 2026
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-[#cbd1d3] bg-[#e9e9e4]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[.8fr_1.2fr]">
            <div className="relative min-h-[350px] border-b border-[#cbd1d3] md:min-h-[480px] md:border-b-0 md:border-r">
              <img
                className="canva-image h-full w-full object-cover grayscale"
                loading="lazy"
                src={aboutImage}
                alt="Architectural blueprints and pencil on a desk"
              />
              <div className="absolute inset-0 bg-[#415d73]/10" />
              <div className="absolute bottom-6 left-6 right-6 border border-white/70 p-4 text-xs font-bold uppercase tracking-[.14em] text-white">
                Drawing / Design support
              </div>
            </div>
            <div className="flex flex-col justify-between px-5 py-14 sm:px-8 md:px-12 md:py-16">
              <div>
                <p
                  className="canva-text text-xs font-bold uppercase tracking-[.17em] text-[#415d73]"
                  style={{ color: "rgb(65, 93, 115)", fontWeight: 700, fontStyle: "normal", fontSize: 12, letterSpacing: "0.12rem" }}
                >
                  About / Positioning
                </p>
                <h2
                  className="canva-text editorial-serif mt-5 max-w-2xl text-4xl leading-tight tracking-tight sm:text-5xl"
                  style={{ color: "rgb(23, 33, 43)", fontWeight: 600, fontStyle: "normal", fontSize: 24 }}
                >
                  Clear drawing sets, considered visual support, and precise design thinking.
                </h2>
              </div>
              <div className="mt-12 max-w-xl">
                <p
                  className="canva-text text-lg leading-8 text-[#41515c]"
                  style={{ color: "rgb(65, 81, 92)", fontWeight: 400, fontStyle: "normal", fontSize: 18, lineHeight: 1.7 }}
                >
                  Oluwajuwon is a graduate architect focused on architectural drafting, visualisation, design support, and interior design. The work is grounded in translating design intent into clear, usable drawing information.
                </p>
                <div className="mt-10 grid grid-cols-3 border-t border-[#aeb8bd] pt-5 text-xs font-bold uppercase tracking-[.12em] text-[#415d73]">
                  <span>Drafting</span><span>Visualisation</span><span>Interiors</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:px-12 md:py-24">
          <div className="flex flex-col justify-between gap-8 border-b border-[#cbd1d3] pb-8 md:flex-row md:items-end">
            <div>
              <p
                className="canva-text text-xs font-bold uppercase tracking-[.17em] text-[#415d73]"
                style={{ color: "rgb(65, 93, 115)", fontWeight: 700, fontStyle: "normal", fontSize: 12, letterSpacing: "0.12rem" }}
              >
                Portfolio / Selected Work
              </p>
              <h2
                className="canva-text editorial-serif mt-3 text-4xl tracking-tight sm:text-5xl"
                style={{ color: "rgb(23, 33, 43)", fontWeight: 600, fontStyle: "normal", fontSize: 24 }}
              >
                Selected Projects
              </h2>
            </div>
            <p className="text-sm font-medium text-[#65717d]" aria-live="polite">
              {visibleProjects.length} project{visibleProjects.length === 1 ? "" : "s"} shown
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            {filters.map((filter) => (
              <button
                className="filter-button"
                type="button"
                data-filter={filter}
                aria-pressed={activeFilter === filter}
                key={filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
            {visibleProjects.map((project) => {
              const projectIndex = projects.indexOf(project);
              return (
                <article className="project-card" data-category={project.category} key={project.title}>
                  <img className="canva-image project-image" loading="lazy" src={project.image} alt={project.alt} />
                  <div className="flex items-start justify-between gap-4">
                    <span className="project-number">{String(projectIndex + 1).padStart(2, "0")}</span>
                    <span className="project-category max-w-[60%] text-right text-[.68rem] font-bold uppercase tracking-[.1em]">
                      {project.category}
                    </span>
                  </div>
                  <div className="mt-auto pt-12">
                    <h3 className="project-title editorial-serif text-2xl leading-tight">{project.title}</h3>
                    {project.tags.length > 0 && (
                      <p className="project-tags mt-3 text-sm leading-6">{project.tags.join(" · ")}</p>
                    )}
                    <button
                      className="more-info mt-7 inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4"
                      type="button"
                      onClick={(event) => {
                        lastTriggerRef.current = event.currentTarget;
                        setActiveProject(project);
                      }}
                      aria-label={`More information about ${project.title}`}
                    >
                      More info <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="services" className="border-y border-[#cbd1d3] bg-[#263f54] text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[.9fr_1.1fr]">
            <div className="border-b border-white/25 px-5 py-14 sm:px-8 md:border-b-0 md:border-r md:px-12 md:py-20">
              <p
                className="canva-text text-xs font-bold uppercase tracking-[.17em] text-[#b8d0d9]"
                style={{ color: "rgb(184, 208, 217)", fontWeight: 700, fontStyle: "normal", fontSize: 12, letterSpacing: "0.12rem" }}
              >
                Capabilities
              </p>
              <h2
                className="canva-text editorial-serif mt-4 text-5xl tracking-tight"
                style={{ color: "rgb(255, 255, 255)", fontWeight: 600, fontStyle: "normal", fontSize: 24 }}
              >
                My Services
              </h2>
              <p
                className="canva-text mt-8 max-w-sm text-lg leading-8 text-[#dbe5e8]"
                style={{ color: "rgb(219, 229, 232)", fontWeight: 400, fontStyle: "normal", fontSize: 18, lineHeight: 1.6 }}
              >
                Remote Architectural Revit &amp; CAD Drafting
              </p>
            </div>
            <div className="px-5 py-8 sm:px-8 md:px-12 md:py-14">
              <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2" aria-label="Architectural services">
                <li className="service-item py-5">01 — PDF/sketch → Revit model</li>
                <li className="service-item py-5">02 — Revit floor plans</li>
                <li className="service-item py-5">03 — Elevations &amp; sections</li>
                <li className="service-item py-5">04 — Architectural drawing revisions</li>
                <li className="service-item py-5">05 — CAD → Revit conversion</li>
                <li className="service-item py-5">06 — Basic 3D modelling</li>
                <li className="service-item py-5">07 — Drawing-sheet setup</li>
                <li className="service-item py-5">08 — As-built modelling</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="architect-grid border-y border-[#cbd1d3] bg-[#dbe5e8]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[.9fr_1.1fr]">
            <div className="px-5 py-14 sm:px-8 md:px-12 md:py-20">
              <p
                className="canva-text text-xs font-bold uppercase tracking-[.17em] text-[#415d73]"
                style={{ color: "rgb(65, 93, 115)", fontWeight: 700, fontStyle: "normal", fontSize: 12, letterSpacing: "0.12rem" }}
              >
                Start a conversation
              </p>
              <h2
                className="canva-text editorial-serif mt-4 text-5xl leading-[.98] tracking-tight sm:text-6xl"
                style={{ color: "rgb(23, 33, 43)", fontWeight: 600, fontStyle: "normal", fontSize: 24 }}
              >
                Available for work
              </h2>
              <p
                className="canva-text mt-8 max-w-md text-lg leading-8 text-[#41515c]"
                style={{ color: "rgb(65, 81, 92)", fontWeight: 400, fontStyle: "normal", fontSize: 18, lineHeight: 1.6 }}
              >
                Have a drawing, model, or design-support requirement? Send a short note to begin the conversation.
              </p>
              <a
                className="canva-text mt-8 border-l-2 border-[#415d73] pl-4 text-sm leading-6 text-[#41515c]"
                style={{ color: "rgb(65, 81, 92)", fontWeight: 400, fontStyle: "normal", fontSize: 14, lineHeight: 1.5 }}
                href={whatsappNumber ? `https://wa.me/${whatsappNumber}` : undefined}
                target={whatsappNumber ? "_blank" : undefined}
                rel={whatsappNumber ? "noreferrer" : undefined}
              >
                WhatsApp {whatsappNumber ? "↗" : "(number not configured)"}
              </a>
            </div>

            <div className="border-t border-[#aeb8bd] bg-[#f3f2ee] px-5 py-12 sm:px-8 md:border-l md:border-t-0 md:px-12 md:py-20">
              <form onSubmit={handleContactSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="canva-text mb-2 block text-sm font-bold" htmlFor="contact-name" style={{ color: "rgb(23, 33, 43)", fontWeight: 700, fontStyle: "normal", fontSize: 14 }}>Name</label>
                    <input id="contact-name" name="name" type="text" autoComplete="name" required className="w-full border-b border-[#8b989e] bg-transparent px-0 py-3" />
                  </div>
                  <div>
                    <label className="canva-text mb-2 block text-sm font-bold" htmlFor="contact-email" style={{ color: "rgb(23, 33, 43)", fontWeight: 700, fontStyle: "normal", fontSize: 14 }}>Email</label>
                    <input id="contact-email" name="email" type="email" autoComplete="email" required className="w-full border-b border-[#8b989e] bg-transparent px-0 py-3" />
                  </div>
                  <div>
                    <label className="canva-text mb-2 block text-sm font-bold" htmlFor="contact-message" style={{ color: "rgb(23, 33, 43)", fontWeight: 700, fontStyle: "normal", fontSize: 14 }}>Message</label>
                    <textarea id="contact-message" name="message" rows={5} required className="w-full border border-[#8b989e] bg-transparent p-3" />
                  </div>
                  <button id="submit-button" disabled={isSubmitting || !formSubmitEmail} className="canva-button bg-[#415d73] px-5 py-3 text-sm font-bold text-white disabled:opacity-60" type="submit" style={{ background: "rgb(65, 93, 115)", color: "rgb(255, 255, 255)", fontWeight: 700, fontStyle: "normal", fontSize: 16 }}>
                    {isSubmitting ? "Sending…" : "Send enquiry"}
                  </button>
                  <p className="min-h-6 text-sm font-medium text-[#41515c]" aria-live="polite">{formStatus || (!formSubmitEmail ? "Form is awaiting recipient email configuration." : "")}</p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#17212b] text-[#e9e9e4]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between md:px-12">
          <p
            className="canva-text text-sm font-bold uppercase tracking-[.14em]"
            style={{ color: "rgb(233, 233, 228)", fontWeight: 700, fontStyle: "normal", fontSize: 13, letterSpacing: "0.08rem" }}
          >
            Oluwajuwon Adewuyi — Graduate Architect
          </p>
          <a href="#top" className="text-sm font-bold text-[#b8d0d9]">Back to top ↑</a>
        </div>
      </footer>

      {activeProject && (
        <div
          className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveProject(null);
          }}
        >
          <section
            className="modal-panel relative w-full max-w-xl overflow-auto bg-[#f3f2ee] p-7 shadow-2xl sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-category"
          >
            <button
              ref={modalCloseRef}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center border border-[#415d73] text-[#415d73]"
              type="button"
              onClick={() => setActiveProject(null)}
              aria-label="Close project details"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#415d73]">Selected project</p>
            <h2 id="modal-title" className="editorial-serif mt-5 max-w-md text-4xl leading-tight">{activeProject.title}</h2>
            <p id="modal-category" className="mt-5 text-sm font-bold uppercase tracking-[.12em] text-[#65717d]">{activeProject.category}</p>
            <div className="my-7 rule" />
            <p className="text-lg leading-8 text-[#41515c]">
              {activeProject.tags.length ? activeProject.tags.join(" · ") : "Project details available on request."}
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
