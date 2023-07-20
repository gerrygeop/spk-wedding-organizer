import Container, { Board, Section } from "@/Components/Container";
import EditButton from "@/Components/EditButton";
import { IconPlus } from "@/Components/IconPlus";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";

export default function Index({ auth, alternatif, kriteria }) {
    const handleCreateButton = () => {
        router.visit(route("alternatif.create"));
    };

    return (
        <AuthenticatedLayout>
            <Container>
                <Board>
                    <Section>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-2xl text-gray-700">
                                Daftar Alternatif
                            </h3>

                            {auth.user.role === "admin" && (
                                <PrimaryButton
                                    type="button"
                                    onClick={handleCreateButton}
                                    className="pl-2.5"
                                >
                                    <IconPlus className="w-5 h-5 mr-1.5" />
                                    Alternatif baru
                                </PrimaryButton>
                            )}
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
                                                <span className="capitalize text-sm text-gray-900">
                                                    {alt.nama}
                                                </span>
                                            </Table.Td>

                                            {alt.kriteria.map((ktr) => (
                                                <Table.Td
                                                    key={ktr.id}
                                                    className="text-sm"
                                                >
                                                    {ktr.sub_kriteria
                                                        .filter(
                                                            (sub) =>
                                                                sub.id ==
                                                                ktr.pivot
                                                                    .sub_kriteria_id
                                                        )
                                                        .map((filteredSub) => (
                                                            <span
                                                                key={
                                                                    filteredSub.id
                                                                }
                                                            >
                                                                {
                                                                    filteredSub.nama
                                                                }
                                                            </span>
                                                        ))}
                                                </Table.Td>
                                            ))}

                                            <Table.Td className="text-end">
                                                {auth.user.role === "admin" && (
                                                    <EditButton
                                                        href={route(
                                                            "alternatif.edit",
                                                            alt
                                                        )}
                                                    >
                                                        Edit
                                                    </EditButton>
                                                )}
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
        </AuthenticatedLayout>
    );
}
