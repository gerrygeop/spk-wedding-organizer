import Container, { Board } from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Edit({ alternatif, kriteria }) {
    const { data, setData, patch, processing, errors } = useForm({
        nama: alternatif.nama || "",
        kriteria: {},
    });

    useEffect(() => {
        const defaultKriteria = {};
        for (const ktr of alternatif.kriteria) {
            defaultKriteria[ktr.id] = ktr.pivot.nilai;
        }
        setData({ ...data, kriteria: defaultKriteria });
    }, []);

    const submit = (e) => {
        e.preventDefault();
        const payload = {
            nama: data.nama,
            kriteria: data.kriteria,
        };

        patch(route("alternatif.update", alternatif), payload);
    };

    return (
        <AdminLayout>
            <Container>
                <Board>
                    <div className="max-w-2xl p-6 md:p-8">
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel
                                    htmlFor="nama"
                                    value="Nama Alternatif"
                                />

                                <TextInput
                                    id="nama"
                                    name="nama"
                                    value={data.nama}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                    autoComplete="nama"
                                    isFocused={true}
                                    required
                                />

                                <InputError
                                    message={errors.nama}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-10">
                                <h3 className="text-lg text-gray-800 font-semibold">
                                    Matriks Penilaian --
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
                                {kriteria.map((ktr) => (
                                    <div key={ktr.id} className="col-span-1">
                                        <InputLabel
                                            htmlFor={ktr.nama}
                                            value={ktr.nama}
                                        />

                                        <select
                                            id={ktr.nama}
                                            name={`kriteria.${ktr.id}`}
                                            className="mt-1 block w-full"
                                            value={data.kriteria[ktr.id]}
                                            onChange={(e) =>
                                                setData("kriteria", {
                                                    ...data.kriteria,
                                                    [ktr.id]: e.target.value,
                                                })
                                            }
                                            required
                                        >
                                            <option>--Pilih--</option>
                                            {ktr.sub_kriteria.map((sub) => (
                                                <option
                                                    key={sub.id}
                                                    value={sub.bobot}
                                                >
                                                    {sub.nama}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-end mt-10">
                                <SecondaryButton>
                                    <Link
                                        href={route(
                                            "alternatif.show",
                                            alternatif
                                        )}
                                    >
                                        Batal
                                    </Link>
                                </SecondaryButton>

                                <PrimaryButton
                                    className="ml-4"
                                    disabled={processing}
                                >
                                    Simpan
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </Board>
            </Container>
        </AdminLayout>
    );
}
