import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Each motion layer owns distinct transforms: layout/scroll → entrance →
// floating/parallax → the button's CSS hover. Nothing competes for a transform.
export default function usePortfolioMotion(root) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    let disposed = false;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(
            ".site-header",
            {
              opacity: 0.2,
              y: -8,
              duration: 0.65,
              clearProps: "opacity,transform",
            },
            0,
          )
          .from(".hero-topline", { opacity: 0.3, y: 10, duration: 0.65 }, 0.12)
          .from(
            ".title-line > span",
            {
              yPercent: 90,
              opacity: 0.45,
              duration: 1.1,
              stagger: 0.12,
              clearProps: "opacity,transform",
            },
            0.18,
          )
          .from(
            ".hero-card-entry",
            {
              opacity: 0,
              y: 42,
              z: -65,
              rotationX: 7,
              rotationY: -5,
              duration: 1.15,
              stagger: 0.12,
              clearProps: "opacity,transform",
            },
            0.42,
          )
          .from(
            ".hero-intro, .scroll-cue, .hero-side-note, .card-annotation",
            {
              opacity: 0.25,
              y: 12,
              duration: 0.8,
              stagger: 0.06,
              clearProps: "opacity,transform",
            },
            0.55,
          );

        gsap.utils.toArray(".reveal").forEach((element) => {
          gsap.from(element, {
            opacity: 0.15,
            y: 26,
            duration: 0.85,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });

        gsap.utils.toArray(".project").forEach((row, index) => {
          const content = row.querySelectorAll(
            ".project-number, .project-category, h3, .project-tagline, .project-description, .project-button, .project-focus",
          );
          const timeline = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          });
          timeline
            .from(content, {
              opacity: 0.2,
              y: 18,
              duration: 0.7,
              stagger: 0.055,
              clearProps: "opacity,transform",
            })
            .from(
              row.querySelector(".project-preview"),
              {
                opacity: 0.3,
                y: 28,
                duration: 0.9,
                clearProps: "opacity,transform",
              },
              0.1,
            );

          gsap.fromTo(
            row.querySelector(".project-window"),
            { y: 16, rotation: index % 2 ? 1.4 : -1.4, scale: 0.975 },
            {
              y: -14,
              rotation: index % 2 ? -0.4 : 0.4,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row.querySelector(".project-preview"),
                start: "top bottom",
                end: "bottom top",
                scrub: 0.9,
              },
            },
          );
        });

        gsap.utils.toArray(".type-line > span").forEach((line, index) => {
          gsap.from(line, {
            yPercent: 65,
            opacity: 0.35,
            duration: 0.9,
            delay: (index % 3) * 0.055,
            ease: "power3.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: line.parentElement,
              start: "top 94%",
              once: true,
            },
          });
        });

        gsap.from(".contact-bottom > *, .contact footer", {
          opacity: 0.2,
          y: 24,
          duration: 0.85,
          stagger: 0.1,
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: ".contact-bottom",
            start: "top 94%",
            once: true,
          },
        });
        gsap.from(".contact-star", {
          rotation: -18,
          scale: 0.9,
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: { trigger: ".contact", start: "top 82%", once: true },
        });
      }, root);
      return () => ctx.revert();
    });

    media.add(
      "(min-width: 901px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const cleanups = [];
        const ctx = gsap.context(() => {
          const hero = root.current.querySelector(".hero");
          const slots = gsap.utils.toArray(".hero-card-slot");
          let inView = true;
          const floating = slots.map((slot, index) => {
            const layer = slot.querySelector(".hero-card-motion");
            gsap.set(layer, { transformPerspective: 900, force3D: true });
            const float = gsap.to(layer, {
              y: -[5, 7, 4][index],
              duration: 3.6 + index * 0.45,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              paused: true,
            });
            const moveX = gsap.quickTo(layer, "x", {
              duration: 0.7,
              ease: "power3.out",
            });
            const tiltX = gsap.quickTo(layer, "rotationX", {
              duration: 0.7,
              ease: "power3.out",
            });
            const tiltY = gsap.quickTo(layer, "rotationY", {
              duration: 0.7,
              ease: "power3.out",
            });
            const reset = () => {
              moveX(0);
              tiltX(0);
              tiltY(0);
            };
            const sync = () => {
              const engaged = slot.matches(":hover, :focus-within");
              if (inView && !document.hidden && !engaged) float.play();
              else float.pause();
              if (engaged || !inView || document.hidden) reset();
            };
            ["pointerenter", "pointerleave", "focusin", "focusout"].forEach(
              (event) => {
                slot.addEventListener(event, sync);
                cleanups.push(() => slot.removeEventListener(event, sync));
              },
            );
            document.addEventListener("visibilitychange", sync);
            cleanups.push(() =>
              document.removeEventListener("visibilitychange", sync),
            );
            gsap.to(slot, {
              y: [-26, -10, 20][index],
              x: [9, -10, 5][index],
              rotation: [-2, 2, 2.5][index],
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 1.2,
              },
            });
            return {
              slot,
              moveX,
              tiltX,
              tiltY,
              reset,
              sync,
              weight: 0.7 + index * 0.18,
            };
          });

          const onMove = (event) => {
            if (event.pointerType !== "mouse" || !inView || document.hidden)
              return;
            const bounds = hero.getBoundingClientRect();
            const x = gsap.utils.clamp(
              -0.5,
              0.5,
              (event.clientX - bounds.left) / bounds.width - 0.5,
            );
            const y = gsap.utils.clamp(
              -0.5,
              0.5,
              (event.clientY - bounds.top) / bounds.height - 0.5,
            );
            floating.forEach((item) => {
              if (item.slot.matches(":hover, :focus-within")) {
                item.reset();
                return;
              }
              item.moveX(x * 12 * item.weight);
              item.tiltX(-y * 5 * item.weight);
              item.tiltY(x * 5 * item.weight);
            });
          };
          const onLeave = () => floating.forEach((item) => item.reset());
          hero.addEventListener("pointermove", onMove, { passive: true });
          hero.addEventListener("pointerleave", onLeave);
          cleanups.push(() => hero.removeEventListener("pointermove", onMove));
          cleanups.push(() =>
            hero.removeEventListener("pointerleave", onLeave),
          );
          const observer = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            floating.forEach((item) => item.sync());
          });
          observer.observe(hero);
          cleanups.push(() => observer.disconnect());

          gsap.to(".hero-grid", {
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1.4,
            },
          });
          gsap.to(".orbit-ring-2", {
            rotation: 70,
            ease: "none",
            scrollTrigger: {
              trigger: ".about",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }, root);
        return () => {
          cleanups.forEach((cleanup) => cleanup());
          ctx.revert();
        };
      },
    );

    document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });
    return () => {
      disposed = true;
      media.revert();
    };
  }, [root]);
}
