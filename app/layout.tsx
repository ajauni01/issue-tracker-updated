import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './NavBar';
import { Theme, ThemePanel } from '@radix-ui/themes';

// add the Inter font to the page
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
      <Theme  accentColor="yellow" grayColor="mauve" scaling="105%">
      <NavBar/>
      <main className='p-5'>
        {children}
      </main>
      {/* ThemePanel component to customize the Radix UI themes */}
      {/* <ThemePanel/> */}
      </Theme>
      </body>
    </html>
  )
}
// TODO: Investigate why my page.tsx working as a child of the RootLayout despite not being wrapped by it.
// TODO:Investigate how the font is implemented in the RootLayout component and why the inter font is not loading