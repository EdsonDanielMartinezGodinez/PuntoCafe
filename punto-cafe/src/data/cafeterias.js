// Datos de ejemplo mientras no exista un backend con las cafeterías reales
export const CAFETERIAS_DEMO = [
  {
    id: 1, nombre: 'Café Époque', ciudad: 'Cd Madero, Tamaulipas',
    descripcion: 'Un espacio acogedor dedicado a servir experiencias únicas.',
    rating: 4.8, horario: '9:00 – 19:00', lat: 22.3980, lng: -97.9270,
    foto: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
    direccion: 'Av. Hidalgo 120, Centro, Cd Madero',
    telefono: '833 2XX XX78',
    whatsapp: '833 2XX XX78',
    reservaciones: true,
    reservacionesUrl: null,
    menu: [
      { categoria: 'Bebidas Calientes', nombre: 'Cappuccino', descripcion: 'Espresso con leche vaporizada y espuma', precio: 55 },
      { categoria: 'Bebidas Calientes', nombre: 'Americano', descripcion: 'Espresso doble con agua caliente', precio: 45 },
      { categoria: 'Bebidas Frías',     nombre: 'Frappé de caramelo', descripcion: 'Café frío con caramelo y crema batida', precio: 70 },
      { categoria: 'Comida',            nombre: 'Croissant de mantequilla', descripcion: 'Recién horneado, crujiente por fuera', precio: 40 },
      { categoria: 'Postres',           nombre: 'Pay de queso', descripcion: 'Con base de galleta y mermelada de fresa', precio: 55 },
    ]
  },
  {
    id: 2, nombre: 'Zona Café', ciudad: 'Cd Madero, Tamaulipas',
    descripcion: 'Relajate con los mejores granos en un ambiente sin igual.',
    rating: 4.5, horario: '8:00 – 18:00', lat: 22.3050, lng: -97.8690,
    foto: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80',
    direccion: 'Calle Juárez 45, Col. Centro, Cd Madero',
    telefono: '833 2XX XX78',
    whatsapp: null,
    reservaciones: false,
    reservacionesUrl: null,
    menu: [
      { categoria: 'Bebidas Calientes', nombre: 'Latte', descripcion: 'Espresso suave con leche cremosa', precio: 58 },
      { categoria: 'Bebidas Frías',     nombre: 'Cold Brew', descripcion: 'Café extraído en frío por 12 horas', precio: 65 },
      { categoria: 'Comida',            nombre: 'Sandwich de pavo', descripcion: 'Pan artesanal, pavo, lechuga y mostaza', precio: 75 },
      { categoria: 'Postres',           nombre: 'Brownie', descripcion: 'Chocolate oscuro con nuez', precio: 45 },
    ]
  },
  {
    id: 3, nombre: 'Cafe & Moka', ciudad: 'Cd Madero, Tamaulipas',
    descripcion: 'Robusta de altura cremada en la crema más fina.',
    rating: 4.1, horario: '7:00 – 17:00', lat: 22.2550, lng: -97.8680,
    foto: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    direccion: 'Blvd. Morelos 890, Cd Madero',
    telefono: null,
    whatsapp: '833 2XX XX78',
    reservaciones: false,
    reservacionesUrl: null,
    menu: [
      { categoria: 'Bebidas Calientes', nombre: 'Moka', descripcion: 'Espresso con chocolate y leche', precio: 62 },
      { categoria: 'Bebidas Calientes', nombre: 'Macchiato', descripcion: 'Espresso con toque de leche espumada', precio: 50 },
      { categoria: 'Comida',            nombre: 'Bagel con cream cheese', descripcion: 'Tostado con queso crema y cebollín', precio: 55 },
    ]
  },
  {
    id: 4, nombre: 'Madero Cafe', ciudad: 'Cd Madero, Tamaulipas',
    descripcion: 'Algo ligero, limón al fondo, caramelo claro al tono.',
    rating: 4.6, horario: '8:30 – 20:00', lat: 22.2720, lng: -97.8340,
    foto: 'https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=400&q=80',
    direccion: 'Av. Tamaulipas 234, Cd Madero',
    telefono: '833 2XX XX78',
    whatsapp: null,
    reservaciones: true,
    reservacionesUrl: 'https://maderocafe.com/reservar',
    menu: [
      { categoria: 'Bebidas Calientes', nombre: 'Café de olla', descripcion: 'Canela y piloncillo, receta tradicional', precio: 35 },
      { categoria: 'Bebidas Frías',     nombre: 'Limonada con café', descripcion: 'Café frío con limón fresco y menta', precio: 60 },
      { categoria: 'Comida',            nombre: 'Molletes', descripcion: 'Pan bolillo con frijoles y queso gratinado', precio: 65 },
      { categoria: 'Postres',           nombre: 'Pastel de zanahoria', descripcion: 'Con betún de queso crema', precio: 50 },
    ]
  },
]

// Ordenadas de mayor a menor calificación para el carrusel "Mejor valorados"
export const MEJOR_VALORADAS = [...CAFETERIAS_DEMO].sort((a, b) => b.rating - a.rating)
