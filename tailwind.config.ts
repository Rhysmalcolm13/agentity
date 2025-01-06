import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: '',
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px',
  		},
  	},
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
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
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					maxWidth: 'none',
  					color: 'hsl(var(--foreground))',
  					hr: {
  						borderColor: 'hsl(var(--border))',
  						marginTop: '3em',
  						marginBottom: '3em',
  					},
  					'h1, h2, h3, h4, h5, h6': {
  						color: 'hsl(var(--foreground))',
  						scrollMarginTop: '5rem',
  					},
  					'h1:first-child': {
  						marginTop: 0,
  					},
  					a: {
  						color: 'hsl(var(--primary))',
  						textDecoration: 'underline',
  						fontWeight: '500',
  					},
  					'a:hover': {
  						color: 'hsl(var(--primary))',
  						textDecoration: 'none',
  					},
  					strong: {
  						color: 'hsl(var(--foreground))',
  						fontWeight: '600',
  					},
  					code: {
  						color: 'hsl(var(--foreground))',
  						backgroundColor: 'hsl(var(--muted))',
  						borderRadius: '0.25rem',
  						padding: '0.25rem 0.375rem',
  						fontSize: '0.875em',
  						fontWeight: '500',
  					},
  					'code::before': {
  						content: '""',
  					},
  					'code::after': {
  						content: '""',
  					},
  					pre: {
  						backgroundColor: 'hsl(var(--muted))',
  						borderRadius: '0.5rem',
  						padding: '1rem',
  						overflowX: 'auto',
  					},
  					'pre code': {
  						backgroundColor: 'transparent',
  						padding: '0',
  						fontSize: '0.875em',
  						fontWeight: '400',
  					},
  					blockquote: {
  						borderLeftColor: 'hsl(var(--primary))',
  						borderLeftWidth: '0.25rem',
  						paddingLeft: '1rem',
  						fontStyle: 'italic',
  						color: 'hsl(var(--muted-foreground))',
  					},
  					ul: {
  						listStyleType: 'disc',
  						paddingLeft: '1.5rem',
  					},
  					ol: {
  						listStyleType: 'decimal',
  						paddingLeft: '1.5rem',
  					},
  					'ul > li::marker': {
  						color: 'hsl(var(--muted-foreground))',
  					},
  					'ol > li::marker': {
  						color: 'hsl(var(--muted-foreground))',
  					},
  					table: {
  						width: '100%',
  						marginTop: '2em',
  						marginBottom: '2em',
  						borderCollapse: 'collapse',
  					},
  					'thead th': {
  						borderBottomWidth: '1px',
  						borderColor: 'hsl(var(--border))',
  						padding: '0.75rem',
  						textAlign: 'left',
  						fontWeight: '600',
  					},
  					'tbody td': {
  						borderBottomWidth: '1px',
  						borderColor: 'hsl(var(--border))',
  						padding: '0.75rem',
  					},
  				},
  			},
  		},
  	}
  },
  plugins: [
  	require("tailwindcss-animate"),
  	require("@tailwindcss/typography"),
  ],
};
export default config;
