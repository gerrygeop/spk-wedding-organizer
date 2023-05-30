import Container, { Board } from "@/Components/Container";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Alternatif
                </h2>
            }
        >
            <Head title="Alternatif" />

            <Container>
                <Board>
                    <div className="p-6 text-gray-900">You're Super Admin!</div>
                </Board>
            </Container>
        </AuthenticatedLayout>
    );
}
