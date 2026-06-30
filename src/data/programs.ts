export interface ImpactMetric {
  label: string;
  value: number;
  unit?: string;
}

export interface DonorEntry {
  name: string;
  amount: number;
  isAnonymous: boolean;
  donatedAt: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  programType: 'core' | 'seasonal' | 'emergency' | 'community';
  displayCategory: string;
  status: 'active' | 'completed' | 'suspended' | 'archived';
  bannerImage: string;
  targetAmount: number;
  currentAmount: number;
  targetUnit: string; // 'IDR', 'mushaf', 'paket', etc.
  customProgressLabel?: string;
  beneficiariesCount: number;
  checkoutUrl: string;
  showDonorList: boolean;
  isFeatured: boolean;
  impactMetrics: ImpactMetric[];
  donors: DonorEntry[];
  startDate?: string;
  endDate?: string;
}

export const DUMMY_PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    slug: 'santunan-anak-yatim',
    title: 'Santunan Anak Yatim & Dhuafa',
    shortDescription: 'Ikhtiar berkelanjutan memberikan beasiswa pendidikan dan santunan kebutuhan hidup untuk anak-anak yatim.',
    description: `
<p>Program Santunan Anak Yatim & Dhuafa adalah salah satu pilar utama Gerakan Hasan Peduli. Kami percaya bahwa setiap anak berhak mendapatkan masa depan yang cerah, pendidikan yang layak, dan kasih sayang yang utuh.</p>
<br/>
<p>Melalui program ini, kami menyalurkan bantuan bulanan berupa biaya sekolah, perlengkapan belajar, serta pemenuhan gizi dan makanan pokok. Bantuan ini ditujukan kepada anak-anak yatim piatu dan dhuafa yang berada di wilayah pelosok Jawa Barat.</p>
<br/>
<p>Mari bergabung bersama kami menjadi jembatan kebaikan bagi mereka. Setiap santunan yang Anda titipkan tidak hanya membantu meringankan beban hidup mereka, tetapi juga menumbuhkan asa dan cita-cita generasi masa depan bangsa.</p>
    `,
    programType: 'core',
    displayCategory: 'Santunan Yatim',
    status: 'active',
    bannerImage: '/images/programs/santunan_anak_yatim.png',
    targetAmount: 25000000,
    currentAmount: 17500000,
    targetUnit: 'IDR',
    customProgressLabel: 'terkumpul untuk beasiswa bulanan',
    beneficiariesCount: 120,
    checkoutUrl: 'https://lynk.id/ghp/santunan-yatim',
    showDonorList: true,
    isFeatured: true,
    impactMetrics: [
      { label: 'Anak Yatim Terbantu', value: 120, unit: 'anak' },
      { label: 'Sekolah Terjangkau', value: 12, unit: 'wilayah' },
      { label: 'Penyaluran Rutin', value: 6, unit: 'bulan terakhir' }
    ],
    donors: [
      { name: 'Ahmad Sofyan', amount: 500000, isAnonymous: false, donatedAt: '2026-06-28T10:30:00Z' },
      { name: 'Hamba Allah', amount: 250000, isAnonymous: true, donatedAt: '2026-06-28T15:45:00Z' },
      { name: 'Siti Rahmawati', amount: 1000000, isAnonymous: false, donatedAt: '2026-06-27T08:12:00Z' },
      { name: 'Anonim', amount: 150000, isAnonymous: true, donatedAt: '2026-06-26T19:20:00Z' },
      { name: 'Budi Hartono', amount: 300000, isAnonymous: false, donatedAt: '2026-06-25T11:05:00Z' }
    ]
  },
  {
    id: 'prog-2',
    slug: 'tebar-quran-nusantara',
    title: 'Tebar Qur\'an Nusantara',
    shortDescription: 'Distribusi mushaf Al-Qur\'an layak pakai untuk santri di pelosok desa, masjid jami, dan rumah tahfidz.',
    description: `
<p>Program Tebar Qur'an Nusantara lahir dari kenyataan bahwa masih banyak masjid, mushola, dan pondok pesantren di pelosok nusantara yang kekurangan mushaf Al-Qur'an. Banyak santri harus bergantian menggunakan lembaran Qur'an yang sudah usang dan robek.</p>
<br/>
<p>Kami berkomitmen untuk mendistribusikan mushaf Al-Qur'an baru dan terjemahan ke berbagai daerah tertinggal, terdepan, dan terluar (3T). Bantuan difokuskan pada rumah tahfidz, pesantren rakyat, dan majelis taklim di pedesaan.</p>
<br/>
<p>Dengan wakaf Qur'an ini, Anda ikut mengalirkan pahala jariyah yang tidak terputus. Setiap huruf yang dibaca dan dihafalkan oleh para santri akan menjadi saksi kebaikan kita di akhirat kelak.</p>
    `,
    programType: 'core',
    displayCategory: 'Wakaf Qur\'an',
    status: 'active',
    bannerImage: '/images/programs/tebar_quran.png',
    targetAmount: 1000,
    currentAmount: 650,
    targetUnit: 'mushaf',
    customProgressLabel: 'mushaf Al-Qur\'an diwakafkan',
    beneficiariesCount: 650,
    checkoutUrl: 'https://lynk.id/ghp/tebar-quran',
    showDonorList: true,
    isFeatured: true,
    impactMetrics: [
      { label: 'Mushaf Tersalurkan', value: 650, unit: 'mushaf' },
      { label: 'Pesantren Penerima', value: 18, unit: 'lembaga' },
      { label: 'Kabupaten Terjangkau', value: 4, unit: 'kabupaten' }
    ],
    donors: [
      { name: 'Diana Lestari', amount: 50, isAnonymous: false, donatedAt: '2026-06-29T09:00:00Z' },
      { name: 'Hamba Allah', amount: 10, isAnonymous: true, donatedAt: '2026-06-28T14:30:00Z' },
      { name: 'Irfan Hakim', amount: 100, isAnonymous: false, donatedAt: '2026-06-27T16:22:00Z' },
      { name: 'Yayasan Amal', amount: 200, isAnonymous: false, donatedAt: '2026-06-25T10:00:00Z' }
    ]
  },
  {
    id: 'prog-3',
    slug: 'jumat-berkah',
    title: 'Gerakan Jum\'at Berkah',
    shortDescription: 'Berbagi makanan siap saji untuk jamaah shalat Jum\'at, pekerja harian, pemulung, dan dhuafa jalanan.',
    description: `
<p>Setiap hari Jum'at, relawan Gerakan Hasan Peduli turun ke jalan dan mendatangi masjid-masjid pinggiran kota untuk membagikan paket nasi siap saji yang bergizi.</p>
<br/>
<p>Sasaran utama program ini adalah pekerja harian, ojek online, petugas kebersihan, pemulung, serta jemaah masjid dari golongan pra-sejahtera. Program ini bertujuan menghadirkan keceriaan dan mempererat tali silaturahmi antarsesama di hari yang mulia.</p>
<br/>
<p>Mari luaskan keberkahan hari Jum'at Anda. Dengan berbagi sepiring nasi hangat, Anda telah memberikan energi bagi mereka yang berjuang di jalanan mencari nafkah halal.</p>
    `,
    programType: 'core',
    displayCategory: 'Jum\'at Berkah',
    status: 'active',
    bannerImage: '/images/programs/jumat_berkah.png',
    targetAmount: 500,
    currentAmount: 320,
    targetUnit: 'paket makanan',
    customProgressLabel: 'paket makanan siap saji dibagikan',
    beneficiariesCount: 320,
    checkoutUrl: 'https://lynk.id/ghp/jumat-berkah',
    showDonorList: false,
    isFeatured: false,
    impactMetrics: [
      { label: 'Paket Makanan', value: 320, unit: 'porsi' },
      { label: 'Masjid Sasaran', value: 5, unit: 'lokasi' },
      { label: 'Pekerja Terbantu', value: 180, unit: 'jiwa' }
    ],
    donors: []
  },
  {
    id: 'prog-4',
    slug: 'sahabat-gerakan-hasan-peduli',
    title: 'Sahabat Gerakan Hasan Peduli (Donatur Rutin)',
    shortDescription: 'Program keanggotaan donatur rutin untuk menjaga kelangsungan berbagai aksi sosial GHP secara berkelanjutan.',
    description: `
<p>Sahabat Gerakan Hasan Peduli adalah komunitas donatur rutin berkomitmen tinggi yang menjadi tulang punggung seluruh gerakan sosial Gerakan Hasan Peduli.</p>
<br/>
<p>Melalui donasi bulanan yang terencana, kami dapat merespons cepat kebutuhan darurat masyarakat tanpa kendala likuiditas dana, serta menjamin kelangsungan beasiswa yatim bulanan secara konsisten.</p>
<br/>
<p>Jadilah bagian dari penyokong pilar kebaikan ini. Anda dapat memilih paket donasi rutin bulanan yang sesuai dengan kelapangan Anda, mulai dari Rp50.000, Rp100.000, hingga Rp250.000 per bulan.</p>
    `,
    programType: 'community',
    displayCategory: 'Donatur Rutin',
    status: 'active',
    bannerImage: '/images/programs/sahabat_hasan_peduli.png',
    targetAmount: 300,
    currentAmount: 105,
    targetUnit: 'donatur aktif',
    customProgressLabel: 'donatur rutin tergabung',
    beneficiariesCount: 105,
    checkoutUrl: 'https://lynk.id/ghp/sahabat-gerakan-hasan-peduli',
    showDonorList: true,
    isFeatured: true,
    impactMetrics: [
      { label: 'Donatur Rutin', value: 105, unit: 'donatur' },
      { label: 'Kestabilan Program', value: 90, unit: '%' },
      { label: 'Dana Cadangan Darurat', value: 15, unit: 'juta rupiah' }
    ],
    donors: [
      { name: 'Dr. Hendra Wijaya', amount: 250000, isAnonymous: false, donatedAt: '2026-06-28T07:15:00Z' },
      { name: 'Hamba Allah', amount: 500000, isAnonymous: true, donatedAt: '2026-06-25T18:40:00Z' },
      { name: 'Rina Herawati', amount: 100000, isAnonymous: false, donatedAt: '2026-06-20T12:00:00Z' }
    ]
  },
  {
    id: 'prog-5',
    slug: 'ramadhan-berbagi-1448',
    title: 'Ramadhan Berbagi 1448 H',
    shortDescription: 'Penyaluran paket kado lebaran, mukena baru, dan paket sembako iftar untuk keluarga prasejahtera di bulan suci.',
    description: `
<p>Bulan suci Ramadhan adalah momentum terbaik untuk melipatgandakan pahala kebaikan. Melalui program Ramadhan Berbagi 1448 H, kami mengajak Anda untuk menyebarkan kebahagiaan menyambut hari raya Idul Fitri.</p>
<br/>
<p>Bantuan disalurkan berupa Paket Sembako Iftar untuk sahur dan berbuka puasa, Kado Lebaran untuk Anak Yatim berupa baju baru dan perlengkapan ibadah, serta Mukena/Sarung Baru untuk marbot masjid di daerah terpencil.</p>
<br/>
<p>Mari jadikan Ramadhan tahun ini lebih bermakna dengan membagikan kehangatan dan senyuman di wajah-wajah suci saudara-saudara kita yang membutuhkan.</p>
    `,
    programType: 'seasonal',
    displayCategory: 'Ramadhan',
    status: 'active',
    bannerImage: '/images/programs/ramadhan_berbagi.png',
    targetAmount: 50000000,
    currentAmount: 12450000,
    targetUnit: 'IDR',
    customProgressLabel: 'terkumpul untuk kado Ramadhan',
    beneficiariesCount: 80,
    checkoutUrl: 'https://lynk.id/ghp/ramadhan-berbagi',
    showDonorList: true,
    isFeatured: true,
    impactMetrics: [
      { label: 'Paket Iftar Tersalur', value: 240, unit: 'paket' },
      { label: 'Kado Lebaran Diserahkan', value: 45, unit: 'anak' },
      { label: 'Penerima Manfaat', value: 80, unit: 'keluarga' }
    ],
    donors: [
      { name: 'Keluarga Prakoso', amount: 2000000, isAnonymous: false, donatedAt: '2026-06-29T11:45:00Z' },
      { name: 'Hamba Allah', amount: 150000, isAnonymous: true, donatedAt: '2026-06-29T08:30:00Z' }
    ]
  },
  {
    id: 'prog-6',
    slug: 'bantuan-banjir-garut',
    title: 'Tanggap Darurat Banjir Garut',
    shortDescription: 'Penyaluran paket makanan darurat, obat-obatan, selimut, dan air bersih untuk warga terdampak bencana banjir bandang.',
    description: `
<p>Bencana banjir bandang yang melanda beberapa wilayah di Garut telah merendam ratusan rumah warga dan memaksa ribuan jiwa mengungsi ke posko darurat.</p>
<br/>
<p>Gerakan Hasan Peduli membuka posko dapur umum di lokasi bencana dan mendistribusikan kebutuhan pokok mendesak: makanan hangat siap saji, susu bayi, selimut hangat, obat-obatan ringan, serta air bersih layak konsumsi.</p>
<br/>
<p>Dukungan cepat Anda sangat berarti dalam menyelamatkan jiwa dan memberikan perlindungan bagi anak-anak serta lansia di pengungsian dalam masa-masa kritis ini.</p>
    `,
    programType: 'emergency',
    displayCategory: 'Tanggap Darurat',
    status: 'active',
    bannerImage: '/images/programs/bantuan_banjir.png',
    targetAmount: 15000000,
    currentAmount: 13900000,
    targetUnit: 'IDR',
    customProgressLabel: 'terkumpul dari target darurat logistik',
    beneficiariesCount: 350,
    checkoutUrl: 'https://lynk.id/ghp/banjir-garut',
    showDonorList: true,
    isFeatured: true,
    impactMetrics: [
      { label: 'Warga Terdampak Dibantu', value: 350, unit: 'jiwa' },
      { label: 'Paket Logistik Tersalur', value: 120, unit: 'paket' },
      { label: 'Posko Kesehatan Aktif', value: 1, unit: 'titik' }
    ],
    donors: [
      { name: 'Komunitas Motor Bandung', amount: 5000000, isAnonymous: false, donatedAt: '2026-06-29T15:00:00Z' },
      { name: 'Hamba Allah', amount: 1000000, isAnonymous: true, donatedAt: '2026-06-29T14:12:00Z' },
      { name: 'Rendra Pramoedya', amount: 500000, isAnonymous: false, donatedAt: '2026-06-29T13:45:00Z' }
    ]
  },
  {
    id: 'prog-7',
    slug: 'gempa-cianjur-response',
    title: 'Hunian Sementara Korban Gempa Cianjur',
    shortDescription: 'Pembangunan hunian sementara (huntara) ramah gempa untuk keluarga yang kehilangan rumah tinggal di pelosok Cianjur.',
    description: `
<p>Meskipun masa darurat bencana gempa bumi Cianjur telah lewat, ratusan keluarga masih tinggal di tenda-tenda terpal yang pengap, dingin di malam hari, dan panas di siang hari.</p>
<br/>
<p>Program Huntara Gerakan Hasan Peduli berikhtiar membangun hunian sementara semi-permanen dari bahan bambu dan kaso yang kokoh serta aman untuk melindungi keluarga dhuafa dari cuaca ekstrem saat masa transisi pemulihan.</p>
<br/>
<p>Bantuan Anda membantu memulihkan martabat dan memberikan kenyamanan bagi keluarga korban gempa bumi yang sedang merajut kembali harapan mereka.</p>
    `,
    programType: 'emergency',
    displayCategory: 'Pasca Bencana',
    status: 'archived',
    bannerImage: '/images/programs/gempa_cianjur.png',
    targetAmount: 45000000,
    currentAmount: 45000000,
    targetUnit: 'IDR',
    customProgressLabel: 'terpenuhi untuk pembangunan 15 huntara',
    beneficiariesCount: 75,
    checkoutUrl: 'https://lynk.id/ghp/huntara-cianjur',
    showDonorList: true,
    isFeatured: false,
    impactMetrics: [
      { label: 'Huntara Terbangun', value: 15, unit: 'unit' },
      { label: 'Keluarga Berteduh', value: 15, unit: 'keluarga' },
      { label: 'Total Penerima', value: 75, unit: 'jiwa' }
    ],
    donors: [
      { name: 'Bapak Haji Supriatna', amount: 15000000, isAnonymous: false, donatedAt: '2026-03-12T10:00:00Z' },
      { name: 'Anonim', amount: 5000000, isAnonymous: true, donatedAt: '2026-03-05T09:12:00Z' }
    ],
    startDate: '2026-01-10',
    endDate: '2026-03-15'
  }
];
