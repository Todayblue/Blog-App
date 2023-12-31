"use client";

import Link from "next/link";
import React from "react";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const menu = [
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Forum",
    href: "/forum",
  },
];

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-100 container mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <Link href="#">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </Link>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menu.map((menu, idx) => {
              return (
                <li key={idx}>
                  <Link href={menu.href}>{menu.name}</Link>
                </li>
              );
            })}

            <li>
              <a>Forum</a>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          daisyUI
        </Link>
      </div>

      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-2 mr-5 text-base font-meduim">
          {menu.map((menu, idx) => {
            return (
              <li key={idx}>
                <Link href={menu.href}>{menu.name}</Link>
              </li>
            );
          })}
          {session?.user && (
            <li>
              <Link href={"/blog/create-blog"}>Write</Link>
            </li>
          )}
        </ul>
        <div>
          {session?.user ? (
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">{session.user.name}</h3>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      width={500}
                      height={500}
                      src={session?.user.image || ""}
                      alt=""
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li className="btn btn-outline" onClick={() => signOut()}>
                    Sign out
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button className="btn btn-outline" onClick={() => signIn()}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
