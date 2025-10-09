import React, { useRef, useEffect } from "react";
import { useState } from "react";
import styles from "./App.module.css";

const menuItems = [
  {
    label: "hypercube",
    description: "merge cubes in 3D space",
    year: 2025,
    showcase: { type: "image", source: "/images/hypercube.png" },
    links: [
      { label: "play", url: "https://montab.es/icecuber" },
      { label: "code", url: "https://github.com/lousmontabes/icecuber" },
    ],
  },
  {
    label: "miniclub",
    description:
      "an app for communities with no algorithms & just the necessary",
    year: 2025,
    showcase: { type: "image", source: "/images/miniclub.gif" },
    links: [{ label: "code", url: "https://github.com/lousmontabes/miniclub" }],
  },
  {
    label: "nyam.app",
    description: "an AI-powered nutrients tracker",
    year: 2024,
    showcase: { type: "image", source: "/images/nyam-app.png" },
    links: [
      { label: "open", url: "https://nyam.app" },
      { label: "code", url: "https://github.com/lousmontabes/nyam-app" },
    ],
  },
  {
    label: "portfolio: gerard borràs",
    description: "portfolio for filmmaker and photographer Gerard Borràs",
    year: 2022,
    showcase: { type: "image", source: "/images/gerard-borras.png" },
    links: [{ label: "open", url: "https://gerardborras.com" }],
  },
  {
    label: "filee.es",
    description: "an encrypted file management app",
    year: 2021,
    showcase: { type: "image", source: "/images/fileees.png" },
    links: [
      { label: "open", url: "https://filee.es" },
      { label: "code", url: "https://github.com/lousmontabes/fileees" },
    ],
  },
  {
    label: "Calendar",
    description: "a calendar app for organizing events and tasks",
    year: 2019,
    showcase: { type: "image", source: "/images/calendar.png" },
    links: [
      { label: "code", url: "https://github.com/lousmontabes/calendar-app" },
    ],
  },
  {
    label: "Boats & Cards",
    description:
      "a 1v1 multiplayer game for android, set on the ocean, with boats and cards",
    year: 2018,
    showcase: { type: "image", source: "/images/b-and-c.png" },
    links: [
      {
        label: "code",
        url: "https://github.com/lousmontabes/boats-and-cards",
      },
    ],
  },
  {
    label: "Codechat",
    description: "a chat app for developers",
    year: 2015,
    showcase: { type: "image", source: "/images/codechat.png" },
    links: [{ label: "code", url: "https://github.com/lousmontabes/codechat" }],
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % menuItems.length);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
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
  }, [currentIndex]);

  const scrollToMenuItem = () => {
    const optionsMenu = document.querySelector("#optionsMenu");
    const menuItem = optionsMenu?.querySelectorAll(".menuItemContainer")[
      currentIndex % menuItems.length
    ] as HTMLElement;

    console.log(currentIndex, menuItems.length);
    const isLastItem = currentIndex === menuItems.length - 1;
    const isScrolledToRight = optionsMenu
      ? Math.abs(
          optionsMenu.scrollLeft +
            optionsMenu.clientWidth -
            optionsMenu.scrollWidth
        ) === 0
      : false;

    const optionsWrapper = document.querySelector(`.${styles.optionsWrapper}`);

    if (optionsWrapper && isLastItem) {
      optionsWrapper.classList.add(styles.noRightFade);
    }

    // ^ check why the delay

    if (menuItem && optionsMenu) {
      const gradientOffset = 32;

      // Get bounding rectangles
      const menuRect = optionsMenu.getBoundingClientRect();
      const itemRect = menuItem.getBoundingClientRect();

      // Check if item is out of view (left or right side)
      if (
        itemRect.left < menuRect.left + gradientOffset ||
        itemRect.right > menuRect.right - gradientOffset
      ) {
        // Calculate the left position of the menuItem relative to the scroll container
        const itemLeft = menuItem.offsetLeft;
        // If item is out on the left, scroll so it's just after the gradient
        if (itemRect.left < menuRect.left + gradientOffset) {
          const targetScroll = itemLeft - gradientOffset;
          optionsMenu.scrollTo({
            left: targetScroll,
            behavior: "smooth",
          });
        }
        // If item is out on the right, scroll so it's just before the right gradient
        else if (itemRect.right > menuRect.right - gradientOffset) {
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
              <TrembleText
                text="lluís montabes /"
                intensity={isTitleHovered ? 3 : 1.5}
              />
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
                        // window.location.hash = item.href;
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
            <TrembleText
              text={`~ ${menuItems[currentIndex].description}`}
              intensity={1}
            />
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
              intensity={1}
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
  image,
  highlightStyle = "background",
}: {
  label: string;
  highlighted: boolean;
  onClick: () => void;
  index: number;
  onHover: () => void;
  image?: string;
  highlightStyle?: "background" | "underline";
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
          highlighted
            ? highlightStyle === "background"
              ? styles.highlighted
              : styles.underline
            : ""
        }`}
        style={{
          color:
            highlightStyle === "background"
              ? "var(--fg)"
              : "var(--response-color)",
        }}
      >
        {highlightStyle === "background" && false ? "/ " : "  "}
        <TrembleText text={label} intensity={highlighted ? 1.5 : 0} />
        {image && (
          <img
            src={image}
            // alt={"Showcase image for " + label}
            className={styles.menuItemImage}
          />
        )}
      </div>
    </div>
  );
};

const TrembleText = ({
  text,
  intensity,
}: {
  text: string;
  intensity: number;
}) => {
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let running = true;
    function animate() {
      if (!running) return;
      spansRef.current.forEach((span) => {
        if (span) {
          const x = (Math.random() - 0.5) * 2 * intensity;
          const y = (Math.random() - 0.5) * 2 * intensity;
          span.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
      requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
    };
  }, [text, intensity]); // <-- add intensity here

  if (intensity === 0) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            spansRef.current[i] = el;
          }}
          style={{
            display: "inline-block",
            transition: "transform 0.1s",
            willChange: "transform",
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
  links: { label: string; url: string }[];
  showcase: { type: string; source: string };
};

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  label,
  description,
  year,
  links,
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
          title="Minigame"
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
      {/* <img
        src="https://images.unsplash.com/vector-1759217082542-075a1529d0a5?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width="300"
        height="100%"
        alt={"Showcase image for " + label}
        className={styles.mediaImage}
      /> */}
    </div>
    <div className={styles.projectInfo}>
      <div>
        <span className={styles.projectTitle}>{label}, </span>
        <span className={styles.projectYear}>{year}</span>
      </div>
      <div className={styles.projectDescription}>{description}</div>
      <div className={styles.projectLinks}>
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
