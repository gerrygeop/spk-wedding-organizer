import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Dashboard Dapur" />

            <div className="py-12">
                <div className="max-w-[122rem] mx-auto sm:px-6 lg:px-8">
                    <div className=" bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're Super Admin!
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
