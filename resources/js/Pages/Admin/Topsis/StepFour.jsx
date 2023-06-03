import Container, { Board, Section } from "@/Components/Container";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function StepFour({ data }) {
    return (
        <AuthenticatedLayout>
            <Container>
                <Board>
                    <Section>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-2xl text-gray-600">
                                Jarak Ideal Positif &#40;S<sub>i</sub>
                                <sup>&#43;</sup>&#41; & Negatif &#40;S
                                <sub>i</sub>
                                <sup>&#45;</sup>&#41;
                            </h3>
                        </div>
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th scope="col">Alternatif</Table.Th>
                                    <Table.Th scope="col">Jarak+</Table.Th>
                                    <Table.Th scope="col">Jarak-</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {data.length > 0 ? (
                                    data.map((value, key) => (
                                        <tr key={key}>
                                            <Table.Td>
                                                <span className="capitalize text-sm text-gray-900">
                                                    {value.alternatif}
                                                </span>
                                            </Table.Td>
                                            <Table.Td>{value.positif}</Table.Td>
                                            <Table.Td>{value.negatif}</Table.Td>
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
