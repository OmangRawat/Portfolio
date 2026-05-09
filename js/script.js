document.addEventListener("DOMContentLoaded", function () {
    const heroTitle = document.querySelector("#hero-title");
    if (heroTitle) {
        anime({
            targets: "#hero-title",
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 900,
            easing: "easeOutExpo",
            delay: 450
        });
    }

    anime({
        targets: ".hero-copy .eyebrow",
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 650,
        delay: 800,
        easing: "easeOutCubic"
    });

    anime({
        targets: ".hero-text",
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 850,
        delay: 1100,
        easing: "easeOutExpo"
    });

    anime({
        targets: ".hero-actions .button",
        opacity: [0, 1],
        scale: [0.95, 1],
        delay: anime.stagger(80, { start: 1400 }),
        duration: 850,
        easing: "easeOutExpo"
    });

    anime({
        targets: ".hero-panel .panel-card",
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100, { start: 1300 }),
        duration: 850,
        easing: "easeOutCubic"
    });

    anime({
        targets: ".glow-large",
        translateX: [0, 18, 0],
        translateY: [0, -16, 0],
        opacity: [0.28, 0.42, 0.28],
        duration: 7600,
        loop: true,
        easing: "easeInOutSine"
    });

    anime({
        targets: ".glow-medium",
        translateX: [0, -18, 0],
        translateY: [0, 20, 0],
        opacity: [0.24, 0.4, 0.24],
        duration: 6800,
        loop: true,
        easing: "easeInOutSine"
    });

    anime({
        targets: ".glow-small",
        scale: [0.92, 1.12, 0.92],
        opacity: [0.12, 0.24, 0.12],
        duration: 5600,
        loop: true,
        easing: "easeInOutQuad"
    });

    anime({
        targets: ".button-primary",
        scale: [1, 1.03, 1],
        duration: 2200,
        delay: 1800,
        loop: true,
        easing: "easeInOutSine"
    });

    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [40, 0],
                    duration: 750,
                    easing: "easeOutCubic"
                });
                obs.unobserve(entry.target);
            });
        },
        {
            threshold: 0.18
        }
    );
    revealElements.forEach((el) => observer.observe(el));
});