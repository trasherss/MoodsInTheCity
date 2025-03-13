const storyData = {
    start: {
        title: "Perpustakaan Pengetahuan",
        text: "Selamat datang di Perpustakaan Pengetahuan! Di sini tersimpan berbagai rahasia ilmu pengetahuan dari seluruh dunia. Kamu memiliki kesempatan untuk menjelajahi berbagai bidang pengetahuan yang menarik.",
        image: "images/library.jpeg",
        choices: [
            {
                text: "Jelajahi Laboratorium Sains",
                description: "Pelajari rahasia alam semesta melalui eksperimen sains yang menakjubkan",
                image: "images/sciencePath.jpeg",
                nextScene: "sciencePath"
            },
            {
                text: "Kunjungi Galeri Sejarah",
                description: "Temukan kebijaksanaan masa lalu melalui artefak dan peninggalan bersejarah",
                image: "images/history.jpeg",
                nextScene: "historyPath"
            }
        ]
    },
    sciencePath: {
        title: "Laboratorium Sains",
        text: "Di Laboratorium Sains, kamu menemukan dua area penelitian yang menarik. Area pertama adalah Laboratorium Biokimia yang mempelajari fenomena bioluminesensi - bagaimana makhluk hidup dapat menghasilkan cahaya. Area kedua adalah Laboratorium Fisika yang meneliti tentang kemagnetan dan medan elektromagnetik bumi.",
        image: "images/lab.jpeg",
        choices: [
            {
                text: "Teliti Bioluminesensi",
                description: "Pelajari bagaimana kunang-kunang dan organisme laut dalam menghasilkan cahaya sendiri",
                image: "images/bioluminescence.jpeg",
                nextScene: "bioluminescentLab"
            },
            {
                text: "Pelajari Elektromagnetisme",
                description: "Pahami medan magnet bumi dan apa pengaruhnya terhadap kehidupan di planet yang kita tinggali",
                image: "images/magnetism.jpeg",
                nextScene: "magnetismLab"
            }
        ]
    },
    historyPath: {
        title: "Galeri Sejarah",
        text: "Galeri Sejarah menyimpan dua koleksi menakjubkan: Artefak Matematika Maya yang mengungkap sistem perhitungan canggih peradaban kuno, dan Observatorium Kuno yang menunjukkan pemahaman mendalam nenek moyang kita tentang astronomi.",
        image: "images/history-gallery.jpeg",
        choices: [
            {
                text: "Matematika Maya Kuno",
                description: "Pelajari sistem bilangan Maya kuno dan bagaimana kontribusinya pada matematika modern",
                image: "images/maya-math.jpeg",
                nextScene: "mayaMathematics"
            },
            {
                text: "Observatorium Kuno",
                description: "Temukan bagaimana peradaban kuno mengamati dan memprediksi fenomena langit",
                image: "images/ancient-observatory.jpeg",
                nextScene: "ancientAstronomy"
            }
        ]
    },
    bioluminescentLab: {
        title: "Laboratorium Bioluminesensi",
        text: "Di laboratorium ini, kamu mempelajari proses menakjubkan bioluminesensi. Tahukah kamu bahwa 76% organisme laut dalam dapat menghasilkan cahaya sendiri? Reaksi kimia antara enzim luciferase dan substrat luciferin menghasilkan cahaya dingin yang efisien. Ini adalah teknologi yang sangat menjanjikan untuk pencahayaan ramah lingkungan masa depan!",
        image: "images/bioluminescence-lab.jpeg",
        choices: [
            {
                text: "Aplikasi Medis bioluminesensi",
                description: "Pelajari penggunaan bioluminesensi dalam diagnosis medis dan penelitian kanker",
                image: "images/medical-research.jpeg",
                nextScene: "medicalApplications"
            },
            {
                text: "Teknologi Pencahayaan",
                description: "Teliti potensi bioluminesensi untuk pencahayaan ramah lingkungan",
                image: "images/eco-lighting.jpeg",
                nextScene: "sustainableLighting"
            }
        ]
    },
    magnetismLab: {
        title: "Laboratorium Elektromagnetisme",
        text: "Medan magnet bumi adalah pelindung vital yang melindungi kita dari radiasi berbahaya dari ruang angkasa. Di sini kamu mempelajari bagaimana kompas bekerja dan mengapa kutub magnet bumi sebenarnya bergeser setiap tahun. Bahkan beberapa hewan seperti burung dan penyu laut menggunakan medan magnet bumi untuk navigasi!",
        image: "images/magnetism-lab.jpeg",
        choices: [
            {
                text: "Navigasi Hewan",
                description: "Pelajari bagaimana hewan menggunakan magnetoresepsi untuk navigasi",
                image: "images/animal-navigation.jpeg",
                nextScene: "animalNavigation"
            },
            {
                text: "Teknologi Kompas",
                description: "Teliti evolusi teknologi navigasi dari kompas kuno hingga teknologi GPS",
                image: "images/navigation-tech.jpeg",
                nextScene: "navigationTechnology"
            }
        ]
    },
    mayaMathematics: {
        title: "Matematika Maya",
        text: "Sistem bilangan Maya adalah salah satu yang paling canggih di dunia kuno. Mereka menggunakan sistem basis-20 dan menemukan konsep angka nol secara independen! Sistem penghitungan mereka memungkinkan perhitungan astronomi yang sangat akurat dan pembangunan struktur arsitektur yang presisi.",
        image: "images/maya-math.jpeg",
        choices: [
            {
                text: "Kalender Maya",
                description: "Pelajari sistem kalender Maya yang sangat akurat dalam memprediksi fenomena astronomi",
                image: "images/maya-calendar.jpeg",
                nextScene: "mayaCalendar"
            },
            {
                text: "Arsitektur Maya",
                description: "Teliti bagaimana matematika Maya digunakan dalam arsitektur dan konstruksi",
                image: "images/maya-architecture.jpeg",
                nextScene: "mayaArchitecture"
            }
        ]
    },
    ancientAstronomy: {
        title: "Observatorium Kuno",
        text: "Peradaban kuno memiliki pemahaman mendalam tentang astronomi. Mereka dapat memprediksi gerhana, mengukur panjang tahun dengan akurat, dan menggunakan bintang untuk navigasi. Observatorium kuno ini menunjukkan bagaimana mereka mengamati dan mencatat pergerakan benda-benda langit dengan presisi mengagumkan.",
        image: "images/ancient-observatory.jpeg",
        choices: [
            {
                text: "Prediksi Gerhana",
                description: "Pelajari metode kuno dalam memprediksi gerhana matahari dan bulan",
                image: "images/clipse-prediction.jpeg",
                nextScene: "eclipsePrediction"
            },
            {
                text: "Navigasi Bintang",
                description: "Teliti bagaimana Para Pelaut kuno menggunakan bintang untuk navigasi",
                image: "images/star-navigation.jpeg",
                nextScene: "starNavigation"
            }
        ]
    },
    medicalApplications: {
        title: "Aplikasi Medis Bioluminesensi",
        text: "Bioluminesensi telah revolusioner dalam penelitian medis! Protein bercahaya GFP (Green Fluorescent Protein) digunakan untuk melacak penyebaran kanker dan efektivitas obat. Teknologi ini telah membantu mengembangkan pengobatan yang lebih efektif dan menyelamatkan jutaan nyawa.",
        image: "images/medical-bioluminescence.jpeg",
        choices: [
            {
                text: "Kembali ke Awal",
                description: "Mulai petualangan baru dan pelajari lebih banyak hal",
                image: "images/restart.jpeg",
                nextScene: "start"
            }
        ]
    },
    sustainableLighting: {
        title: "Pencahayaan Masa Depan",
        text: "Bayangkan pohon yang bercahaya menggantikan lampu jalan! Penelitian bioluminesensi telah menginspirasi pengembangan tanaman yang dapat menghasilkan cahaya sendiri. Teknologi ini berpotensi menghemat energi dan mengurangi polusi cahaya di kota-kota masa depan.",
        image: "images/future-lighting.jpeg",
        choices: [
            {
                text: "Kembali ke Awal",
                description: "Mulai petualangan baru dan pelajari lebih banyak hal",
                image: "images/restart.jpeg",
                nextScene: "start"
            }
        ]
    },
    animalNavigation: {
        title: "Navigasi Magnetik Hewan",
        text: "Sungguh menakjubkan bagaimana hewan dapat merasakan medan magnet bumi! Burung, penyu laut, dan bahkan beberapa serangga memiliki 'kompas internal' yang membantu mereka bermigrasi ribuan kilometer dengan akurat. Para ilmuwan telah menemukan bahwa ini disebabkan oleh protein khusus yang sensitif terhadap medan magnet.",
        image: "images/animal-magnetic-navigation.jpeg",
        choices: [
            {
                text: "Kembali ke Awal",
                description: "Mulai petualangan baru dan pelajari lebih banyak hal",
                image: "images/restart.jpeg",
                nextScene: "start"
            }
        ]
    },
    navigationTechnology: {
        title: "Evolusi Teknologi Navigasi",
        text: "Dari kompas kuno hingga GPS modern, teknologi navigasi telah berkembang pesat! Kompas pertama ditemukan di Tiongkok lebih dari 2000 tahun lalu. Saat ini, sistem GPS menggunakan 24 satelit untuk memberikan lokasi akurat hingga beberapa meter. Namun tahukah kamu? Kompas masih penting sebagai cadangan ketika teknologi modern gagal.",
        image: "images/navigation-evolution.jpeg",
        choices: [
            {
                text: "Kembali ke Awal",
                description: "Mulai petualangan baru dan pelajari lebih banyak hal",
                image: "images/restart.jpeg",
                nextScene: "start"
            }
        ]
    },
    mayaCalendar: {
        title: "Kalender Maya",
        text: "Kalender Maya adalah salah satu sistem penanggalan paling akurat dalam sejarah! Mereka menggunakan tiga kalender yang berbeda: Tzolkin (260 hari), Haab (365 hari), dan Long Count yang dapat menghitung waktu hingga jutaan tahun. Perhitungan mereka tentang tahun matahari hanya berbeda 19 detik dari perhitungan modern!",
        image: "images/maya-calendar-detail.jpeg",
        choices: [
            {
                text: "Kembali ke Awal",
                description: "Mulai petualangan baru dan pelajari lebih banyak hal",
                image: "images/restart.jpeg",
                nextScene: "start"
            }
        ]
    },
    mayaArchitecture: {
        title: "Arsitektur Maya",
        text: "Bangunan Maya adalah bukti kecanggihan matematika mereka! Piramid El Castillo di Chichen Itza memiliki total 365 anak tangga, sesuai dengan jumlah hari dalam setahun. Setiap equinox, bayangan matahari menciptakan ilusi ular yang merayap turun tangga - sebuah perhitungan astronomis dan arsitektur yang luar biasa!",
        image: "images/maya-architecture-detail.jpeg",
        choices: [
            {
                text: "Kembali ke Awal",
                description: "Mulai petualangan baru dan pelajari lebih banyak hal",
                image: "images/restart.jpeg",
                nextScene: "start"
            }
        ]
    },
    eclipsePrediction: {
        title: "Prediksi Gerhana Kuno",
        text: "Peradaban kuno dapat memprediksi gerhana dengan akurasi mengagumkan! Bangsa Babilonia menemukan siklus Saros - periode 18 tahun di mana gerhana berulang dengan pola yang sama. Pengetahuan ini menyebar ke berbagai peradaban dan masih relevan dalam astronomi modern.",
        image: "images/ancient-eclipse-prediction.jpeg",
        choices: [
            {
                text: "Kembali ke Awal",
                description: "Mulai petualangan baru dan pelajari lebih banyak hal",
                image: "images/restart.jpeg",
                nextScene: "start"
            }
        ]
    },
    starNavigation: {
        title: "Navigasi Bintang",
        text: "Selama ribuan tahun, pelaut menggunakan bintang sebagai panduan! Mereka mengembangkan alat seperti astrolabe dan sextant untuk mengukur posisi bintang dan menentukan lokasi mereka di laut. Bintang Polaris, yang hampir tidak bergerak di langit utara, menjadi panduan paling penting dalam navigasi kuno.",
        image: "images/star-navigation-ancient.jpeg",
        choices: [
            {
                text: "Kembali ke Awal",
                description: "Mulai petualangan baru dan pelajari lebih banyak hal",
                image: "images/restart.jpeg",
                nextScene: "start"
            }
        ]
    }
};

// Export story object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = storyData;
} 