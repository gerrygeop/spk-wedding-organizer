import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Authenticated({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
            <Sidebar />

            <main className="flex-1 ml-0 lg:ml-64">
                <Navbar />
                {children}
            </main>
        </div>
    );
}
