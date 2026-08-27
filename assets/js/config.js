/**
 * CLIENT CONFIGURATION
 * --------------------
 * Change client-specific content here. Keep quotation marks and commas intact.
 * File paths are relative so this template works inside /khwahish/ or any folder.
 */

window.INVITATION_CONFIG = {
  site: {
    title: "Fatima & Ibrahim — Nikah Invitation",
    description:
      "You are warmly invited to celebrate the Nikah of Fatima Aisha and Ibrahim Ahmed.",
  },

  couple: {
    brideInitial: "Z",
    groomInitial: "Z",
    bride: {
      name: "Zoya Khan",
      shortName: "Zoya",
      relation: "Daughter of",
      parents: "Rashid Khan & Farida Begum",
    },
    groom: {
      name: "Shaikh Zaid",
      shortName: "Zaid",
      relation: "Son of",
      parents: "Shaikh Tariq & Shabana Begum",
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
      "With the blessings of Allah Subhanahu Wa Ta’ala, Zoya and Zaid invite you to share in the joy of their union — a day of gratitude, family, and beautiful beginnings.",
    gifts:
      "Your love, blessings, and presence are the greatest gifts we could ever ask for.",
    closing: "We can’t wait to celebrate with you.",
    dua: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    duaTranslation:
      "May Allah bless you both, shower His blessings upon you, and join you together in goodness.",
  },

  wedding: {
    // Use a valid ISO date with the local UTC offset for an accurate countdown.
    isoDate: "2026-09-30T10:00:00+05:30",
    date: "September 30, 2026",
    day: "Wednesday",
    time: "10:00 AM",
    timezone: "IST",
  },

  media: {
    // Replace these two files inside the /media folder.
    introVideo: "./media/intro-placeholder.mp4",
    introPoster:
      "./media/intro-placeholder.webp",
    music: "./media/bismillah.mp3",

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
      time: "9:30 AM",
      title: "Guest Arrival",
      note: "Welcome refreshments",
    },
    {
      time: "10:00 AM",
      title: "Nikah Ceremony",
      note: "Solemnisation & duas",
    },
    {
      time: "11:15 AM",
      title: "Blessings",
      note: "Family greetings & photographs",
    },
    {
      time: "12:00 PM",
      title: "Walima Luncheon",
      note: "A feast shared with love",
    },
  ],

  venue: {
    name: "Noor Invites",
    address:
      "Mahal, Nagpur",
    mapUrl: "https://maps.google.com/?q=Mahal+Nagpur",
  },

  dressCode: {
    title: "Pastels & Jewel Tones",
    description:
      "Traditional or formal attire in soft pastels, mauve, plum, sage, or champagne. We kindly request modest silhouettes and invite you to dress in what makes you feel beautiful.",
    swatches: ["#d8c7df", "#a883a5", "#673c64", "#d8c9a5", "#9aa78f"],
  },

  preWeddingEvents: [
    {
      name: "Mehendi",
      date: "September 27",
      time: "4:00 PM",
      location: "Bride’s Residence",
    },
    {
      name: "Haldi",
      date: "September 28",
      time: "10:30 AM",
      location: "The Courtyard",
    },
    {
      name: "Qawwali Evening",
      date: "September 29",
      time: "7:00 PM",
      location: "Noor Garden Pavilion",
    },
    {
      name: "Family Dinner",
      date: "September 29",
      time: "9:00 PM",
      location: "The Jasmine Room",
    },
  ],

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
