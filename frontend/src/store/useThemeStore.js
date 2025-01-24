// saving the theme to local storage so that everytime we refresh the page we still have the selected theme

import { create } from "zustand";

export const useThemeStore = create((Set) => ({
     theme: localStorage.getItem("chat-theme") || "coffee",
     setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        Set({ theme });
     },
}));