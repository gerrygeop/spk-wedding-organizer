import React from "react";

export default function Container({ children }) {
    return (
        <div className="py-12">
            <div className="max-w-[90rem] mx-auto lg:px-8">{children}</div>
        </div>
    );
}

export const Board = ({ children, className }) => {
    return (
        <div
            className={`bg-white overflow-hidden shadow sm:rounded-lg ${className}`}
        >
            {children}
        </div>
    );
};

export const Section = ({ children, className }) => {
    return (
        <div className={`py-5 px-4 sm:px-6 sm:py-8 ${className}`}>
            {children}
        </div>
    );
};
