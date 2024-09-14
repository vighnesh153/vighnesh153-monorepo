/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      primary: 'rgb(var(--color-primary))',
      secondary: 'rgb(var(--color-secondary))',
      accent: 'rgb(var(--color-accent))',
      background: 'rgb(var(--color-background))',
      text: 'rgb(var(--color-text))',

      backgroundDark: 'rgb(var(--color-bg-dark))',
      backgroundLight: 'rgb(var(--color-bg-light))',
      backgroundBlend: 'rgb(var(--color-bg-blend))',

      text2: 'rgba(var(--color-text) / 80%)',
      text3: 'rgba(var(--color-text) / 60%)',
      text4: 'rgba(var(--color-text) / 30%)',
    },
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      transitionProperty: {
        width: 'width',
      },
      animation: {
        'reverse-spin': 'reverse-spin 1s linear infinite',
      },
      keyframes: {
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
    zIndex: {
      px: 1,
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
    // progress bar
    'progress-bar',
  ],
};
