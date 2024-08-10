"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { FaSun, FaMoon } from "react-icons/fa";
import Dropdown from "../Statefull/Dropdown";

import { signIn, signOut, useSession } from "next-auth/react";
import { PiFlowerTulip } from "react-icons/pi";
import Button from "../Statefull/Button";

export default function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const links = ["Pricin00g"];
    const { data: user } = useSession();

    return (
        <>
            <div className="fixed top-0 w-full items-center flex justify-center z-50">

                <div
                    className={`fixed bg-black/85 text-white top-3 z-50 mx-auto flex w-3/4 items-center justify-center rounded-3xl  p-3 backdrop-blur-md `}
                >
                    <div className="container mx-auto flex items-center justify-between">
                        {/* Left Section */}
                        <Link href="/" className="flex-1 text-xl font-bold">
                            <div className="mx-3 flex items-center gap-3"><PiFlowerTulip /> <span>Agro Expert</span> </div>
                        </Link>

                        {/* Center Links */}
                        <div className="hidden flex-1 justify-center gap-4 md:flex">
                            <Link href={`/#pricing`} className="text-xl font-bold">

                            </Link>
                            {user?.user ? (
                                <>
                                    <Link className="text-xl font-bold" href="/dashboard">

                                    </Link>
                                    <Link className="text-xl font-bold" href="/new-project">

                                    </Link>
                                </>
                            ) : null}
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-1 items-center justify-end gap-3">
                            <CiMenuFries
                                onClick={() => setIsExpanded(!isExpanded)}
                                className={`text-3xl transition-all md:hidden ${isExpanded ? "rotate-90" : ""}`}
                            />

                            {user?.user ? (
                                <span className="hidden md:block">
                                    <Dropdown title={user.user.name}>
                                        <Link href="/profile">Profile</Link>
                                        <button
                                            onClick={() => {
                                                signOut();
                                            }}
                                        >
                                            SignOut
                                        </button>
                                    </Dropdown>
                                </span>
                            ) : (
                                <Button title="SignIn" onClick={() => { signIn('google') }} />
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`sticky items-center justify-between rounded-3xl border border-gray-400/50 p-3 px-5 backdrop-blur-md transition-all  top-20 z-50 mx-auto flex w-3/4 flex-col md:hidden ${isExpanded ? "block" : "hidden"}`}
                >
                    {links.map((link) => (
                        <Link
                            href={`/${link.toLowerCase()}`}
                            key={link}
                            className="text-xl font-bold"
                        >
                            {link}
                        </Link>
                    ))}
                    {user?.user ? (
                        <>
                            <Link className="text-xl font-bold" href="/dashboard">
                                Dashboard
                            </Link>

                            <Link className="text-xl font-bold" href="/new-project">
                                New
                            </Link>
                        </>
                    ) : null}

                    {user?.user ? (
                        <span className="block md:hidden">
                            <Dropdown title={user.user?.name}>
                                <Link href="/profile">Profile</Link>
                                <button
                                    onClick={() => {
                                        signOut();
                                    }}
                                >
                                    SignOut
                                </button>
                            </Dropdown>
                        </span>
                    ) : (
                        <Link className="block md:hidden" href="/signin">
                            SignIn
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
