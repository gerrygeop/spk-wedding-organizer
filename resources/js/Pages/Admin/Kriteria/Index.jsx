import Container, { Board, Section } from "@/Components/Container";
import EditButton from "@/Components/EditButton";
import { IconPlus } from "@/Components/IconPlus";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";

export default function Index({ kriteria }) {
    const createNew = () => {
        router.visit(route("kriteria.create"));
    };

    return (
        <AuthenticatedLayout>
            <Container>
                <Board>
                    <Section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-2xl text-gray-700">
                                Daftar Kriteria
                            </h3>
                            <PrimaryButton
                                type="button"
                                onClick={createNew}
                                className="pl-2.5"
                            >
                                <IconPlus className="w-5 h-5 mr-1.5" />
                                Kriteria baru
                            </PrimaryButton>
                        </div>
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th scope="col">Nama</Table.Th>
                                    <Table.Th scope="col">Bobot</Table.Th>
                                    <Table.Th scope="col"></Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {kriteria.length > 0 ? (
                                    kriteria.map((ktr) => (
                                        <tr key={ktr.id}>
                                            <Table.Td>
                                                <span className="capitalize text-sm text-gray-900">
                                                    {ktr.nama}
                                                </span>
                                            </Table.Td>
                                            <Table.Td>{ktr.bobot}</Table.Td>
                                            <Table.Td className="text-end">
                                                <EditButton
                                                    href={route(
                                                        "kriteria.edit",
                                                        ktr
                                                    )}
                                                >
                                                    Edit
                                                </EditButton>
                                            </Table.Td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <Table.Td colSpan="3">
                                            <p className="text-gray-500 text-center italic">
                                                Tidak ada kriteria
                                            </p>
                                        </Table.Td>
                                    </tr>
                                )}
                            </Table.Tbody>
                        </Table>
                    </Section>
                </Board>
            </Container>
        </AuthenticatedLayout>
    );
}
