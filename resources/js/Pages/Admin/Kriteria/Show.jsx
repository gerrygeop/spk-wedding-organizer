import Container, { Board, Section } from "@/Components/Container";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

export default function Show({ kriteria }) {
    const editKriteria = () => {
        router.visit(route("kriteria.edit", kriteria));
    };

    const deleteKriteria = () => {
        router.delete(route("kriteria.destroy", kriteria));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kriteria {kriteria.nama}
                </h2>
            }
        >
            <Head title="Kriteria" />

            <Container>
                <Board>
                    <Section>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-lg text-gray-800">
                                Detail Kriteria
                            </h3>
                            <div className="flex items-center gap-x-2">
                                <PrimaryButton
                                    type="button"
                                    onClick={editKriteria}
                                >
                                    Edit
                                </PrimaryButton>
                                <DangerButton
                                    type="button"
                                    onClick={deleteKriteria}
                                >
                                    Hapus
                                </DangerButton>
                            </div>
                        </div>
                        <div className="border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-semibold leading-6 text-gray-600">
                                        Nama Kriteria
                                    </dt>
                                    <dd className="mt-1 leading-6 font-semibold text-lg text-gray-800 sm:col-span-3 sm:mt-0">
                                        {kriteria.nama}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-semibold leading-6 text-gray-600">
                                        Bobot Kriteria
                                    </dt>
                                    <dd className="mt-1 leading-6 font-semibold text-lg text-gray-800 sm:col-span-3 sm:mt-0">
                                        {kriteria.bobot}
                                    </dd>
                                </div>
                                <div className="px-4 pt-8 pb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="col-span-full text-lg font-semibold leading-6 text-gray-800">
                                        Detail Sub Kriteria
                                    </dt>
                                </div>
                            </dl>
                        </div>

                        <div className="border rounded">
                            <Table>
                                <Table.Thead>
                                    <tr>
                                        <Table.Th scope="col">
                                            Nama Sub Kriteria
                                        </Table.Th>
                                        <Table.Th scope="col">Bobot</Table.Th>
                                        <Table.Th scope="col"></Table.Th>
                                    </tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {kriteria.sub_kriteria.length > 0 ? (
                                        kriteria.sub_kriteria.map((sub) => (
                                            <tr key={sub.id}>
                                                <Table.Td>
                                                    <span className="capitalize font-semibold text-gray-800">
                                                        {sub.nama}
                                                    </span>
                                                </Table.Td>
                                                <Table.Td>{sub.bobot}</Table.Td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <Table.Td colSpan="3">
                                                <p className="text-gray-500 text-center italic">
                                                    Tidak ada Sub Kriteria
                                                </p>
                                            </Table.Td>
                                        </tr>
                                    )}
                                </Table.Tbody>
                            </Table>
                        </div>
                    </Section>
                </Board>
            </Container>
        </AuthenticatedLayout>
    );
}
