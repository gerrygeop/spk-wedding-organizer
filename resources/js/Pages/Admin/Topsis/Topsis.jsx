import Container, { Board, Section } from "@/Components/Container";
import { IconPlus } from "@/Components/IconPlus";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Topsis({ alternatif, kriteria, topsis }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const [filteredData, setFilteredData] = useState({});

    const initialFilteredData = kriteria.reduce((acc, curr) => {
        acc[curr.nama.toLowerCase()] = "";
        return acc;
    }, {});

    console.log(initialFilteredData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilteredData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleOnSearch = () => {
        router.post(route("topsis"), filteredData, {
            replace: true,
            preserveScroll: true,
        });
    };

    const confirmUserDeletion = (e) => {
        e.preventDefault();
        setConfirmingUserDeletion(true);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
    };

    return (
        <AuthenticatedLayout>
            <Container>
                <div className="flex flex-col gap-y-6">
                    <Board>
                        <Section>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-2xl text-gray-700">
                                    Daftar Alternatif
                                </h3>

                                <PrimaryButton
                                    onClick={(e) => confirmUserDeletion(e)}
                                    type="button"
                                    className="pl-2.5"
                                >
                                    <IconPlus className="w-5 h-5 mr-1.5" />
                                    Cari Rekomendasi
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
                                    </tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {alternatif.length > 0 ? (
                                        alternatif.map((alt) => (
                                            <tr key={alt.id}>
                                                <Table.Td>
                                                    <span className="capitalize text-sm text-gray-900 font-semibold">
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
                                                                    sub.bobot ===
                                                                    ktr.pivot
                                                                        .nilai
                                                            )
                                                            .map(
                                                                (
                                                                    filteredSub
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            filteredSub.id
                                                                        }
                                                                    >
                                                                        {
                                                                            filteredSub.nama
                                                                        }
                                                                    </span>
                                                                )
                                                            )}
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

                    <Board>
                        <Section>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-2xl text-gray-700">
                                    Matriks Keputusan
                                </h3>
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
                                    </tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {alternatif.length > 1 ? (
                                        alternatif.map((alt) => (
                                            <tr key={alt.id}>
                                                <Table.Td>
                                                    <span className="capitalize text-sm text-gray-900 font-semibold">
                                                        {alt.nama}
                                                    </span>
                                                </Table.Td>

                                                {alt.kriteria.map((ktr) => (
                                                    <Table.Td
                                                        key={ktr.id}
                                                        className="text-sm"
                                                    >
                                                        {ktr.pivot.nilai}
                                                    </Table.Td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <Table.Td colSpan="6">
                                                <p className="text-gray-500 text-center italic">
                                                    {alternatif.length < 2
                                                        ? "Hanya terdapat 1 data"
                                                        : "Tidak ada alternatif"}
                                                </p>
                                            </Table.Td>
                                        </tr>
                                    )}
                                </Table.Tbody>
                            </Table>
                        </Section>
                    </Board>

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
                                    {topsis.normalisasi.length > 0 ? (
                                        topsis.normalisasi.map((value, key) => (
                                            <tr key={key}>
                                                <Table.Td>
                                                    <span className="capitalize text-sm text-gray-900 font-semibold">
                                                        {value.alternatif}
                                                    </span>
                                                </Table.Td>

                                                {kriteria.map((ktr, index) => (
                                                    <Table.Td key={index}>
                                                        {
                                                            value.kriteria[
                                                                ktr.nama
                                                            ]
                                                        }
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

                    <Board>
                        <Section>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-2xl text-gray-600">
                                    Normalisasi Matriks Terbobot
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
                                    {topsis.normalisasiTerbobot.length > 0 ? (
                                        topsis.normalisasiTerbobot.map(
                                            (value, key) => (
                                                <tr key={key}>
                                                    <Table.Td>
                                                        <span className="capitalize text-sm text-gray-900 font-semibold">
                                                            {value.alternatif}
                                                        </span>
                                                    </Table.Td>

                                                    {kriteria.map(
                                                        (ktr, index) => (
                                                            <Table.Td
                                                                key={index}
                                                            >
                                                                {
                                                                    value
                                                                        .kriteria[
                                                                        ktr.nama
                                                                    ]
                                                                }
                                                            </Table.Td>
                                                        )
                                                    )}
                                                </tr>
                                            )
                                        )
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

                    <Board>
                        <Section>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-2xl text-gray-600">
                                    Solusi Ideal Positif &#40;A<sup>&#43;</sup>
                                    &#41; & Negatif &#40;A<sup>&#45;</sup>&#41;
                                </h3>
                            </div>
                            <Table>
                                <Table.Thead>
                                    <tr>
                                        <Table.Th scope="col"></Table.Th>

                                        {kriteria.map((ktr, index) => (
                                            <Table.Th key={index} scope="col">
                                                C{index + 1}
                                            </Table.Th>
                                        ))}
                                    </tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {topsis.solusiIdeal.length > 0 ? (
                                        topsis.solusiIdeal.map((value, key) => (
                                            <tr key={key}>
                                                <Table.Td>
                                                    <span className="capitalize font-semibold text-gray-900">
                                                        {value.type}
                                                    </span>
                                                </Table.Td>

                                                {kriteria.map((ktr, index) => (
                                                    <Table.Td key={index}>
                                                        {
                                                            value.kriteria[
                                                                ktr.nama
                                                            ]
                                                        }
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
                                        <Table.Th scope="col">
                                            Alternatif
                                        </Table.Th>
                                        <Table.Th scope="col">Jarak+</Table.Th>
                                        <Table.Th scope="col">Jarak-</Table.Th>
                                    </tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {topsis.jarakIdeal.length > 0 ? (
                                        topsis.jarakIdeal.map((value, key) => (
                                            <tr key={key}>
                                                <Table.Td>
                                                    <span className="capitalize text-sm text-gray-900 font-semibold">
                                                        {value.alternatif}
                                                    </span>
                                                </Table.Td>
                                                <Table.Td>
                                                    {value.positif}
                                                </Table.Td>
                                                <Table.Td>
                                                    {value.negatif}
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

                    <Board>
                        <Section>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-2xl text-gray-600">
                                    Preferensi
                                </h3>
                            </div>
                            <Table>
                                <Table.Thead>
                                    <tr>
                                        <Table.Th scope="col">
                                            Alternatif
                                        </Table.Th>
                                        <Table.Th scope="col">
                                            Preferensi
                                        </Table.Th>
                                    </tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {topsis.preferensi.length > 0 ? (
                                        topsis.preferensi.map((value, key) => (
                                            <tr key={key}>
                                                <Table.Td>
                                                    <span className="capitalize text-sm text-gray-900 font-semibold">
                                                        {value.alternatif}
                                                    </span>
                                                </Table.Td>
                                                <Table.Td>
                                                    {value.hasil}
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

                    <Board>
                        <Section>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-2xl text-gray-600">
                                    Hasil Ranking
                                </h3>
                            </div>
                            <Table>
                                <Table.Thead>
                                    <tr>
                                        <Table.Th scope="col">
                                            Alternatif
                                        </Table.Th>
                                        <Table.Th scope="col">
                                            Preferensi
                                        </Table.Th>
                                        <Table.Th scope="col">Rank</Table.Th>
                                    </tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {topsis.ranking.length > 0 ? (
                                        topsis.ranking.map((value, index) => (
                                            <tr key={index}>
                                                <Table.Td>
                                                    <span className="capitalize text-sm text-gray-900 font-semibold">
                                                        {value.alternatif}
                                                    </span>
                                                </Table.Td>
                                                <Table.Td>
                                                    {value.hasil}
                                                </Table.Td>
                                                <Table.Td>{index + 1}</Table.Td>
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
                </div>
            </Container>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={handleOnSearch} className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
                        {kriteria.map((ktr) => (
                            <div key={ktr.id} className="col-span-1">
                                <InputLabel
                                    htmlFor={ktr.nama}
                                    value={ktr.nama}
                                />

                                <SelectInput
                                    id={ktr.nama.toLowerCase()}
                                    name={ktr.nama.toLowerCase()}
                                    className="mt-1 block w-full"
                                    value={filteredData[ktr.nama.toLowerCase()]}
                                    onChange={handleChange}
                                >
                                    <option value="">--Pilih--</option>
                                    {ktr.sub_kriteria.map((sub) => (
                                        <option key={sub.id} value={sub.id}>
                                            {sub.nama}
                                        </option>
                                    ))}
                                </SelectInput>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex justify-between">
                        <SecondaryButton onClick={closeModal}>
                            Batal
                        </SecondaryButton>

                        <PrimaryButton>Simpan</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
