/**
 * CLIENT CONFIGURATION
 * --------------------
 * Change client-specific content here. Keep quotation marks and commas intact.
 * File paths are relative so this template works inside /khwahish/ or any folder.
 */

window.INVITATION_CONFIG = {
  site: {
    title: "Namra & Osama — Nikah Invitation",
    description:
      "You are warmly invited to celebrate the Nikah of Namra Akbani and Osama Akbani.",
  },

  couple: {
    brideInitial: "N",
    groomInitial: "O",
    bride: {
      name: "Namra Akbani",
      shortName: "Namra",
      relation: "D/o",
      parents: "Haji Mohd Iqbal Akbani & Khairunnisa Akbani",
    },
    groom: {
      name: "Osama Akbani",
      shortName: "Osama",
      relation: "Son of",
      parents: "Haji Mohd Rashid Akbani & Sharifa Akbani",
    },
  },

  copy: {
    bismillah: "﷽",
    bismillahTranslation:
      "",
    welcomeLine: "We request the honour of your presence at the Nikah of",
    invitation:
      "",
    heroClosing:
      "as they begin their forever in faith and love.",
    welcomeTitle: "A love written in dua",
    welcomeBody:
      "With the blessings of Allah Subhanahu Wa Ta’ala, Namra and Osama invite you to share in the joy of their union — a day of gratitude, family, and beautiful beginnings.",
    gifts:
      "Your love, blessings, and presence are the greatest gifts we could ever ask for.",
    closing: "We can’t wait to celebrate with you.",
    dua: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    duaTranslation:
      "May Allah bless you both, shower His blessings upon you, and join you together in goodness.",
  },

  wedding: {
    // Use a valid ISO date with the local UTC offset for an accurate countdown.
    isoDate: "2026-12-25T19:00:00+05:30",
    date: "December 25, 2026",
    day: "Friday",
    time: "Dawat-e-Nikah at 7:00 PM",
    timezone: "IST",
  },

  media: {
    // Replace these two files inside the /media folder.
    introVideo: "./media/intro-placeholder.mp4",
    introPoster:
      "./media/intro-placeholder.webp",
    music: "./media/sakina.mp3",

    // Replace gallery URLs with your own hosted files or image URLs.
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=88",
        alt: "A softly lit wedding detail",
        caption: "A promise, held gently",
      },
      {
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=88",
        alt: "A joyful wedding celebration",
        caption: "Surrounded by the ones we love",
      },
      {
        src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=88",
        alt: "Elegant wedding florals and table setting",
        caption: "A day to remember",
      },
      {
        src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1400&q=88",
        alt: "Bride and groom walking together",
        caption: "And so, our forever begins",
      },
    ],
  },

  program: [
    {
      time: "After Jumah",
      title: "Nikah",
      note: "At Masjid-e-Mustafa",
    },
    {
      time: "7:00 PM",
      title: "Dawat-e-Nikah",
      note: "Dinner at Canal Garden",
    },
  ],

  venue: {
    name: "Canal Garden",
    address:
      "Kalamna Road, Kamptee, Nagpur",
    mapUrl: "https://share.google/KDmuUbhSpXMxtP1zG",
  },

  dressCode: {
    title: "",
    description: "",
    swatches: [],
  },

  preWeddingEvents: [],

  rsvp: {
    deadline: "Kindly respond by September 15, 2026",
    contact: "For assistance, call +91 98765 43210",
    fields: {
      name: "Your full name",
      email: "Email address",
      attendance: ["Joyfully accepts", "Regretfully declines"],
      guests: ["1 guest", "2 guests", "3 guests", "4 guests"],
      note: "Dietary notes or a message for the couple",
    },
  },

  theme: {
    ivory: "#fbf8f3",
    plum: "#4d294b",
    lavender: "#cbbbd3",
    mauve: "#9d7695",
    lilac: "#eee6f1",
    champagne: "#c3a66c",
  },
};
