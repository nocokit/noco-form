/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    // Submit button gradient and shadows
    'from-[#2563eb]',
    'to-[#1d4ed8]',
    'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_14px_0_rgba(37,99,235,0.39)]',
    'hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_6px_20px_rgba(37,99,235,0.5)]',
    'active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]',
    'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]',
    'shadow-[0_4px_14px_0_rgba(16,185,129,0.3)]',
    'active:scale-[0.98]',
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware colors using CSS variables
        'deep': 'var(--bg-deep)',
        'body': 'var(--bg-body)',
        'app': 'var(--bg-app)',
        'panel': 'var(--bg-panel)',
        'card': 'var(--bg-card)',
        'canvas': 'var(--bg-canvas)',
        'secondary': 'var(--bg-secondary)',
        'glass': 'var(--bg-glass)',

        // Backward compatibility (will be deprecated)
        'bg-main': 'var(--bg-body)',
        'bg-panel': 'var(--bg-panel)',
        'bg-input': 'var(--bg-card)',

        // Border colors
        'border-base': 'var(--border-base)',
        'border-subtle': 'var(--border-subtle)',
        'border-medium': 'var(--border-medium)',
        'border-custom': 'var(--border-subtle)',

        // Primary/Accent colors
        'primary': 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'accent': 'var(--primary)',

        // Text colors
        'text': {
          'primary': 'var(--text-primary)',
          'secondary': 'var(--text-secondary)',
          'tertiary': 'var(--text-tertiary)',
          'dim': 'var(--text-dim)',
          'inverse': 'var(--text-inverse)',
        },
        'text-dim': 'var(--text-dim)',
        'text-bright': 'var(--text-primary)',
      },
      spacing: {
        '4.5': '1.125rem', // 18px for switch height
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }], // 10px
        'xs': ['0.8125rem', { lineHeight: '1.25rem' }], // 13px - matching design
      },
      borderRadius: {
        'lg': '0.5rem', // 8px - matching design
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // 禁用 Tailwind 的基础样式重置，避免冲突
  },
}
