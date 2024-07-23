
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#000', 
        secondary: '#212020',
        tertiary: '#42393B',
        quaternary: '#C6C6C6',
        quinary: '#969696',
      },
      fontSize: {
        xs: '0.75rem',   /* 12px */
        sm: '0.875rem',  /* 14px */
        base: '1rem',    /* 16px */
        lg: '1.125rem',  /* 18px */
        xl: '1.25rem',   /* 20px */
        '2xl': '1.5rem', /* 24px */
        '3xl': '1.875rem', /* 30px */
        '4xl': '2.25rem', /* 36px */
        '5xl': '3rem',   /* 48px */
      },
      textUnderlineOffset: {
        2: '2px',
        4: '4px',
        8: '8px',
      },
      padding: {
        '10p': '10%',
        '15p': '15%',
        '20p': '20%',
        '25p': '25%',
        '30p': '30%',
      },
      margin: {
        '10p': '10%',
        '15p': '15%',
        '20p': '20%',
        '25p': '25%',
      },
    },
  },
  plugins: [],
};
