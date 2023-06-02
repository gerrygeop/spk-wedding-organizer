import Container, { Board, Section } from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function Create({ alternatif, kriteria }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        kriteria: {},
    });

    const submit = (e) => {
        e.preventDefault();
        const payload = {
            nama: data.nama,
            kriteria: data.kriteria,
        };

        post(route("alternatif.store"), payload);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Alternatif
                </h2>
            }
        >
            <Head title="Alternatif" />

            <Container>
                <Board>
                    <div className="max-w-2xl p-6 md:p-8">
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="nama" value="Nama" />

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

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
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
                                    <Link href={route("alternatif.index")}>
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
        </AuthenticatedLayout>
    );
}
