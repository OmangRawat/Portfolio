document.addEventListener("DOMContentLoaded", function () {
    // anime.js v4 exposes its API on the global `anime` object (UMD build).
    const { animate, createTimeline, stagger, utils, scrambleText, onScroll } = anime;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    /* ---------------------------------------------------------------
     * Header — entrance animation + condensed state on scroll
     * ------------------------------------------------------------- */
    const header = document.querySelector(".site-header");
    if (header) {
        if (!reduceMotion) {
            animate(header, {
                y: [-90, 0],
                opacity: [0, 1],
                duration: 800,
                ease: "outExpo"
            });
            animate(".site-nav a", {
                opacity: [0, 1],
                y: [-12, 0],
                delay: stagger(55, { start: 250 }),
                duration: 600,
                ease: "outCubic"
            });
        }
        const condenseHeader = () =>
            header.classList.toggle("scrolled", window.scrollY > 24);
        window.addEventListener("scroll", condenseHeader, { passive: true });
        condenseHeader();
    }

    /* ---------------------------------------------------------------
     * Hero title — split into letters and reveal with a staggered pop
     * ------------------------------------------------------------- */
    const heroTitle = document.querySelector("#hero-title");
    if (heroTitle && !reduceMotion) {
        // Wrap each non-space character in a .letter span.
        heroTitle.innerHTML = heroTitle.textContent.replace(
            /\S/g,
            "<span class='letter'>$&</span>"
        );

        createTimeline({ defaults: { ease: "outExpo" } }).add(
            "#hero-title .letter",
            {
                opacity: [0, 1],
                y: [40, 0],
                rotate: [12, 0],
                duration: 900,
                delay: stagger(35, { start: 350 })
            }
        );
    } else if (heroTitle) {
        heroTitle.style.opacity = 1;
    }

    /* ---------------------------------------------------------------
     * Rotating hero subtitle — scramble between specialties (v4)
     * ------------------------------------------------------------- */
    const scrambleTarget = document.querySelector("#scramble-text");
    if (scrambleTarget) {
        const phrases = [
            "scalable full-stack systems",
            "high-performance PDF pipelines",
            "AI-enabled content workflows",
            "developer-friendly tooling"
        ];
        scrambleTarget.textContent = phrases[0];

        if (!reduceMotion) {
            let idx = 0;
            const cycle = () => {
                idx = (idx + 1) % phrases.length;
                animate("#scramble-text", {
                    innerHTML: scrambleText({ text: phrases[idx], duration: 900 })
                });
            };
            // Start cycling once the hero entrance has settled.
            setTimeout(() => setInterval(cycle, 2800), 2600);
        }
    }

    /* ---------------------------------------------------------------
     * Hero supporting content
     * ------------------------------------------------------------- */
    if (!reduceMotion) {
        animate(".hero-copy .eyebrow", {
            opacity: [0, 1],
            y: [20, 0],
            duration: 650,
            delay: 700,
            ease: "outCubic"
        });

        animate(".hero-rotator", {
            opacity: [0, 1],
            y: [20, 0],
            duration: 750,
            delay: 900,
            ease: "outExpo"
        });

        animate(".hero-text", {
            opacity: [0, 1],
            y: [30, 0],
            duration: 850,
            delay: 1050,
            ease: "outExpo"
        });

        animate(".hero-actions .button", {
            opacity: [0, 1],
            scale: [0.95, 1],
            delay: stagger(80, { start: 1250 }),
            duration: 850,
            ease: "outExpo"
        });

        animate(".hero-panel .panel-card", {
            opacity: [0, 1],
            y: [30, 0],
            delay: stagger(100, { start: 1150 }),
            duration: 850,
            ease: "outCubic"
        });

        // Brand mark entrance
        animate(".brand-mark", {
            scale: [0, 1],
            rotate: [-45, 0],
            duration: 900,
            ease: "outBack"
        });

        /* -----------------------------------------------------------
         * Ambient glows (looping)
         * --------------------------------------------------------- */
        animate(".glow-large", {
            x: [0, 18, 0],
            y: [0, -16, 0],
            opacity: [0.28, 0.42, 0.28],
            duration: 7600,
            loop: true,
            ease: "inOutSine"
        });

        animate(".glow-medium", {
            x: [0, -18, 0],
            y: [0, 20, 0],
            opacity: [0.24, 0.4, 0.24],
            duration: 6800,
            loop: true,
            ease: "inOutSine"
        });

        animate(".glow-small", {
            scale: [0.92, 1.12, 0.92],
            opacity: [0.12, 0.24, 0.12],
            duration: 5600,
            loop: true,
            ease: "inOutQuad"
        });

        // Scroll-synced parallax: hero background drifts + fades as you scroll away.
        if (onScroll) {
            animate(".hero-background", {
                y: [0, 160],
                opacity: [1, 0.25],
                ease: "linear",
                autoplay: onScroll({
                    target: ".hero-section",
                    enter: "top top",
                    leave: "bottom top",
                    sync: true
                })
            });
        }
    }

    /* ---------------------------------------------------------------
     * Floating particle field in the hero background
     * ------------------------------------------------------------- */
    const particleHost = document.querySelector(".particles");
    if (particleHost && !reduceMotion) {
        const count = window.innerWidth < 680 ? 18 : 36;
        const frag = document.createDocumentFragment();
        const dots = [];

        for (let i = 0; i < count; i++) {
            const dot = document.createElement("span");
            dot.className = "particle";
            const size = utils.random(2, 6);
            dot.style.width = size + "px";
            dot.style.height = size + "px";
            dot.style.left = utils.random(0, 100) + "%";
            dot.style.top = utils.random(0, 100) + "%";
            frag.appendChild(dot);
            dots.push(dot);
        }
        particleHost.appendChild(frag);

        animate(dots, {
            x: () => utils.random(-50, 50),
            y: () => utils.random(-70, 70),
            scale: () => utils.random(8, 16) / 10,
            opacity: [0.15, () => utils.random(35, 60) / 100],
            duration: () => utils.random(4000, 8000),
            delay: stagger(100),
            alternate: true,
            loop: true,
            ease: "inOutSine"
        });
    }

    /* ---------------------------------------------------------------
     * Cursor-following glow (desktop / fine pointers only)
     * ------------------------------------------------------------- */
    const cursorGlow = document.querySelector(".cursor-glow");
    if (cursorGlow && !reduceMotion && finePointer) {
        let glowX = window.innerWidth / 2;
        let glowY = window.innerHeight / 2;
        let mouseX = glowX;
        let mouseY = glowY;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.style.opacity = 1;
        });
        document.addEventListener("mouseleave", () => {
            cursorGlow.style.opacity = 0;
        });

        // Smooth trailing motion via requestAnimationFrame.
        (function trail() {
            glowX += (mouseX - glowX) * 0.12;
            glowY += (mouseY - glowY) * 0.12;
            cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
            requestAnimationFrame(trail);
        })();
    }

    /* ---------------------------------------------------------------
     * Magnetic buttons + 3D tilt cards (fine pointers only)
     * ------------------------------------------------------------- */
    if (!reduceMotion && finePointer) {
        document.querySelectorAll(".button").forEach((btn) => {
            btn.addEventListener("mousemove", (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                animate(btn, {
                    x: x * 0.3,
                    y: y * 0.4,
                    duration: 400,
                    ease: "outQuad"
                });
            });
            btn.addEventListener("mouseleave", () => {
                animate(btn, {
                    x: 0,
                    y: 0,
                    duration: 600,
                    ease: "outElastic(1, 0.5)"
                });
            });
        });

        const MAX_TILT = 8;
        document.querySelectorAll(".card, .skill-card, .panel-card").forEach((card) => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width - 0.5;
                const py = (e.clientY - rect.top) / rect.height - 0.5;
                card.classList.add("tilt-active");
                card.style.transform =
                    `perspective(900px) rotateX(${-py * MAX_TILT}deg) ` +
                    `rotateY(${px * MAX_TILT}deg) translateZ(6px)`;
            });
            card.addEventListener("mouseleave", () => {
                card.classList.remove("tilt-active");
                card.style.transform = "";
            });
        });
    }

    /* ---------------------------------------------------------------
     * Scroll progress bar
     * ------------------------------------------------------------- */
    const progressBar = document.querySelector(".scroll-progress");
    if (progressBar) {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = pct + "%";
        };
        window.addEventListener("scroll", updateProgress, { passive: true });
        updateProgress();
    }

    /* ---------------------------------------------------------------
     * Scroll-spy: highlight the nav link of the section in view
     * ------------------------------------------------------------- */
    const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (sections.length) {
        const spy = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    navLinks.forEach((l) => l.classList.remove("active"));
                    const active = navLinks.find(
                        (l) => l.getAttribute("href") === "#" + entry.target.id
                    );
                    if (active) active.classList.add("active");
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );
        sections.forEach((s) => spy.observe(s));
    }

    /* ---------------------------------------------------------------
     * Vertical scroll rail — shows how far through the page you are,
     * with a dot per section that lights up as you reach it.
     * ------------------------------------------------------------- */
    if (sections.length) {
        const rail = document.createElement("div");
        rail.className = "scroll-rail";
        rail.setAttribute("aria-hidden", "true");

        const track = document.createElement("div");
        track.className = "rail-track";
        const fill = document.createElement("div");
        fill.className = "rail-fill";
        track.appendChild(fill);

        const railDots = sections.map((section, i) => {
            const dot = document.createElement("button");
            dot.className = "rail-dot";
            dot.type = "button";
            dot.setAttribute("data-label", navLinks[i].textContent.trim());
            dot.addEventListener("click", () => {
                section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
            });
            track.appendChild(dot);
            return { el: dot, section, startPct: 0 };
        });

        rail.appendChild(track);
        const percent = document.createElement("div");
        percent.className = "rail-percent";
        percent.textContent = "0%";
        rail.appendChild(percent);
        document.body.appendChild(rail);

        const positionDots = () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            railDots.forEach((d) => {
                const top = d.section.getBoundingClientRect().top + window.scrollY;
                d.startPct = docHeight > 0 ? Math.min(Math.max(top / docHeight, 0), 1) : 0;
                d.el.style.top = d.startPct * 100 + "%";
            });
        };

        const updateRail = () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;
            fill.style.height = pct * 100 + "%";
            percent.textContent = Math.round(pct * 100) + "%";

            let activeIdx = 0;
            railDots.forEach((d, i) => {
                const reached = pct >= d.startPct - 0.001;
                d.el.classList.toggle("reached", reached);
                if (reached) activeIdx = i;
            });
            railDots.forEach((d, i) => d.el.classList.toggle("active", i === activeIdx));
        };

        positionDots();
        updateRail();
        window.addEventListener("scroll", updateRail, { passive: true });
        window.addEventListener("resize", () => {
            positionDots();
            updateRail();
        });
        // Recompute once images/fonts settle and section offsets are final.
        window.addEventListener("load", () => {
            positionDots();
            updateRail();
        });
    }

    /* ---------------------------------------------------------------
     * Experience timeline — draw the connecting line as you scroll
     * ------------------------------------------------------------- */
    const timelineEl = document.querySelector(".timeline");
    if (timelineEl && !reduceMotion && onScroll) {
        animate(".timeline-line", {
            scaleY: [0, 1],
            ease: "linear",
            autoplay: onScroll({
                target: timelineEl,
                enter: "top bottom-=80",
                leave: "bottom center",
                sync: 0.5
            })
        });
    }

    /* ---------------------------------------------------------------
     * Scroll reveals
     *  - Grid blocks cascade their cards in with a stagger.
     *  - The experience timeline animates as a journey.
     *  - Standalone .reveal elements fade up individually.
     * ------------------------------------------------------------- */
    const staggerGroups = Array.from(
        document.querySelectorAll(".grid-list, .skills-grid, .contact-grid")
    );
    const groupedChildren = new Set();
    staggerGroups.forEach((group) => {
        group.querySelectorAll(".reveal").forEach((el) => groupedChildren.add(el));
    });

    if (reduceMotion) {
        document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    } else {
        // Standalone reveals (section headers, hero, copy blocks, footer).
        const standaloneReveals = Array.from(
            document.querySelectorAll(".reveal")
        ).filter((el) => !groupedChildren.has(el));

        const revealObserver = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("visible");
                    animate(entry.target, {
                        opacity: [0, 1],
                        y: [40, 0],
                        duration: 750,
                        ease: "outCubic"
                    });
                    obs.unobserve(entry.target);
                });
            },
            { threshold: 0.18 }
        );
        standaloneReveals.forEach((el) => revealObserver.observe(el));

        // Grid blocks: animate their cards together, staggered.
        const groupObserver = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const cards = entry.target.querySelectorAll(".reveal");
                    cards.forEach((c) => c.classList.add("visible"));

                    if (entry.target.classList.contains("timeline")) {
                        // Journey: cards slide off the spine, markers pop in.
                        animate(cards, {
                            opacity: [0, 1],
                            x: [60, 0],
                            duration: 750,
                            delay: stagger(150),
                            ease: "outCubic"
                        });
                        animate(entry.target.querySelectorAll(".timeline-marker"), {
                            scale: [0, 1],
                            duration: 500,
                            delay: stagger(150, { start: 200 }),
                            ease: "outBack"
                        });
                    } else {
                        animate(cards, {
                            opacity: [0, 1],
                            y: [50, 0],
                            scale: [0.96, 1],
                            duration: 700,
                            delay: stagger(90),
                            ease: "outCubic"
                        });
                    }
                    obs.unobserve(entry.target);
                });
            },
            { threshold: 0.15 }
        );
        staggerGroups.forEach((g) => groupObserver.observe(g));
    }
});
