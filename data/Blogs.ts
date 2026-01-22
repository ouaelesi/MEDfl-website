// /data/Blogs.js

export const blogs = [
  {
    _id: "blog-001",
    title: "Moderniser son infrastructure réseau : bonnes pratiques en 2025",
    slug: "moderniser-reseau",
    excerpt:
      "Un guide complet pour moderniser votre réseau : sécurité, segmentation, supervision et performance.",
    publishedAt: "2025-10-08",
    author: {
      name: "SERVSI — Équipe Réseaux",
      avatar: "/images/Logo.png",
    },
    category: [{ title: "Réseau" }, { title: "Sécurité" }],
    mainImage: { url: "/images/code.png", alt: "Infrastructure réseau" },

    // ✅ Sanity-free content: simple block array
    body: [
      { _type: "h2", text: "Pourquoi moderniser ?" },
      {
        _type: "p",
        text: "Les réseaux modernes doivent supporter des charges variables, des exigences de sécurité plus fortes, et une observabilité fine.",
      },
      { _type: "h2", text: "Bonnes pratiques" },
      {
        _type: "ul",
        items: [
          "Segmenter (VLAN / micro-segmentation)",
          "Chiffrer (TLS, VPN, Zero Trust)",
          "Superviser (logs, métriques, traces)",
        ],
      },
      {
        _type: "code",
        lang: "bash",
        code: "ping -c 3 example.com\ntraceroute example.com",
      },
      {
        _type: "quote",
        text: "La simplicité opérationnelle est un avantage compétitif.",
      },
      {
        _type: "image",
        url: "/images/about1.jpg",
        alt: "Exemple d’architecture",
      },
    ],
  },
];

export function getBlogBySlug(slug) {
  return blogs.find((b) => b.slug === slug);
}
