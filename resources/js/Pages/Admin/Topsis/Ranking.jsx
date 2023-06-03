import Container, { Board, Section } from "@/Components/Container";
import Table from "@/Components/Table";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Ranking({ data }) {
    return (
        <AdminLayout>
            <Container>
                <Board>
                    <Section>
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th scope="col">Alternatif</Table.Th>
                                    <Table.Th scope="col">Preferensi</Table.Th>
                                    <Table.Th scope="col">Rank</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {data.length > 0 ? (
                                    data.map((value, index) => (
                                        <tr key={index}>
                                            <Table.Td>
                                                <span className="capitalize text-sm text-gray-900">
                                                    {value.alternatif}
                                                </span>
                                            </Table.Td>
                                            <Table.Td>{value.hasil}</Table.Td>
                                            <Table.Td>{index + 1}</Table.Td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <Table.Td colSpan="6">
                                            <p className="text-gray-500 text-center italic">
                                                Tidak ada data
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
