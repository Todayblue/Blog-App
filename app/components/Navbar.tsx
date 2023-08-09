import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Blog</a></li>
            <li><a>Forum</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-2 mr-5 text-base font-meduim">
          <li><Link href='http://localhost:3000/blog'>Blog</Link></li>
          <li tabIndex={0}>
          </li>
          <li><Link href='http://localhost:3000/forum'>Forum</Link></li>
        </ul>
        <Link href='http://localhost:3000/login' className="btn ">Login</Link>
      </div>

    </div>
  )
}

export default Navbar
