// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL = "https://rayhanahmedshis.me";

const fonts = {
  heading: { variable: "--font-inter" },
  body: { variable: "--font-inter" },
  label: { variable: "--font-inter" },
  code: { variable: "--font-inter" },
};

// default customization applied to the HTML in the main layout.tsx
const style = {
  theme: "dark", // dark | light | system
  neutral: "gray", // sand | gray | slate
  brand: "blue", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "indigo", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "contrast", // color | contrast | inverse
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "filled", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false
  },
};

const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: true,
    size: "2",
    color: "brand-on-background-weak",
    opacity: 40,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
    thickness: 1,
    angle: 45,
    size: "8",
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
    width: "2",
    height: "2",
  },
};

// metadata for pages
const meta = {
  home: {
    path: "/",
    title: "Md. Rayhan Ahmed Shis - Portfolio",
    description: "Developer / Technologist / Creative Coder",
    image: "/og.png",
    canonical: "https://rayhanahmedshis.me",
    robots: "index,follow",
  },
};

// default schema data
const schema = {
  logo: "",
  type: "Person",
  name: "Md. Rayhan Ahmed Shis",
  description: meta.home.description,
  email: "rayhan@example.com",
};

// social links
const social = {
  twitter: "https://www.twitter.com/",
  linkedin: "https://www.linkedin.com/in/",
  github: "https://github.com/rafsan3051",
};

module.exports = { baseURL, fonts, style, meta, schema, social, effects, dataStyle };
