// use the 'use client' directive to make sure that the usePathname hook is only rendered on the client,
'use client';
import classNames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'


const NavBar = () => {
    /*
    In order to reduce the repetition of the href, label, 
    and tailwind class names, we can create an array of objects that contain the href and label
     for each link. Then we can map over the array and render a Link component for each object in the array, 
     and add the class names only once
     */
const links = [
    {label:'Dashboard', href:'/'},
    {label:'Issues', href:'/issues'},
]

// usePathname is a hook that returns the current path of the page, and we use the current path to set the active link.
const currentPath = usePathname();
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"> <AiFillBug/>   </Link>
        <ul className='flex space-x-6'>
            {links.map(link => <Link key={link.href} className={classNames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-500':link.href !== currentPath,
                'hover:text-zinc-800 transation-colors': true
            })} href={link.href}> {link.label} </Link>)}
        </ul>
    </nav>
  )
}
export default NavBar;
 
