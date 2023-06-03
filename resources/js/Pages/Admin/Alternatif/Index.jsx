import Container, { Board, Section } from "@/Components/Container";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";

export default function Index({ alternatif, kriteria }) {
    const createNew = () => {
        router.visit(route("alternatif.create"));
    };

    return (
        <AdminLayout>
            <Container>
                <Board>
                    <Section>
                        <div className="flex items-center justify-end mb-4">
                            <PrimaryButton type="button" onClick={createNew}>
                                Alternatif baru
                            </PrimaryButton>
                        </div>
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th scope="col">Nama</Table.Th>

                                    {kriteria.map((ktr) => (
                                        <Table.Th key={ktr.id} scope="col">
                                            {ktr.nama}
                                        </Table.Th>
                                    ))}
                                    <Table.Th scope="col"></Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {alternatif.length > 0 ? (
                                    alternatif.map((alt) => (
                                        <tr key={alt.id}>
                                            <Table.Td>
                                                <span className="capitalize text-sm text-gray-800">
                                                    {alt.nama}
                                                </span>
                                            </Table.Td>

                                            {alt.kriteria.map((ktr, i) => (
                                                <Table.Td key={ktr.id}>
                                                    {ktr.pivot.nilai}
                                                </Table.Td>
                                            ))}
                                            <Table.Td>
                                                <Link
                                                    href={route(
                                                        "alternatif.show",
                                                        alt
                                                    )}
                                                >
                                                    Detail
                                                </Link>
                                            </Table.Td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <Table.Td colSpan="6">
                                            <p className="text-gray-500 text-center italic">
                                                Tidak ada alternatif
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
