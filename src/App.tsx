import { useRef, useEffect, useState } from "react";
import styles from "./App.module.css";

const menuItems = [
  {
    label: "wip",
    href: "#about",
    showcase: [
      {
        title: "miniclub",
        description: "an app for communities with just the necessary",
        image: "miniclub.gif",
      },
      {
        title: "hypercube",
        description: "merge cubes in 3D space",
        image: "hypercube.png",
      },
      {
        title: "nyam.app",
        description: "an AI-powered nutrients tracker",
        image: "nyam.png",
      },
      {
        title: "filee.es",
        description: "an encrypted file management app",
        image: "fileees.png",
      },
      {
        title: "Boats & Cards",
        description:
          "a 1v1 multiplayer game for android, set on the ocean, with boats and cards",
        image: "bnc.png",
      },
      {
        title: "Calendar",
        description: "a calendar app for organizing events and tasks",
        image: "calendar.png",
      },
      {
        title: "Forkilla",
        description: "a calendar app for organizing events and tasks",
        image: "calendar.png",
      },
    ],
  },
  {
    label: "stuff",
    href: "#projects",
    showcase: [
      { title: "Project 2", description: "Description for project 2" },
      { title: "Project 3", description: "Description for project 3" },
      { title: "Project 4", description: "Description for project 4" },
    ],
  },
  {
    label: "find me at",
    href: "#contact",
    showcase: [
      { title: "Contact Me", description: "Description for contact me" },
    ],
  },
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % menuItems.length);
        setCurrentProjectIndex(0);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCurrentIndex(
          (prev) => (prev - 1 + menuItems.length) % menuItems.length
        );
        setCurrentProjectIndex(0);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const showcaseLength = menuItems[currentIndex].showcase.length;
        setCurrentProjectIndex((prev) => (prev + 1) % showcaseLength);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const showcaseLength = menuItems[currentIndex].showcase.length;
        setCurrentProjectIndex(
          (prev) => (prev - 1 + showcaseLength) % showcaseLength
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Optionally, auto-focus the first item on mount
  useEffect(() => {
    setCurrentProjectIndex(0);
  }, [currentIndex]);

  return (
    <div className={styles.terminal}>
      <div className={styles.menu}>
        <div className={styles.prompt}>lmg</div>
        <div className={styles.response}>
          <p>
            <span role="img" aria-label="waving hand">
              👋
            </span>{" "}
            web designer & dev — check out my stuff
          </p>
        </div>
        {menuItems.map((item, i) => (
          <>
            <MenuItem
              key={item.label}
              label={item.label}
              highlighted={currentIndex === i}
              onClick={() => {
                window.location.hash = item.href;
              }}
              index={i}
              onHover={() => {
                setCurrentIndex(i);
                setCurrentProjectIndex(0); // Reset project index on hover
              }}
            />
            {currentIndex === i && (
              <>
                <div className={styles.response}>
                  <div className={styles.showcase}>
                    {item.showcase.map((project, i) => (
                      <div className={styles.project} key={i}>
                        <MenuItem
                          key={project.title}
                          label={project.title}
                          highlighted={currentProjectIndex === i}
                          onHover={() => setCurrentProjectIndex(i)}
                          onClick={function (): void {
                            throw new Error("Function not implemented.");
                          }}
                          index={0}
                          image={null}
                          highlightStyle="underline"
                        />
                      </div>
                    ))}
                  </div>
                  <div className={styles.description}>
                    ~ {item.showcase[currentProjectIndex].description}
                  </div>
                </div>
              </>
            )}
          </>
        ))}
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
      className={styles.menuItemContainer}
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
        {highlighted ? "> " : "  "}
        {label}
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

export default App;
