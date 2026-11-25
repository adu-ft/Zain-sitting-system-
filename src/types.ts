export type CategoryKey =
  | 'All'
  | 'Manual Recliners'
  | 'Motorized Recliners'
  | 'Revolving Recliners'
  | 'Sofa Sets'
  | 'Electric Sofa Beds'
  | 'Home Chairs';

export type RoomFilterKey =
  | 'All'
  | 'Recliners'
  | 'Sofa Sets'
  | 'Electric Sofa Beds'
  | 'Home Chairs';

export interface ProductFinish {
  name: string;
  swatchHex: string;
  upholstery: string;
  image?: string;
}

export interface ProductVariant {
  label: string;
  dimensions: string;
  priceDelta: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: Exclude<CategoryKey, 'All'>;
  room: Exclude<RoomFilterKey, 'All'>;
  mechanism?: 'Manual Lever' | 'Motorized Push-Button' | 'Fixed / Static' | 'Both Options';
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  galleryLabels?: string[];
  tag?: string;
  dimensions: string;
  frameMaterial: string;
  foamAndSpring: string;
  warranty: string;
  deliveryEstimate: string;
  description: string;
  customizableOptions: string[];
  variants: ProductVariant[];
  finishes: ProductFinish[];
}

export interface CategoryTile {
  id: string;
  label: string;
  sublabel: string;
  room: Exclude<RoomFilterKey, 'All'>;
  targetCategory: CategoryKey;
  image: string;
  startingPrice: number;
}

export interface DealCard {
  id: string;
  title: string;
  highlight: string;
  caption: string;
  targetCategory: CategoryKey;
  image: string;
}

export interface CollectionStory {
  id: string;
  title: string;
  subtitle: string;
  countLabel: string;
  targetCategory: CategoryKey;
  image: string;
}

export interface ShowroomLocation {
  id: string;
  city: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  highlight: string;
}

export interface CustomerStory {
  id: string;
  customerName: string;
  city: string;
  rating: number;
  date: string;
  quote: string;
  productId: string;
  productName: string;
  categoryTag: string;
  image: string;
  photos?: string[];
  avatarUrl?: string;
  avatarInitials?: string;
  avatarBg?: string;
  isRepeatBuyer?: boolean;
  factoryReply?: string;
  factoryReplyDate?: string;
}

export interface CartItem {
  product: Product;
  finishName: string;
  customNote?: string;
  selectedImage?: string;
  unitPrice: number;
  quantity: number;
}
