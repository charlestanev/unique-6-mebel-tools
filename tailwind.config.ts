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
        primary: "#7F56D9",  // Neon Purple - Modern & Fancy
        secondary: "#10B981", // Emerald Green - Elegant & Luxurious
        accent: "#EAB308", // Gold - Premium & Stylish
        background: "#F8FAFC", // Light Background - Clean & Fresh
        darkBg: "#0A0F1B", // Dark Mode Background - Sleek & Professional
        darkText: "#E2E8F0", // Light Text in Dark Mode - High Contrast
        highlight: "#3B82F6", // Electric Blue - Techy & Sharp
        danger: "#EF4444", // Soft Red - Error & Warnings
        success: "#22C55E", // Soft Green - Confirmation & Good Actions
        warning: "#F59E0B", // Orange - Alerts & Warnings
        info: "#38BDF8", // Sky Blue - Informational Messages
      },
      ringColor: {
        primary: "#7F56D9",
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        custom: "0px 10px 30px rgba(0, 0, 0, 0.15)",
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
