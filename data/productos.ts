// ============================================================================
// CATÁLOGO DE PRODUCTOS DE LA TIENDA KTF
// ============================================================================
// CÓMO INGRESAR IMÁGENES MANUALMENTE:
// 1. Coloca tus archivos de imagen (JPG, PNG, WEBP) en la carpeta:
//    👉 public/productos/  (ejemplo: public/productos/guantes.jpg)
// 2. En el producto correspondiente aquí abajo, añade o modifica la propiedad:
//    👉 imagen: '/productos/guantes.jpg'
// 3. Si un producto NO tiene imagen o no la pones, se mostrará el emoji por defecto.
// ============================================================================

export const PRODUCTOS_SON_EJEMPLO = true

export const CATEGORIAS = ['Todos', 'Equipamiento', 'Ropa', 'Suplementos', 'Bebidas'] as const

export const EMOJI: Record<string, string> = {
  Equipamiento: '🥊',
  Ropa: '👕',
  Suplementos: '💪',
  Bebidas: '🥤',
}

export interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  categoria: Exclude<(typeof CATEGORIAS)[number], 'Todos'>
  // 👉 Ruta a la imagen dentro de public (ejemplo: '/productos/guantes.jpg')
  imagen?: string
}

export const PRODUCTOS: Producto[] = [
  {
    id: 1,
    nombre: 'Vendas para manos',
    descripcion: 'Vendas elásticas de 4,5 m para proteger nudillos y muñecas.',
    precio: 12,
    categoria: 'Equipamiento',
    imagen: '/productos/vendas.jpg', // Reemplaza o sube tu foto a public/productos/vendas.jpg
  },
  {
    id: 2,
    nombre: 'Protector bucal',
    descripcion: 'Termoformable, se ajusta a tu boca.',
    precio: 5,
    categoria: 'Equipamiento',
    imagen: '/productos/protector-bucal.jpg',
  },
  {
    id: 3,
    nombre: 'Guantes de entrenamiento',
    descripcion: 'Guantes de 12 oz en cuero sintético, negro y dorado.',
    precio: 45,
    categoria: 'Equipamiento',
    imagen: '/productos/guantes.jpg',
  },
  {
    id: 4,
    nombre: 'Espinilleras KTF',
    descripcion: 'Espuma de alta densidad, tallas S a XL.',
    precio: 28,
    categoria: 'Equipamiento',
    imagen: '/productos/espinilleras.jpg',
  },
  {
    id: 5,
    nombre: 'Short de entrenamiento',
    descripcion: 'Estilo Muay Thai, tela satinada, diseño KTF.',
    precio: 15,
    categoria: 'Ropa',
    imagen: '/productos/short.jpg',
  },
  {
    id: 6,
    nombre: 'Camiseta sin mangas KTF',
    descripcion: 'Dry-fit con logo bordado para entrenos intensos.',
    precio: 15,
    categoria: 'Ropa',
    imagen: '/productos/camiseta.jpg',
  },
  {
    id: 7,
    nombre: 'Hoodie KTF',
    descripcion: 'Algodón grueso de 320 g con logo frontal.',
    precio: 35,
    categoria: 'Ropa',
    imagen: '/productos/hoodie.jpg',
  },
  {
    id: 8,
    nombre: 'Proteína Whey KTF 1 kg',
    descripcion: '24 g de proteína por porción, sabor chocolate.',
    precio: 38,
    categoria: 'Suplementos',
    imagen: '/productos/proteina.jpg',
  },
  {
    id: 9,
    nombre: 'Creatina monohidrato 300 g',
    descripcion: 'Creatina micronizada para fuerza y recuperación.',
    precio: 22,
    categoria: 'Suplementos',
    imagen: '/productos/creatina.jpg',
  },
  {
    id: 10,
    nombre: 'Bebida isotónica KTF',
    descripcion: 'Electrolitos y vitamina C, 500 ml.',
    precio: 3,
    categoria: 'Bebidas',
    imagen: '/productos/isotonica.jpg',
  },
  {
    id: 11,
    nombre: 'Shake de proteína listo',
    descripcion: '40 g de proteína, 330 ml. Chocolate, vainilla o fresa.',
    precio: 5,
    categoria: 'Bebidas',
    imagen: '/productos/shake.jpg',
  },
  {
    id: 12,
    nombre: 'Agua alcalina 1 L',
    descripcion: 'pH 9,5 para hidratarte durante el entreno.',
    precio: 2,
    categoria: 'Bebidas',
    imagen: '/productos/agua.jpg',
  },
]
