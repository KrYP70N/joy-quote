import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6635F2',
        secondary: '#3B1F8C',
        active: '#1affc9',
        txt: '#333',
        light: '#fff',
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      width: {
        "calc-100-32": "calc(100% - 32px)"
      },
      inset: {
        'custom-left': '16px', // Add your custom left value here
      },
    },
  },
  plugins: [],
};
export default config;
