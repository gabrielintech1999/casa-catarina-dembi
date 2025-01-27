const db = {
  products: [
    {
      name: "Intense Noir",
      price: 15.0,
      category: "Perfume",
      description:
        "Uma fragrância suave e marcante que combina frescor e elegância. Ideal para todas as ocasiões.",
      image:
        "https://m.media-amazon.com/images/I/413K0MlBc7L._SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
      name: "Familia",
      price: 7.0,
      category: "Cuidados pessoais",
    },
    {
      name: "Folha A4",
      price: 3500,
      category: "Material escolar",
    },
  ],
  users: [
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment:
        "Gostei bastante, mas esperava que fosse mais forte. Entrega rápida.",
      date: "2025-01-18",
      cart: [
        {
          id: 1,
          name: "Intense Noir",
          price: 15.0,
          category: "Perfume",
          description:
            "Uma fragrância suave e marcante que combina frescor e elegância. Ideal para todas as ocasiões.",
          image:
            "https://m.media-amazon.com/images/I/413K0MlBc7L._SX300_SY300_QL70_FMwebp_.jpg",
        },
        {
          id: 2,
          name: "Familia",
          price: 7.0,
          category: "Cuidados pessoais",
        },
        {
          id: 3,
          name: "Folha A4",
          price: 3500,
          category: "Material escolar",
        },
      ],
      orders:[]

    },
  ],
};
