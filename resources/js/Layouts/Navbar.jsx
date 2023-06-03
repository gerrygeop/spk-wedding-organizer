import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { usePage } from "@inertiajs/react";

export default function Navbar() {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <nav className="bg-white border-b">
            <div className="lg:hidden p-2 pt-4 border">
                <div className="flex items-center justify-start space-x-2">
                    <img
                        src="https://img.logoipsum.com/289.svg"
                        alt="Logo"
                        className="w-24"
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <h1>SPK</h1>
                        </div>

                        <div className="hidden">
                            {user.role === "admin" ? (
                                <>
                                    <NavLink
                                        href={route("admin.dashboard")}
                                        active={route().current(
                                            "admin.dashboard"
                                        )}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route("alternatif.index")}
                                        active={route().current("alternatif.*")}
                                    >
                                        Alternatif
                                    </NavLink>
                                    <NavLink
                                        href={route("kriteria.index")}
                                        active={route().current("kriteria.*")}
                                    >
                                        Kriteria
                                    </NavLink>
                                </>
                            ) : (
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                            )}
                        </div>
                    </div>

                    <div className="hidden lg:flex lg:items-center lg:ml-6">
                        <div className="ml-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {user.name}

                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="-mr-2 flex items-center lg:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState
                                )
                            }
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? "block" : "hidden") +
                    " lg:hidden w-full bg-white shadow-lg border absolute left-0 z-50"
                }
            >
                <div className="pt-2 pb-3 space-y-1">
                    {user.role === "admin" ? (
                        <>
                            <ResponsiveNavLink
                                href={route("admin.dashboard")}
                                active={route().current("admin.dashboard")}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("alternatif.index")}
                                active={route().current("alternatif.*")}
                            >
                                Alternatif
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("kriteria.index")}
                                active={route().current("kriteria.*")}
                            >
                                Kriteria
                            </ResponsiveNavLink>
                        </>
                    ) : (
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    )}

                    <div className="mt-10 p-4 border-t">
                        <h5 className="font-bold text-xs text-gray-900 tracking-wider uppercase">
                            {">"} TOPSIS
                        </h5>
                    </div>

                    <ResponsiveNavLink
                        href={route("normalisasi-matrix")}
                        active={route().current("normalisasi-matrix")}
                    >
                        <span className="tracking-wide">Normalisasi</span>
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("normalisasi-matrix-terbobot")}
                        active={route().current("normalisasi-matrix-terbobot")}
                    >
                        <span className="tracking-wide">
                            Normalisasi Terbobot
                        </span>
                    </ResponsiveNavLink>

                    <ResponsiveNavLink
                        href={route("solusi-ideal")}
                        active={route().current("solusi-ideal")}
                    >
                        <span className="tracking-wide">Solusi Ideal</span>
                    </ResponsiveNavLink>

                    <ResponsiveNavLink
                        href={route("jarak-ideal")}
                        active={route().current("jarak-ideal")}
                    >
                        <span className="tracking-wide">Jarak Ideal</span>
                    </ResponsiveNavLink>

                    <ResponsiveNavLink
                        href={route("preferensi")}
                        active={route().current("preferensi")}
                    >
                        <span className="tracking-wide">Preferensi</span>
                    </ResponsiveNavLink>

                    <ResponsiveNavLink
                        href={route("ranking")}
                        active={route().current("ranking")}
                    >
                        <span className="tracking-wide">Ranking</span>
                    </ResponsiveNavLink>
                </div>

                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800">
                            {user.name}
                        </div>
                        <div className="font-medium text-sm text-gray-500">
                            {user.username}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route("profile.edit")}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
