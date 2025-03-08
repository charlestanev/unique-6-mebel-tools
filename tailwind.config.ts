import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{css,scss}',
    './src/styles/globals.css'
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7F5AF0",      // Electric Purple (Modern & Bold, futuristic glow)
        secondary: "#00A6FB",    // Cyber Blue (Sharp & Premium, vibrant yet professional)
        accent: "#FF7AC6",       // Neon Pink (Luxury & Trendy, eye-catching statement)
        background: "#FAF8FF",   // Soft Lilac White (Sleek & Airy, high-end aesthetic)
        darkBg: "#121826",       // Deep Onyx (Ultra Dark, cinematic and premium)
        darkText: "#E5E7EB",     // Soft Platinum (High contrast yet easy on the eyes)
        highlight: "#16BAC5",    // Aqua Mint (Sharp & Modern, sleek UI feedback)
        danger: "#FF5A5F",       // Coral Red (Vibrant & Distinct, modern alert color)
        success: "#2DD881",      // Emerald Green (Rich & Confident, refined confirmations)
        warning: "#F4A261",      // Sunset Orange (Warm yet clear, premium attention color)
        info: "#4F46E5",         // Royal Blue (Trustworthy & Deep, sophisticated branding)
        neutral: "#94A3B8",      // Cool Gray (Smooth & Classy, balanced UI elements)
      },
      ringColor: {
        primary: "#7F5AF0",
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        custom: "0px 10px 24px rgba(0, 0, 0, 0.15)", // Soft yet premium elevation
      },
      transitionTimingFunction: {
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config;
