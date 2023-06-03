export default function Guest({ children }) {
    return (
        <div className="bg-slate-100/50 h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <nav className="flex flex-col py-6 sm:flex-row sm:justify-between sm:items-center">
                    <a href="#">
                        <img
                            src="https://img.logoipsum.com/244.svg"
                            alt="Logo"
                            className="w-24"
                        />
                    </a>
                </nav>

                <div className="flex flex-col items-center py-6 lg:h-[36rem] lg:flex-row">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold text-emerald-600 lg:text-4xl">
                            Sistem Pendukung Keputusan Metode TOPSIS
                        </h2>
                        <p className="mt-4 lg:text-lg text-gray-700">
                            Sistem pendukung keputusan (SPK) merupakan sistem
                            yang interaktif berbasis komputer yang dirancang
                            untuk membantu dalam mengambil suatu keputusan.
                            Sistem ini dibuat berdasarkan metode yang digunakan
                            dan menggunakan kombinasi dari berbagai model,
                            teknik analisa dan pengumpulan informasi.
                        </p>
                        <p className="mt-4 lg:text-lg text-gray-700">
                            Metode Technique For Others Refrence By Similarity
                            to Ideal Solution (TOPSIS) adalah metode dengan
                            kategori Multi-Criteria Decision Making (MCDM) yaitu
                            teknik pengambilan keputusan dari beberapa pilihan
                            alternatif yang ada, khususnya MADC.
                        </p>
                    </div>

                    <div className="flex mt-8 w-full lg:w-1/2 lg:justify-end lg:mt-0">
                        <div className="w-full lg:max-w-md bg-white rounded-lg">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
