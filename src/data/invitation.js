export const invitation = {
  type: "wedding",
  couple: {
    firstName: "Anjar",
    secondName: "Reza",
  },
  date: "2026-09-28",
  heroImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  bgImage: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  quote: {
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antara kamu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    source: "Ar-Rum 21:3"
  },
  events: [
    {
      type: "Akad Nikah",
      date: "2026-09-28",
      startTime: "08:00",
      endTime: "10:00",
      timezone: "WIB",
      venue: "Masjid Raya",
      address: "Jl. Contoh Alamat No. 123, Kota",
      mapsUrl: "https://maps.app.goo.gl/R5uoaEGRnxo2qToL9?g_st=ac"
    },
    {
      type: "Resepsi",
      date: "2026-09-28",
      startTime: "11:00",
      endTime: "14:00",
      timezone: "WIB",
      venue: "Grand Ballroom Hotel",
      address: "Jl. Contoh Alamat No. 456, Kota",
      mapsUrl: "https://maps.app.goo.gl/R5uoaEGRnxo2qToL9?g_st=ac"
    }
  ],
  story: [
    {
      year: "2020",
      title: "Pertama Bertemu",
      description: "Berawal dari sebuah kebetulan yang tidak disengaja, kami saling mengenal dan mulai merajut kisah persahabatan yang perlahan berubah menjadi cinta."
    },
    {
      year: "2023",
      title: "Mulai Berkomitmen",
      description: "Setelah saling memahami visi dan misi satu sama lain, kami memutuskan untuk melangkah lebih jauh dalam sebuah komitmen serius."
    },
    {
      year: "2025",
      title: "Lamaran",
      description: "Momen berharga ketika kedua keluarga bertemu untuk menyatukan niat baik yang telah lama dinantikan."
    }
  ],
  dressCode: {
    enabled: false,
    theme: "White and Gold",
    description: "Mohon kenakan pakaian bernuansa putih atau emas untuk keselarasan."
  },
  gift: {
    enabled: true,
    accounts: [
      {
        type: "bank",
        bankName: "MANDIRI",
        accountNumber: "12345678",
        accountName: "a"
      }
    ],
    address: "Jolotigo"
  },
  music: {
    enabled: true,
    title: "A Thousand Years - Christina Perri",
    src: "/background-music.mp3"
  },
  theme: {
    background: "#F7F3ED",
    text: "#25221F",
    accent: "#A78B5B",
    muted: "#8B8175"
  },
  backend: {
    invitationId: "demo"
  }
};
