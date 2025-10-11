import React, { useRef, useEffect } from "react";
import { useState } from "react";
import styles from "./App.module.css";

const menuItems = [
  {
    label: "hypercube",
    description: "merge cubes in 3D space",
    year: 2025,
    status: "active",
    showcase: { type: "image", source: "/images/hypercube.png" },
    links: [
      { label: "play", url: "https://montab.es/icecuber" },
      { label: "code", url: "https://github.com/lousmontabes/icecuber" },
    ],
    tech: ["Three.js", "React", "JavaScript", "WebGL"],
  },
  {
    label: "nyam",
    description: "an AI-powered nutrients tracker",
    year: 2024,
    status: "active",
    showcase: { type: "image", source: "/images/nyam.gif" },
    links: [
      { label: "open", url: "https://nyam.app" },
      { label: "code", url: "https://github.com/lousmontabes/foodie" },
    ],
    tech: ["React", "JavaScript", "OpenAI API", "Firebase"],
  },
  {
    label: "yizi",
    description: "a flashcards app for learning Chinese",
    year: 2021,
    status: "archived",
    showcase: { type: "image", source: "/images/yizi.png" },
    links: [{ label: "code", url: "https://github.com/lousmontabes/yizi" }],
    tech: ["React Native", "JavaScript", "Expo"],
  },
  {
    label: "Ludo;UB",
    description: "website for the board game club Ludo;UB",
    year: 2018,
    status: "archived",
    showcase: { type: "image", source: "/images/ludoub.png" },
    links: [
      { label: "open", url: "https://montab.es/ludo-ub" },
      { label: "code", url: "https://github.com/lousmontabes/ludo-ub" },
    ],
    tech: ["Plain HTML / CSS", "JavaScript", "jQuery", "AJAX", "WordPress"],
  },
  {
    label: "filee.es",
    description: "an experimentation with file management & encryption app",
    year: 2018,
    status: "archived",
    showcase: { type: "image", source: "/images/fileees.png" },
    links: [{ label: "code", url: "https://github.com/lousmontabes/fileees" }],
    tech: ["PHP", "CryptoJS", "jQuery", "MySQL"],
  },
  {
    label: "Boats & Cards",
    description:
      "a 1v1 real-time multiplayer game for android, set on the ocean, with boats. And cards.",
    year: 2017,
    status: "archived",
    showcase: { type: "image", source: "/images/b-and-c.png" },
    links: [
      {
        label: "code",
        url: "https://github.com/lousmontabes/boats-and-cards",
      },
    ],
    tech: ["Java", "Android SDK", "Firebase", "MySQL"],
  },
  {
    label: "Codechat",
    description: "a chat app for developers",
    year: 2015,
    status: "archived",
    showcase: { type: "image", source: "/images/codechat.png" },
    links: [{ label: "code", url: "https://github.com/lousmontabes/codechat" }],
    tech: ["Plain HTML / CSS", "JavaScript", "MySQL"],
  },
];

const linkColors: { [key: string]: string } = {
  open: "var(--description-color)",
  code: "var(--link-color)",
  play: "var(--accent)",
};

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const [userScrollOverride, setUserScrollOverride] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        setUserScrollOverride(false);
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % menuItems.length);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        setUserScrollOverride(false);
        e.preventDefault();
        setCurrentIndex(
          (prev) => (prev - 1 + menuItems.length) % menuItems.length
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  useEffect(() => {
    setCurrentProjectIndex(0);
    scrollToMenuItem();
    !userScrollOverride && scrollToCurrentProjectShowcase();
  }, [currentIndex]);

  const scrollToCurrentProjectShowcase = () => {
    const container = document.querySelector(`.${styles.content}`);
    const showcases = container?.querySelectorAll(`.${styles.showcase}`);
    const target = showcases?.[currentIndex] as HTMLElement;
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 200,
        behavior: "instant", // to fix: changed from "smooth" to "instant" to avoid re-triggering scroll event
      });
    }
  };

  const scrollToMenuItem = () => {
    const optionsMenu = document.querySelector("#optionsMenu");
    const menuItem = optionsMenu?.querySelectorAll(".menuItemContainer")[
      currentIndex % menuItems.length
    ] as HTMLElement;

    console.log(currentIndex, menuItems.length);
    const isLastItem = currentIndex === menuItems.length - 1;
    const optionsWrapper = document.querySelector(`.${styles.optionsWrapper}`);

    if (optionsWrapper && isLastItem) {
      optionsWrapper.classList.add(styles.noRightFade);
    }

    if (menuItem && optionsMenu) {
      const gradientOffset = 32;
      const menuRect = optionsMenu.getBoundingClientRect();
      const itemRect = menuItem.getBoundingClientRect();

      if (
        itemRect.left < menuRect.left + gradientOffset ||
        itemRect.right > menuRect.right - gradientOffset
      ) {
        const itemLeft = menuItem.offsetLeft;
        if (itemRect.left < menuRect.left + gradientOffset) {
          const targetScroll = itemLeft - gradientOffset;
          optionsMenu.scrollTo({
            left: targetScroll,
            behavior: "smooth",
          });
        } else if (itemRect.right > menuRect.right - gradientOffset) {
          const itemRight = itemLeft + menuItem.offsetWidth;
          const targetScroll =
            itemRight - menuRect.width + (!isLastItem ? gradientOffset : 0);
          optionsMenu.scrollTo({
            left: targetScroll,
            behavior: "smooth",
          });
        }
      }
    }
  };

  useEffect(() => {
    const optionsMenu = document.getElementById("optionsMenu");
    const optionsWrapper = document.querySelector(`.${styles.optionsWrapper}`);

    function updateFade() {
      if (optionsMenu && optionsWrapper) {
        const isScrolledToRight =
          Math.abs(
            optionsMenu.scrollLeft +
              optionsMenu.clientWidth -
              optionsMenu.scrollWidth
          ) === 0;

        console.log(currentIndex, menuItems.length, isScrolledToRight);
        if (currentIndex !== menuItems.length - 1 && !isScrolledToRight) {
          optionsWrapper.classList.remove(styles.noRightFade);
        } else if (isScrolledToRight) {
          optionsWrapper.classList.add(styles.noRightFade);
        }
      }
    }

    if (optionsMenu) {
      optionsMenu.addEventListener("scroll", updateFade);
      updateFade();
    }

    return () => {
      if (optionsMenu) {
        optionsMenu.removeEventListener("scroll", updateFade);
      }
    };
  }, [currentIndex]);

  useEffect(() => {
    const container = document.querySelector(`.${styles.content}`);

    function updateCurrentIndexOnScroll() {
      setUserScrollOverride(true);

      if (!container) return;

      const showcases = Array.from(
        container.querySelectorAll(`.${styles.showcase}`)
      );
      let maxVisible = 0;
      let bestIndex = 0;

      showcases.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const visible = Math.max(
          0,
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
        );
        if (visible > maxVisible) {
          maxVisible = visible;
          bestIndex = i;
        }
      });

      setCurrentIndex(bestIndex);
    }

    window.addEventListener("scroll", updateCurrentIndexOnScroll);
    window.addEventListener("resize", updateCurrentIndexOnScroll);

    // Initial check
    updateCurrentIndexOnScroll();

    return () => {
      window.removeEventListener("scroll", updateCurrentIndexOnScroll);
      window.removeEventListener("resize", updateCurrentIndexOnScroll);
    };
  }, []);

  return (
    <div className={styles.terminal}>
      <div className={styles.menu}>
        <div className={styles.header}>
          <div style={{ display: "flex", flexWrap: "nowrap" }}>
            <div
              className={styles.prompt}
              onMouseEnter={() => setIsTitleHovered(true)}
              onMouseLeave={() => setIsTitleHovered(false)}
            >
              <TrembleText text="lluís montabes /" />
            </div>
            {/* <div className={styles.response}>
              <p>
                <span role="img" aria-label="waving hand">
                  👋
                </span>{" "}
                web dev & designer, ML engineer — check out my stuff
              </p>
            </div> */}
            <div className={styles.optionsWrapper}>
              <div className={styles.options} id="optionsMenu">
                {menuItems.map((item, i) => (
                  <div key={i} style={{ display: "flex" }}>
                    <MenuItem
                      key={item.label}
                      label={item.label}
                      highlighted={currentIndex === i}
                      onClick={() => {
                        scrollToCurrentProjectShowcase();
                      }}
                      index={i}
                      onHover={() => {
                        setCurrentIndex(i);
                        setCurrentProjectIndex(0);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.description}>
            <TrembleText text={`~ ${menuItems[currentIndex].description}`} />
          </div>
        </div>
        <div className={styles.content}>
          {menuItems.map((item, i) => (
            <ProjectShowcase key={i} {...item} />
          ))}
        </div>
        <div className={styles.footer}>
          <div className={styles.prompt}>
            <TrembleText
              text={"github @lousmontabes  ·  email lluismontabes@gmail.com"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({
  label,
  highlighted,
  onClick,
  index,
  onHover,
}: {
  label: string;
  highlighted: boolean;
  onClick: () => void;
  index: number;
  onHover: () => void;
  image?: string;
}) => {
  return (
    <div
      className="menuItemContainer"
      onClick={onClick}
      onMouseEnter={onHover}
      role="button"
      tabIndex={index}
    >
      <div
        className={`${styles.menuItem} ${
          highlighted ? styles.highlighted : ""
        }`}
        style={{
          color: "var(--fg)",
        }}
      >
        <TrembleText text={label} enabled={highlighted} />
      </div>
    </div>
  );
};

const TrembleText = ({
  text,
  enabled = true,
}: {
  text: string;
  enabled?: boolean;
}) => {
  if (!enabled) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={styles["tremble-char"]}
          style={{
            animationDuration: `${0.2 + Math.random() * 0.3}s`,
            animationDelay: `${Math.random() * 0.3}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

type ProjectShowcaseProps = {
  label: string;
  description: string;
  year: number;
  tech: string[];
  status: string;
  links: { label: string; url: string }[];
  showcase: { type: string; source: string };
};

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  label,
  description,
  year,
  links,
  tech,
  status,
  showcase: { type, source },
}: ProjectShowcaseProps) => (
  <div className={styles.showcase}>
    <div className={styles.media}>
      {type === "embed" ? (
        <iframe
          src={source}
          width="300"
          height="375"
          style={{ border: "none", borderRadius: "8px" }}
          title="Project embed"
        />
      ) : (
        // <div
        //   className={styles.mediaImage}
        //   style={{ backgroundImage: `url(${source})` }}
        // />
        <img
          src={source}
          width="300"
          height="375"
          style={{ borderRadius: "8px" }}
          alt={"Showcase image for " + label}
          className={styles.mediaImage}
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src =
              "https://images.unsplash.com/vector-1759217082542-075a1529d0a5?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
          }}
        />
      )}
    </div>
    <div className={styles.projectInfo}>
      <div>
        <span className={styles.projectTitle}>{label}, </span>
        <span className={styles.projectYear}>{year}</span>
      </div>
      <div className={styles.projectDescription}>{description}</div>
      <div className={styles.projectTech}>
        {tech.map((t) => (
          <span key={t} className={styles.projectTechItem}>
            {t}
          </span>
        ))}
      </div>
      <div className={styles.projectLinks}>
        {status === "archived" && (
          <span className={styles.projectArchived}>archived</span>
        )}
        {links.map(({ label, url }) => (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4em",
              color: linkColors[label],
            }}
          >
            {label}
            <svg
              width=".6em"
              height=".6em"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ verticalAlign: "middle" }}
              aria-label="External link"
            >
              <path
                d="M13.5 3H17v3.5M9 11l8-8M17 17H3V3h5 M17 12V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default App;
