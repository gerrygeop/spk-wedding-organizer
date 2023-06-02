import { Link } from "@inertiajs/react";

export default function SideLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "flex items-center mx-2 mt-2.5 text-base py-1.5 pl-3 border-l-2 focus:outline-none " +
                (active
                    ? "border-l-emerald-500 text-emerald-600 font-medium "
                    : "border-l-transparent text-gray-600 hover:text-gray-800 hover:border-l-gray-300 focus:text-gray-900 ") +
                className +
                " transition"
            }
        >
            {children}
        </Link>
    );
}
