import SideLink from "@/Components/SideLink";

export default function Sidebar() {
    return (
        <div className="fixed hidden lg:block lg:w-64">
            <div className="flex flex-col md:h-screen bg-transparent py-12 px-6">
                <nav>
                    <SideLink
                        href={route("admin.dashboard")}
                        active={route().current("admin.dashboard")}
                    >
                        <span className="tracking-wide">Dashboard</span>
                    </SideLink>

                    <SideLink
                        href={route("kriteria.index")}
                        active={route().current("kriteria.*")}
                    >
                        <span className="tracking-wide">Kriteria</span>
                    </SideLink>

                    <SideLink
                        href={route("alternatif.index")}
                        active={route().current("alternatif.*")}
                    >
                        <span className="tracking-wide">Alternatif</span>
                    </SideLink>

                    <div className="mt-8 mx-2">
                        <h5 className="font-semibold text-xs text-gray-500">
                            TOPSIS
                        </h5>
                    </div>

                    <SideLink
                        href={route("kriteria.index")}
                        active={route().current("kriteria.*")}
                    >
                        <span className="tracking-wide">
                            Normalisasi Matriks
                        </span>
                    </SideLink>
                    <SideLink
                        href={route("kriteria.index")}
                        active={route().current("kriteria.*")}
                    >
                        <span className="tracking-wide">
                            Normalisasi Matriks Terbobot
                        </span>
                    </SideLink>
                    <SideLink
                        href={route("kriteria.index")}
                        active={route().current("kriteria.*")}
                    >
                        <span className="tracking-wide">Max - Min</span>
                    </SideLink>
                    <SideLink
                        href={route("kriteria.index")}
                        active={route().current("kriteria.*")}
                    >
                        <span className="tracking-wide">Jarak Ideal</span>
                    </SideLink>
                    <SideLink
                        href={route("kriteria.index")}
                        active={route().current("kriteria.*")}
                    >
                        <span className="tracking-wide">Preferensi</span>
                    </SideLink>
                    <SideLink
                        href={route("kriteria.index")}
                        active={route().current("kriteria.*")}
                    >
                        <span className="tracking-wide">Ranking</span>
                    </SideLink>
                </nav>
            </div>
        </div>
    );
}
