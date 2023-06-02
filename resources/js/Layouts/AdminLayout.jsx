import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="flex max-w-[100rem] mx-auto">
                <Sidebar />

                <main className="flex-1 ml-0 lg:ml-64">{children}</main>
            </div>
        </div>
    );
}
