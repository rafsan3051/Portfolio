import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '1rem',
  		screens: {
  			'2xl': '1280px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
                    ...fontFamily.sans
                ]
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-4px)'
  				}
  			},
  			glow: {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.5'
  				}
  			},
  			'fade-in': {
  				'0%': { opacity: '0%' },
  				'75%': { opacity: '0%' },
  				'100%': { opacity: '100%' }
  			},
  			'fade-left': {
  				'0%': { transform: 'translateX(100%)', opacity: '0%' },
  				'30%': { transform: 'translateX(0%)', opacity: '100%' },
  				'100%': { opacity: '0%' }
  			},
  			'fade-right': {
  				'0%': { transform: 'translateX(-100%)', opacity: '0%' },
  				'30%': { transform: 'translateX(0%)', opacity: '100%' },
  				'100%': { opacity: '0%' }
  			},
  			title: {
  				'0%': {
  					'line-height': '0%',
  					'letter-spacing': '0.25em',
  					opacity: '0'
  				},
  				'25%': {
  					'line-height': '0%',
  					opacity: '0%'
  				},
  				'80%': {
  					opacity: '100%'
  				},
  				'100%': {
  					'line-height': '100%',
  					opacity: '100%'
  				}
  			}
  		},
  		animation: {
  			float: 'float 6s ease-in-out infinite',
  			glow: 'glow 2s ease-in-out infinite',
  			'fade-in': 'fade-in 3s ease-in-out forwards',
  			title: 'title 3s ease-out forwards',
  			'fade-left': 'fade-left 3s ease-in-out forwards',
  			'fade-right': 'fade-right 3s ease-in-out forwards',
  			'animate-glow': 'glow 2s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
