export interface MediaPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  mediaType: 'article' | 'documentation' | 'volunteer_story' | 'beneficiary_story' | 'video' | 'report';
  programId?: string; // Optional related program slug or ID
  programName?: string;
  authorName: string;
  authorAvatar?: string;
  coverImage: string;
  galleryImages?: string[];
  videoUrl?: string;
  readTime: number; // in minutes
  isFeatured: boolean;
  publishedAt: string;
  impactMetrics?: { label: string; value: number; unit?: string }[];
  status?: 'draft' | 'published' | 'archived';
}

export const DUMMY_MEDIA: MediaPost[] = [
  {
    id: 'media-1',
    slug: 'jumat-berkah-garut-2026',
    title: 'Jum\'at Berkah Bersama Warga Garut: Tebar Senyum & Hangatkan Hari',
    excerpt: 'Laporan dokumentasi aksi pembagian 200 paket makanan siap saji oleh tim relawan Gerakan Hasan Peduli di Garut.',
    content: `
<p>Hari Jum'at yang cerah di Garut menjadi saksi hangatnya kebersamaan. Tim relawan Gerakan Hasan Peduli menyelenggarakan aksi rutin "Jum'at Berkah" dengan menyusuri area pemukiman padat dan persinggahan pekerja jalanan di Garut Kota.</p>
<br/>
<p>Sebanyak 200 paket makanan siap saji yang bergizi tinggi dibagikan langsung. Penerima manfaat meliputi tukang becak, ojek pangkalan, pemulung, serta jemaah masjid jami di sekitarnya. Terlihat raut wajah bahagia dan senyum haru mengembang dari para penerima manfaat.</p>
<br/>
<blockquote>"Alhamdulillah, nasi kotak hangat ini sangat membantu kami yang seharian belum mendapatkan sewa. Semoga para donatur dilimpahkan keberkahan," tutur Pak Nanang (58), seorang penarik becak lokal.</blockquote>
<br/>
<p>Aksi ini dapat terwujud berkat dedikasi tak kenal lelah dari 15 relawan lokal yang sejak subuh telah membantu menyiapkan hidangan di dapur umum GHP, serta dukungan donasi dari para donatur setia. Terima kasih atas kepedulian Anda.</p>
    `,
    mediaType: 'documentation',
    programId: 'jumat-berkah',
    programName: 'Jum\'at Berkah',
    authorName: 'Tim Humas GHP',
    coverImage: '/images/media/jumat_berkah_garut.png',
    galleryImages: [
      '/images/programs/jumat_berkah.png',
      '/images/programs/santunan_anak_yatim.png'
    ],
    readTime: 3,
    isFeatured: true,
    publishedAt: '2026-06-25T10:00:00Z',
    impactMetrics: [
      { label: 'Paket Makanan Dibagikan', value: 200, unit: 'porsi' },
      { label: 'Relawan Terlibat', value: 15, unit: 'orang' },
      { label: 'Titik Distribusi', value: 3, unit: 'lokasi' }
    ]
  },
  {
    id: 'media-2',
    slug: 'cerita-relawan-kang-asep',
    title: 'Cerita Kang Asep Menjadi Relawan GHP: Panggilan Hati di Tengah Keterbatasan',
    excerpt: 'Kisah inspiratif Kang Asep yang mendedikasikan waktu akhir pekannya untuk mengajar dan menghibur anak-anak yatim binaan.',
    content: `
<p>Menjadi relawan bukan tentang memiliki waktu luang, melainkan tentang meluangkan waktu demi menolong sesama. Prinsip itulah yang dipegang teguh oleh Asep Kurnia (27), atau akrab disapa Kang Asep.</p>
<br/>
<p>Di tengah kesibukannya bekerja sebagai karyawan swasta di Bandung, Kang Asep secara konsisten mendedikasikan hari Sabtunya untuk berkunjung ke yayasan dan membantu mengajar kelas kreativitas serta mengaji untuk anak-anak yatim dhuafa binaan Gerakan Hasan Peduli.</p>
<br/>
<p>"Melihat tawa anak-anak saat belajar menggambar adalah kebahagiaan yang tidak bisa dibeli dengan materi. Di sini saya merasa hidup saya memiliki arti yang nyata bagi orang lain," ungkap Kang Asep dengan mata berbinar.</p>
<br/>
<p>Kang Asep membuktikan bahwa kontribusi sosial tidak harus menunggu mapan secara finansial. Tenaga, senyuman, dan perhatian yang tulus pun merupakan sedekah luar biasa yang sangat berharga bagi tumbuh kembang psikologis anak-anak kita.</p>
    `,
    mediaType: 'volunteer_story',
    programId: 'santunan-anak-yatim',
    programName: 'Santunan Anak Yatim',
    authorName: 'Asep Kurnia',
    coverImage: '/images/media/cerita_relawan_asep.png',
    readTime: 4,
    isFeatured: false,
    publishedAt: '2026-06-20T08:30:00Z',
    impactMetrics: [
      { label: 'Jam Mengajar Disumbangkan', value: 36, unit: 'jam' },
      { label: 'Anak Yatim Didampingi', value: 30, unit: 'anak' }
    ]
  },
  {
    id: 'media-3',
    slug: 'harapan-baru-ibu-siti',
    title: 'Harapan Baru untuk Ibu Siti: Bangkit Bersama Program Hasan Peduli',
    excerpt: 'Cerita penerima manfaat Ibu Siti yang berhasil merenovasi gubuk tuanya yang bocor menjadi hunian yang aman dan hangat.',
    content: `
<p>Bagi Ibu Siti (62), seorang janda lanjut usia di desa kecil Garut, hujan selalu menjadi mimpi buruk. Gubuk bambu peninggalan almarhum suaminya sudah lapuk dimakan usia, dengan atap bocor di hampir setiap sudutnya.</p>
<br/>
<p>"Kalau hujan lebat malam hari, saya terpaksa duduk terjaga di sudut kamar yang tidak terkena air sambil memeluk cucu saya," kenang Ibu Siti perlahan.</p>
<br/>
<p>Melalui laporan warga setempat, tim respon darurat Gerakan Hasan Peduli segera memverifikasi kondisi tersebut. Dalam waktu kurang dari dua minggu, tim bersama para relawan dan masyarakat bergotong-royong merenovasi hunian Ibu Siti menjadi rumah tinggal sederhana yang kokoh, beratap genteng rapat, serta berventilasi udara sehat.</p>
<br/>
<p>Kini, Ibu Siti tidak lagi cemas saat langit mendung. "Terima kasih tak terhingga kepada seluruh donatur Hasan Peduli. Doa saya selalu menyertai kalian semua," ucapnya dengan linangan air mata haru.</p>
    `,
    mediaType: 'beneficiary_story',
    programId: 'bantuan-banjir-garut',
    programName: 'Bantuan Banjir Garut',
    authorName: 'Tim Program GHP',
    coverImage: '/images/media/harapan_ibu_siti.png',
    readTime: 5,
    isFeatured: false,
    publishedAt: '2026-06-18T14:20:00Z',
    impactMetrics: [
      { label: 'Keluarga Berteduh Aman', value: 1, unit: 'keluarga' },
      { label: 'Hari Kerja Bakti', value: 5, unit: 'hari' }
    ]
  },
  {
    id: 'media-4',
    slug: 'menumbuhkan-kepedulian-sosial-sejak-dini',
    title: 'Menumbuhkan Kepedulian Sosial Sejak Usia Dini: Peran Orang Tua',
    excerpt: 'Artikel edukatif mengenai pentingnya mengajarkan nilai empati dan perilaku berbagi kepada anak-anak sejak dini.',
    content: `
<p>Empati bukanlah sifat bawaan lahir yang muncul begitu saja, melainkan sebuah keterampilan emosional yang perlu dipupuk dan dilatih sejak anak-anak usia dini.</p>
<br/>
<p>Di era digital yang serba individualis ini, menumbuhkan jiwa peduli sosial pada anak menjadi tantangan tersendiri bagi orang tua. Langkah awal terkecil bisa dimulai dari rumah, seperti membiasakan anak membagi mainan dengan saudaranya atau menyisihkan sebagian uang saku untuk kotak celengan sosial.</p>
<br/>
<p>Melibatkan anak secara langsung dalam kegiatan berbagi—misalnya menyortir baju layak pakai miliknya untuk didonasikan—akan memberikan pengalaman psikososial yang membekas kuat dalam ingatannya.</p>
<br/>
<p>Dengan membimbing mereka memahami arti syukur dan kepedulian terhadap sesama yang kurang beruntung, kita sedang mempersiapkan generasi masa depan yang berkarakter, peka, dan bertanggung jawab secara sosial.</p>
    `,
    mediaType: 'article',
    authorName: 'Dr. Sarah Amelia',
    coverImage: '/images/media/artikel_peduli_dini.png',
    readTime: 4,
    isFeatured: false,
    publishedAt: '2026-06-15T09:00:00Z'
  },
  {
    id: 'media-5',
    slug: 'video-dokumentasi-ramadhan-berbagi-1448',
    title: 'Video Dokumentasi: Ramadhan Berbagi 1448 H Pelosok Jabar',
    excerpt: 'Rangkuman visual perjalanan tim relawan menyalurkan 500 paket kado lebaran dan sembako di daerah pelosok Jawa Barat.',
    content: `
<p>Bulan Ramadhan adalah momen terindah untuk berbagi kebahagiaan. Video dokumentasi ini merangkum perjalanan haru dan bahagia dari tim relawan Gerakan Hasan Peduli saat mendistribusikan Paket Kado Lebaran dan Iftar Sembako di wilayah-wilayah pelosok Jawa Barat yang sulit dijangkau.</p>
<br/>
<p>Kami mengajak Anda menyaksikan senyum tulus dari anak-anak yatim penerima baju lebaran baru, serta rasa syukur keluarga dhuafa yang menerima kebutuhan pangan menyambut hari raya.</p>
<br/>
<p>Tonton video selengkapnya melalui sematan di bawah ini. Dukungan Anda sangat berarti dalam mewujudkan keberkahan Ramadhan bagi mereka.</p>
    `,
    mediaType: 'video',
    programId: 'ramadhan-berbagi-1448',
    programName: 'Ramadhan Berbagi',
    authorName: 'Tim Kreatif GHP',
    coverImage: '/images/programs/ramadhan_berbagi.png',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Dummy YouTube embed URL
    readTime: 2,
    isFeatured: false,
    publishedAt: '2026-06-10T16:00:00Z',
    impactMetrics: [
      { label: 'Paket Kado Lebaran', value: 500, unit: 'paket' },
      { label: 'Kecamatan Terjangkau', value: 6, unit: 'kecamatan' }
    ]
  },
  {
    id: 'media-6',
    slug: 'laporan-dampak-program-ramadhan-1448',
    title: 'Laporan Dampak Penyaluran Program Ramadhan Berbagi 1448 H',
    excerpt: 'Laporan pertanggungjawaban transparansi penggunaan dana donasi dan dampak penyaluran program Ramadhan Berbagi.',
    content: `
<p>Bentuk akuntabilitas utama Gerakan Hasan Peduli adalah menyajikan laporan penyaluran secara berkala kepada publik dan donatur.</p>
<br/>
<p>Program Ramadhan Berbagi 1448 H telah berhasil menghimpun dan menyalurkan total donasi terkumpul sebesar Rp12.450.000. Dana ini dialokasikan 100% untuk pembelian sembako iftar, mukena baru, sarung, serta paket baju lebaran anak yatim.</p>
<br/>
<p>Dalam laporan formal ini, kami merincikan rincian belanja logistik, wilayah distribusi penyaluran, serta dokumentasi serah terima di lapangan. Laporan terperinci berformat PDF dapat diunduh untuk kenyamanan peninjauan donatur.</p>
    `,
    mediaType: 'report',
    programId: 'ramadhan-berbagi-1448',
    programName: 'Ramadhan Berbagi',
    authorName: 'Tim Audit Keuangan GHP',
    coverImage: '/images/media/laporan_ramadhan.png',
    readTime: 5,
    isFeatured: false,
    publishedAt: '2026-06-05T11:00:00Z',
    impactMetrics: [
      { label: 'Total Donasi Disalurkan', value: 12450000, unit: 'rupiah' },
      { label: 'Kepala Keluarga Terbantu', value: 80, unit: 'KK' }
    ]
  },
  {
    id: 'media-7',
    slug: 'gempa-cianjur-laporan-huntara',
    title: 'Laporan Akhir Program Hunian Sementara Gempa Cianjur',
    excerpt: 'Laporan evaluasi dan serah terima kunci program pembangunan 15 unit hunian sementara (huntara) di Cianjur.',
    content: `
<p>Aksi kemanusiaan pembangunan 15 unit Hunian Sementara (Huntara) bagi korban gempa bumi di pelosok Cianjur telah resmi diselesaikan dan diserahterimakan kepada keluarga penerima manfaat.</p>
<br/>
<p>Laporan ini merangkum proses pengerjaan konstruksi huntara bambu ramah gempa, audit pengeluaran dana sebesar Rp45.000.000, serta kisah ketahanan sosial warga desa dalam masa transisi pascabencana.</p>
<br/>
<p>Kami mengucapkan terima kasih yang tak terhingga kepada para donatur dan relawan pembangunan. Huntara ini kini menjadi pelindung kokoh dan rumah kembali bagi keluarga yang sempat kehilangan segalanya.</p>
    `,
    mediaType: 'report',
    programId: 'gempa-cianjur-response',
    programName: 'Gempa Cianjur Response',
    authorName: 'Tim Respon Darurat GHP',
    coverImage: '/images/programs/gempa_cianjur.png',
    readTime: 4,
    isFeatured: false,
    status: 'archived',
    publishedAt: '2026-04-01T10:00:00Z',
    impactMetrics: [
      { label: 'Huntara Terbangun', value: 15, unit: 'unit' },
      { label: 'Warga Berteduh Aman', value: 75, unit: 'jiwa' }
    ]
  }
];
