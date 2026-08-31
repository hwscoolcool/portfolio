import { useRef, useState } from "react";

const assetBase = import.meta.env.BASE_URL;

const projectImages = [
  `${assetBase}assets/projects/white-facade.png`,
  `${assetBase}assets/projects/monolith-brand.png`,
  `${assetBase}assets/projects/soft-form.png`,
  `${assetBase}assets/projects/line-light.png`,
  `${assetBase}assets/projects/green-fold.png`,
  `${assetBase}assets/projects/shadow-courtyard.png`,
];

const trailImages = [
  `${assetBase}assets/trail/huaban-6636160457.webp`,
  `${assetBase}assets/trail/huaban-6636160467.webp`,
  `${assetBase}assets/trail/huaban-6636160471.webp`,
  `${assetBase}assets/trail/huaban-6636160480.webp`,
  `${assetBase}assets/trail/huaban-6636160481.webp`,
  `${assetBase}assets/trail/huaban-6636160482.webp`,
  `${assetBase}assets/trail/huaban-6636160488.webp`,
  `${assetBase}assets/trail/huaban-6636160500.webp`,
];

const seedTrail = [
  { src: trailImages[0], left: "5.4%", top: "22.4%", width: "8.8%", opacity: 1, aspect: "1" },
  { src: trailImages[1], left: "16.3%", top: "39%", width: "8%", opacity: 0.82, aspect: "1" },
  { src: trailImages[2], left: "26.1%", top: "51.7%", width: "5.1%", opacity: 0.7, aspect: "1" },
  { src: trailImages[3], left: "33%", top: "63%", width: "3.8%", opacity: 0.58, aspect: "1" },
  { src: trailImages[4], left: "38.1%", top: "66.6%", width: "2.6%", opacity: 0.48, aspect: "1" },
  { src: trailImages[5], left: "42%", top: "71.2%", width: "1.8%", opacity: 0.31, aspect: "1" },
  { src: trailImages[6], left: "45.1%", top: "74.3%", width: "1.2%", opacity: 0.17, aspect: "1" },
];

const projects = [
  { title: "Fold", type: "Brand identity,\nArt direction", src: projectImages[4], tone: "dark" },
  { title: "Linea", type: "Product design,\nCreative direction", src: projectImages[3], tone: "dark" },
  { title: "North Hall", type: "Brand strategy,\nDigital experience", src: projectImages[0], tone: "dark", wide: true },
  { title: "Aurel", type: "Brand identity,\nPackaging", src: projectImages[1], tone: "light" },
  { title: "Courtyard", type: "Spatial identity,\nArt direction", src: projectImages[5], tone: "light" },
];

export function App() {
  const heroRef = useRef(null);
  const lastPoint = useRef({ x: 0, y: 0, time: 0 });
  const sequence = useRef(0);
  const [trail, setTrail] = useState([]);
  const [hasMoved, setHasMoved] = useState(false);

  function handlePointerMove(event) {
    if (event.pointerType === "touch" || !heroRef.current) return;

    const bounds = heroRef.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const now = performance.now();
    const distance = Math.hypot(x - lastPoint.current.x, y - lastPoint.current.y);

    if (distance < 56 || now - lastPoint.current.time < 72) return;

    setHasMoved(true);
    lastPoint.current = { x, y, time: now };
    const index = sequence.current++ % trailImages.length;
    const id = `${Date.now()}-${sequence.current}`;
    const width = 92 + (index % 4) * 22;
    const nextItem = { id, x, y, width, src: trailImages[index] };

    setTrail((items) => [...items.slice(-7), nextItem]);
    window.setTimeout(() => {
      setTrail((items) => items.filter((item) => item.id !== id));
    }, 1150);
  }

  return (
    <main className="site-shell">
      <section
        className="hero"
        id="top"
        ref={heroRef}
        onPointerMove={handlePointerMove}
        aria-labelledby="hero-title"
      >
        <header className="site-header">
          <a className="studio-mark" href="#top" aria-label="Back to top">VN—STUDIO</a>
          <nav className="main-nav" aria-label="Primary navigation">
            <a href="#works">Works</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className={`seed-trail ${hasMoved ? "seed-trail--hidden" : ""}`} aria-hidden="true">
          {seedTrail.map((item, index) => (
            <img
              key={`${item.src}-${index}`}
              src={item.src}
              alt=""
              style={{ left: item.left, top: item.top, width: item.width, opacity: item.opacity, aspectRatio: item.aspect }}
            />
          ))}
        </div>

        <div className="live-trail" aria-hidden="true">
          {trail.map((item) => (
            <img
              key={item.id}
              className="trail-image"
              src={item.src}
              alt=""
              style={{ left: item.x, top: item.y, width: item.width }}
            />
          ))}
        </div>

        <p className="hero-statement" id="about">
          Independent designer creating<br />
          thoughtful brands, intuitive products,<br />
          and distinctive digital experiences.
        </p>
        <h1 id="hero-title">Vinson</h1>
      </section>

      <section className="project-wall" id="works" aria-label="Selected projects">
        {projects.map((project) => (
          <article
            className={`project project--${project.tone}${project.wide ? " project--wide" : ""}`}
            key={project.title}
          >
            <img src={project.src} alt={`${project.title} — ${project.type}`} loading="lazy" />
            <div className="project-meta">
              <h2>{project.title}</h2>
              <p>{project.type}</p>
            </div>
          </article>
        ))}
      </section>

      <footer className="footer" id="contact">
        <p>Available for selected projects</p>
        <a href="mailto:hello@vinson.design">hello@vinson.design</a>
        <p className="footer-note">Vinson — Independent Designer</p>
      </footer>
    </main>
  );
}
