
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
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
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',  
        base: '1rem',    
        lg: '1.125rem', 
        xl: '1.25rem',   
        '2xl': '1.5rem', 
        '3xl': '1.875rem', 
        '4xl': '2.25rem', 
        '5xl': '3rem',  
      },
    },
  },
  plugins: [],
};
