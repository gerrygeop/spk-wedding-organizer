import Container, { Board, Section } from "@/Components/Container";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Show({ alternatif }) {
    const { delete: destroy, processing } = useForm({});
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const editAlternatif = () => {
        router.visit(route("alternatif.edit", alternatif));
    };

    const deleteAlternatif = (e) => {
        e.preventDefault();
        destroy(route("alternatif.destroy", alternatif));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {alternatif.nama}
                </h2>
            }
        >
            <Head title="Alternatif" />

            <Container>
                <Board>
                    <Section>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-lg text-gray-800">
                                Detail Alternatif
                            </h3>
                            <div className="flex items-center gap-x-2">
                                <PrimaryButton
                                    type="button"
                                    onClick={editAlternatif}
                                >
                                    Edit
                                </PrimaryButton>
                                <DangerButton
                                    type="button"
                                    onClick={() =>
                                        setConfirmingUserDeletion(true)
                                    }
                                >
                                    Hapus
                                </DangerButton>
                            </div>
                        </div>
                        <div className="border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-semibold leading-6 text-gray-600">
                                        Nama Alternatif
                                    </dt>
                                    <dd className="mt-1 leading-6 font-semibold text-lg text-gray-800 sm:col-span-3 sm:mt-0">
                                        {alternatif.nama}
                                    </dd>
                                </div>

                                <div className="px-4 pb-6 pt-12 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                    <dt className="text-lg font-semibold leading-6 text-gray-800">
                                        Kriteria
                                    </dt>
                                </div>

                                {alternatif.kriteria.map((ktr, i) => (
                                    <div
                                        key={ktr.id}
                                        className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0"
                                    >
                                        <dt className="text-sm font-semibold leading-6 text-gray-600">
                                            {ktr.nama}
                                        </dt>
                                        <dd className="mt-1 leading-6 font-medium text-lg text-gray-800 sm:col-span-3 sm:mt-0">
                                            {ktr.sub_kriteria
                                                .filter(
                                                    (sub) =>
                                                        sub.bobot ===
                                                        ktr.pivot.nilai
                                                )
                                                .map((filteredSub) => (
                                                    <span key={filteredSub.id}>
                                                        {filteredSub.nama}
                                                    </span>
                                                ))}
                                            {" || "}
                                            Bobot: {ktr.pivot.nilai}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </Section>
                </Board>
            </Container>

            <Modal
                show={confirmingUserDeletion}
                onClose={() => setConfirmingUserDeletion(false)}
            >
                <form onSubmit={deleteAlternatif} className="p-6">
                    <h2 className="text-center text-lg font-medium text-gray-700">
                        Yakin untuk menghapus Alternatif{" "}
                        <span className="font-semibold text-gray-900">
                            {alternatif.nama}
                        </span>
                    </h2>

                    <div className="mt-10 flex justify-between">
                        <SecondaryButton
                            onClick={() => setConfirmingUserDeletion(false)}
                        >
                            Batal
                        </SecondaryButton>

                        <DangerButton disabled={processing}>
                            Hapus Alternatif
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
