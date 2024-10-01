import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        theme: {
            fontFamily: {
                sans: ["SUSE", "Sans-serif"],

            },
        },
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                avaxred: "#FF394A",
                avaxdarkgrey:"#161617",
                avaxlightgrey:"#F5F5F9"
            },
            fontFamily: {
                roboto: ["Roboto", "Sans-serif"],
            },


        },

    },
    plugins: [],
};
export default config;
