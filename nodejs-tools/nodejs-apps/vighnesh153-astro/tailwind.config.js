/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      primary: 'rgb(144, 116, 220)',
      secondary: 'rgb(0, 0, 0)',
      accent: 'rgb(102, 255, 219)',
      background: 'rgb(10, 24, 46)',
      text: 'rgb(251, 226, 253)',

      backgroundDark: 'rgb(3, 12, 28)',
      backgroundLight: 'rgb(18, 36, 67)',
      backgroundBlend: 'rgb(19, 44, 63)',

      text2: 'rgba(251, 226, 253, 70%)',
      text3: 'rgba(251, 226, 253, 60%)',
      text4: 'rgba(251, 226, 253, 30%)',
    },
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      transitionProperty: {
        width: 'width',
      },
    },
    zIndex: {
      mobileStepper: 1000,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },
  },
  // prevent the following classes (defined in base.scss) from getting deleted from final bundle
  safelist: [
    // links
    'regular-link',
    'primary-btn-link',
    'secondary-btn-link',
    // buttons
    'base-button',
    'primary-button',
    'secondary-button',
    // popover
    'popover-content-root',
    // flex
    'flex-col',
    'flex-col-reverse',
    'flex-row',
    'flex-row-reverse',
    'items-start',
    'items-center',
    'items-end',
    // rotation
    'before:rotate-90',
    'before:-rotate-90',
    'before:rotate-180',
    // before pseudo elements
    'before:text-primary',
  ],
};
