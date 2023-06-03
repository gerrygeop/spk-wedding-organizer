import { Link } from "@inertiajs/react";

export default function EditButton({ children, className, ...props }) {
    return (
        <Link
            {...props}
            className={`inline-flex items-center rounded bg-emerald-50 px-2 py-1 font-medium text-xs text-emerald-800 uppercase tracking-wider ring-1 ring-inset ring-emerald-600/40 hover:ring-emerald-600 ${className}`}
        >
            {children}
        </Link>
    );
}
