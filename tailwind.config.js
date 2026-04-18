/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'tt-black':    '#000000',
        'tt-surface':  '#121212',
        'tt-elevated': '#1C1C1C',
        'tt-border':   '#2A2A2A',
        'tt-muted':    '#8A8A8A',
        'tt-white':    '#FFFFFF',
        'tt-pink':     '#FE2C55',
        'tt-cyan':     '#25F4EE',
        'tt-blue':     '#2E6AEB',
        'tt-green':    '#25D366',
        'tt-gold':     '#FFD700',
      },
      animation: {
        'slide-up':   'slideUp 0.3s ease-out',
        'fade-in':    'fadeIn 0.2s ease-in',
        'pulse-live': 'pulseLive 1.5s ease-in-out infinite',
        'comment-in': 'commentIn 0.4s ease-out',
      },
      keyframes: {
        slideUp:    { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        fadeIn:     { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        pulseLive:  { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        commentIn:  { '0%': { transform: 'translateX(-30px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
}
