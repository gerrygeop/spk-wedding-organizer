import Container, { Board, Section } from "@/Components/Container";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function StepOne({ kriteria, matriks }) {
    return (
        <AuthenticatedLayout>
            <Container>
                <Board>
                    <Section>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-2xl text-gray-600">
                                Normalisasi Matriks
                            </h3>
                        </div>
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th scope="col">Nama</Table.Th>

                                    {kriteria.map((ktr, index) => (
                                        <Table.Th key={index} scope="col">
                                            C{index + 1}
                                        </Table.Th>
                                    ))}
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {matriks.length > 0 ? (
                                    matriks.map((value, key) => (
                                        <tr key={key}>
                                            <Table.Td>
                                                <span className="capitalize text-sm text-gray-900">
                                                    {value.alternatif}
                                                </span>
                                            </Table.Td>

                                            {kriteria.map((ktr, index) => (
                                                <Table.Td key={index}>
                                                    {value.kriteria[ktr.nama]}
                                                </Table.Td>
                                            ))}
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
