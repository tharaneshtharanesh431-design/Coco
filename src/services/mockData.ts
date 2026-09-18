import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Fresh Coconut',
    slug: 'fresh-coconut',
    shortDescription: 'Premium fresh mature coconuts for wholesale and international distribution.',
    description: 'Our fresh mature coconuts are hand-selected from the finest plantations in India. They offer thick, flavorful meat and are graded precisely for export markets.',
    origin: 'India',
    formats: ['Mesh Bags', 'PP Bags', 'Cartons'],
    imageUrl: '/images/product-fresh.jpg',
    category: 'Fresh',
    specifications: {
      'Origin': 'India',
      'Product Type': 'Fresh Mature Coconut',
      'Grade': 'Export Grade (A)',
      'Weight': '500g - 700g per piece',
      'Packaging': '25 nuts per bag',
      'Shelf Life': '50 - 60 Days',
      'MOQ': '1x20FT FCL',
    }
  },
  {
    id: 'p2',
    name: 'Tender Coconut',
    slug: 'tender-coconut',
    shortDescription: 'Fresh tender coconuts for beverage and food markets.',
    description: 'Refreshing and natural, our tender coconuts are harvested at the optimal time to ensure maximum water content and sweetness. Perfect for the premium beverage sector.',
    origin: 'India',
    formats: ['Cartons', 'Shrink Wrapped'],
    imageUrl: '/images/product-tender.jpg',
    category: 'Fresh',
    specifications: {
      'Origin': 'India',
      'Product Type': 'Tender Coconut',
      'Grade': 'Premium Export',
      'Weight': '1.5kg - 2.5kg per piece',
      'Packaging': '6-9 nuts per carton',
      'Shelf Life': '30 Days at 4°C',
      'MOQ': '1x40FT Reefer',
    }
  },
  {
    id: 'p3',
    name: 'Semi-Husked Coconut',
    slug: 'semi-husked-coconut',
    shortDescription: 'Prepared for efficient handling and international shipment.',
    description: 'Semi-husked coconuts retain a portion of the husk to protect the eye region during transport, ensuring the nut remains fresh and intact upon arrival.',
    origin: 'India',
    formats: ['PP Bags', 'Jute Bags'],
    imageUrl: '/images/product-semi.jpg',
    category: 'Fresh',
    specifications: {
      'Origin': 'India',
      'Product Type': 'Semi-Husked Coconut',
      'Grade': 'Export Grade',
      'Weight': '600g+ per piece',
      'Packaging': '25 nuts per PP bag',
      'Shelf Life': '60 Days',
      'MOQ': '1x20FT FCL',
    }
  },
  {
    id: 'p4',
    name: 'Coconut Copra',
    slug: 'coconut-copra',
    shortDescription: 'Dried coconut suitable for industrial and commercial applications.',
    description: 'Sun-dried or kiln-dried copra with low moisture content, ideal for oil extraction and industrial processing.',
    origin: 'India',
    formats: ['Jute Bags', 'Bulk Bags'],
    imageUrl: '/images/product-copra.jpg',
    category: 'Processed',
    specifications: {
      'Origin': 'India',
      'Product Type': 'Milling Copra / Edible Copra',
      'Moisture': '< 6%',
      'Oil Content': '60% - 65%',
      'Packaging': '50kg Jute Bags',
      'MOQ': '1x20FT FCL',
    }
  }
];

