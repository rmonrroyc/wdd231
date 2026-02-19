export function saveTheme(theme) {
    localStorage.setItem("theme", theme);
}

export function getTheme() {
    return localStorage.getItem("theme");
}
