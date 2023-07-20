import Container, { Board } from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";

export default function Create({ kriteria }) {
    const { data, setData, post, processing, errors } = useForm({
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

    const handleBackButton = (e) => {
        e.preventDefault();
        router.visit(route("alternatif.index"));
    };

    return (
        <AuthenticatedLayout>
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

                                        <SelectInput
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
                                                    value={sub.id}
                                                >
                                                    {sub.nama}
                                                </option>
                                            ))}
                                        </SelectInput>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-end mt-10">
                                <SecondaryButton onClick={handleBackButton}>
                                    Kembali
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
