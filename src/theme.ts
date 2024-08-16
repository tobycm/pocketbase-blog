export function setTheme(theme?: string | null) {
  const css = document.getElementById("theme") as HTMLLinkElement;

  // no theme? toggle
  if (!theme) theme = css.href.endsWith("light.css") ? "/src/dark.css" : "/src/light.css";

  css.href = theme;
  css.setAttribute("data-theme", theme.split(".")[0].split("/").pop()!);

  console.log(css);

  localStorage.setItem("theme", theme);

  (document.getElementById("themeButton") as HTMLButtonElement).textContent = theme.endsWith("light.css") ? "🔆" : "🌙";
}

let theme = localStorage.getItem("theme");

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (!theme && prefersDarkScheme.matches) theme = "dark.css";

setTheme(theme);

const themeButton = document.getElementById("themeButton") as HTMLButtonElement;
themeButton.addEventListener("click", () => setTheme());
