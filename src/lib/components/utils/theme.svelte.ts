import { browser } from "$app/environment";
import { onMount } from "svelte";

type Theme = "light" | "dark";
type SystemTheme = Theme | "system";

let theme: SystemTheme = "light";

let darkModeMediaQuery: MediaQueryList | undefined = undefined;

if (browser) {
    darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
}

export const themeChange = new Event("themeChange");

export const initTheme = () => {
    if (!browser) { return; }

    const cookieTheme: Theme | null = localStorage.getItem("theme") as Theme | null;

    if (cookieTheme) {
        theme = cookieTheme;
    } else {
        theme = "system";
        localStorage.setItem("theme", theme);
    }

    onMount(() => {
        setTheme(theme);
    });
};

export const getTheme = (): Theme => {
    if (theme === "system") {
        return (darkModeMediaQuery?.matches) ? "dark" : "light";
    } else {
        return theme;
    }
};

const applyTheme = () => {
    document.body.classList.toggle("dark", getTheme() === "dark");
    document.body.style.colorScheme = getTheme();
    document.dispatchEvent(themeChange);
};

export const setTheme = (t: SystemTheme) => {
    if (!browser) { return; }

    theme = t;
    localStorage.setItem("theme", theme);
    applyTheme();
};

darkModeMediaQuery?.addEventListener('change', () => {
    if (theme !== "system") { return; }

    applyTheme();
});
