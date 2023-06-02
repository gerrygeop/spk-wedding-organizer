import Container, { Board, Section } from "@/Components/Container";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ kriteria }) {
    const createNew = () => {
        router.visit(route("kriteria.create"));
    };

    return (
        <AdminLayout>
            <Head title="Kriteria" />

            <Container>
                <Board>
                    <Section>
                        <div className="flex items-center justify-end mb-4">
                            <PrimaryButton type="button" onClick={createNew}>
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
                                                <span className="capitalize font-semibold text-gray-800">
                                                    {ktr.nama}
                                                </span>
                                            </Table.Td>
                                            <Table.Td>{ktr.bobot}</Table.Td>
                                            <Table.Td>
                                                <Link
                                                    href={route(
                                                        "kriteria.show",
                                                        ktr
                                                    )}
                                                >
                                                    Detail
                                                </Link>
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
        </AdminLayout>
    );
}
