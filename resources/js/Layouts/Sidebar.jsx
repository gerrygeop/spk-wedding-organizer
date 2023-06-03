import SideLink from "@/Components/SideLink";

export default function Sidebar() {
    return (
        <div className="bg-white fixed hidden lg:block lg:w-64 border-r">
            <div className="flex flex-col md:h-screen bg-transparent py-6 px-4">
                <div className="flex-shrink-0 flex items-center mx-5 mb-10">
                    <img
                        src="https://img.logoipsum.com/289.svg"
                        alt="Logo"
                        className="w-24"
                    />
                </div>

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

                    <div className="mt-8">
                        <h5 className="font-bold text-xs text-gray-800 tracking-wider uppercase">
                            TOPSIS
                        </h5>
                    </div>

                    <SideLink
                        href={route("normalisasi-matrix")}
                        active={route().current("normalisasi-matrix")}
                    >
                        <span className="tracking-wide">Normalisasi</span>
                    </SideLink>
                    <SideLink
                        href={route("normalisasi-matrix-terbobot")}
                        active={route().current("normalisasi-matrix-terbobot")}
                    >
                        <span className="tracking-wide">
                            Normalisasi Terbobot
                        </span>
                    </SideLink>

                    <SideLink
                        href={route("solusi-ideal")}
                        active={route().current("solusi-ideal")}
                    >
                        <span className="tracking-wide">Solusi Ideal</span>
                    </SideLink>

                    <SideLink
                        href={route("jarak-ideal")}
                        active={route().current("jarak-ideal")}
                    >
                        <span className="tracking-wide">Jarak Ideal</span>
                    </SideLink>

                    <SideLink
                        href={route("preferensi")}
                        active={route().current("preferensi")}
                    >
                        <span className="tracking-wide">Preferensi</span>
                    </SideLink>

                    <SideLink
                        href={route("ranking")}
                        active={route().current("ranking")}
                    >
                        <span className="tracking-wide">Ranking</span>
                    </SideLink>
                </nav>
            </div>
        </div>
    );
}
