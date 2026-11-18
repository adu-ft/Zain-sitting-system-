import type {
  CategoryTile,
  CustomerStory,
  DealCard,
  Product,
} from '../types';

export const WHATSAPP_RAW = '918178942327';
export const WHATSAPP_DISPLAY = '+91 81789 42327';
export const BRAND_LOGO_HORIZONTAL = '/src/assets/images/zain_logo_horizontal_1794908716681.jpg';
export const BRAND_LOGO_COMPACT = '/src/assets/images/zain_logo_compact_1794908719414.jpg';
export const BRAND_LOGO_PATH = BRAND_LOGO_HORIZONTAL;

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(message)}`;
}

export const IMG_HERO_LIVING = '/src/assets/images/zain_hero_living_1794901393144.jpg';
export const IMG_SHOWROOM_NIGHT = '/src/assets/images/zain_showroom_night_1794901393520.jpg';
export const IMG_SOFA_MODULAR = '/src/assets/images/zain_sofa_modular_1794901395208.jpg';
export const IMG_WING_LOUNGE = '/src/assets/images/zain_wing_lounge_1794901394246.jpg';
export const IMG_ERGONOMIC_OFFICE = '/src/assets/images/zain_ergonomic_office_1794901395371.jpg';
export const IMG_RECLINER_SOFA = '/src/assets/images/zain_recliner_sofa_1794901396652.jpg';
export const IMG_RECLINE_95 = '/src/assets/images/recline_95_upright_1794980022627.jpg';
export const IMG_RECLINE_130 = '/src/assets/images/recline_130_lounge_1794980025041.jpg';
export const IMG_RECLINE_160 = '/src/assets/images/recline_160_full_1794980025450.jpg';
export const IMG_SOFA_CUM_BED = '/src/assets/images/zain_sofa_cum_bed_1794901397072.jpg';
export const IMG_SOFABED_125 = '/src/assets/images/sofabed_125cm_half_1794980271716.jpg';
export const IMG_SOFABED_156 = '/src/assets/images/sofabed_156cm_sleeper_1794980251485.jpg';
export const IMG_SOFABED_STEP1 = '/src/assets/images/sofabed_step1_switch_1794980549527.jpg';
export const IMG_SOFABED_STEP2 = '/src/assets/images/sofabed_step2_rails_1794980545090.jpg';
export const IMG_SOFABED_STEP3 = '/src/assets/images/sofabed_step3_support_1794980548263.jpg';

/* Authentic Customer Delivery & Portrait Review Assets */
export const IMG_REVIEW_RECLINER_HOME = '/src/assets/images/review_recliner_home_1794978621438.jpg';
export const IMG_REVIEW_SOFA_HOME = '/src/assets/images/review_sofa_delivered_1794978624596.jpg';
export const IMG_REVIEW_SOFABED_HOME = '/src/assets/images/review_sofabed_home_1794978624350.jpg';
export const IMG_REVIEW_CHAIR_HOME = '/src/assets/images/review_chair_home_1794978641595.jpg';
export const IMG_REVIEW_AVATAR_MAN = '/src/assets/images/review_customer_avatar_1794978625502.jpg';
export const IMG_REVIEW_AVATAR_WOMAN = '/src/assets/images/review_woman_avatar_1794978642354.jpg';

/* Exactly 5 distinct core manufactured categories — zero duplicate padding */
export const CATEGORY_TILES: CategoryTile[] = [
  {
    id: 'cat-manual-recliners',
    label: 'MANUAL RECLINERS',
    sublabel: 'Side Lever Operated',
    room: 'Recliners',
    targetCategory: 'Manual Recliners',
    image: IMG_RECLINER_SOFA,
    startingPrice: 18999,
  },
  {
    id: 'cat-motorized-recliners',
    label: 'MOTORIZED RECLINERS',
    sublabel: 'Electric Push-Button',
    room: 'Recliners',
    targetCategory: 'Motorized Recliners',
    image: IMG_RECLINER_SOFA,
    startingPrice: 28999,
  },
  {
    id: 'cat-custom-sofas',
    label: 'CUSTOM SOFA SETS',
    sublabel: 'Any Color, Fabric & Size',
    room: 'Sofa Sets',
    targetCategory: 'Sofa Sets',
    image: IMG_SOFA_MODULAR,
    startingPrice: 34999,
  },
  {
    id: 'cat-electric-sofabed',
    label: 'ELECTRIC SOFA CUM BED',
    sublabel: 'Motor Forward-Extend',
    room: 'Electric Sofa Beds',
    targetCategory: 'Electric Sofa Beds',
    image: IMG_SOFA_CUM_BED,
    startingPrice: 38499,
  },
  {
    id: 'cat-home-lounge',
    label: 'MODERN HOME CHAIRS',
    sublabel: 'Modernist Accent Chairs',
    room: 'Home Chairs',
    targetCategory: 'Home Chairs',
    image: IMG_WING_LOUNGE,
    startingPrice: 14499,
  },
];

export const EXCLUSIVE_DEALS: DealCard[] = [
  {
    id: 'deal-recline',
    title: 'Manual & Motorized Recliners',
    highlight: 'Side Lever from ₹18,999 · Electric from ₹28,999',
    caption: 'Heavy-gauge steel glide linkages tested for 25,000+ recline cycles.',
    targetCategory: 'Motorized Recliners',
    image: IMG_RECLINER_SOFA,
  },
  {
    id: 'deal-sofas',
    title: '100% Custom Sofa Sets',
    highlight: 'Made in Your Exact Color, Fabric & Size',
    caption: 'Built directly in our manufacturing unit with 40-density HR foam & pocket springs.',
    targetCategory: 'Sofa Sets',
    image: IMG_SOFA_MODULAR,
  },
  {
    id: 'deal-electric-bed',
    title: 'Electric Forward-Extend Sofa Bed',
    highlight: 'One-Touch Motor Conversion from ₹38,499',
    caption: 'Glides forward effortlessly via push-button control into a full sleeper bed.',
    targetCategory: 'Electric Sofa Beds',
    image: IMG_SOFA_CUM_BED,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'zss-sultan-motor-recliner',
    name: 'Zain Sultan Motorized Push-Button Recliner',
    subtitle: 'Motorized Recliner · Button Operated',
    category: 'Motorized Recliners',
    room: 'Recliners',
    mechanism: 'Motorized Push-Button',
    price: 28999,
    mrp: 42999,
    rating: 4.9,
    reviewCount: 312,
    image: IMG_RECLINER_SOFA,
    tag: 'Electric Push-Button',
    dimensions: '88 cm W × 96 cm D × 103 cm H (162 cm Reclined)',
    frameMaterial: 'Seasoned Hardwood Frame + Okin 24V Silent Actuator + Heavy Steel Chassis',
    foamAndSpring: '40-Density Super-Soft HR Foam + Pocket Spring Core',
    warranty: '5-Year Frame & 3-Year Electric Motor Warranty',
    deliveryEstimate: 'Factory Dispatch in 5–7 Days',
    description:
      'Operated effortlessly via sleek side push-buttons that glide the backrest and footrest into infinite micro-angles. Built in-house with whisper-quiet motorized hardware, integrated USB charging port, and customizable leatherette or suede colors.',
    customizableOptions: ['Custom Color Swatch', 'Leatherette or Suede', 'USB + Cup Holder Trim'],
    variants: [
      { label: '1-Seater Push-Button', dimensions: '88 cm W × 96 cm D × 103 cm H', priceDelta: 0 },
      { label: '1-Seater + Swivel Rocker', dimensions: '90 cm W × 98 cm D × 104 cm H', priceDelta: 4500 },
      { label: '2-Seater Cinema Console', dimensions: '176 cm W × 96 cm D × 103 cm H', priceDelta: 24000 },
    ],
    finishes: [
      { name: 'Saddle Cognac', swatchHex: '#B66338', upholstery: 'Breathable Pro Leatherette' },
      { name: 'Espresso Brown', swatchHex: '#433029', upholstery: 'Breathable Pro Leatherette' },
      { name: 'Charcoal Slate', swatchHex: '#3A3D42', upholstery: 'Matte Molfino Suede' },
      { name: 'Warm Sand', swatchHex: '#C7B69E', upholstery: 'Easy-Clean Performance Weave' },
    ],
  },
  {
    id: 'zss-nawab-manual-recliner',
    name: 'Zain Nawab Manual Lever Recliner Chair',
    subtitle: 'Manual Recliner · Heavy-Duty Lever',
    category: 'Manual Recliners',
    room: 'Recliners',
    mechanism: 'Manual Lever',
    price: 18999,
    mrp: 28999,
    rating: 4.8,
    reviewCount: 248,
    image: IMG_RECLINER_SOFA,
    tag: 'Manual Side Lever',
    dimensions: '84 cm W × 92 cm D × 102 cm H',
    frameMaterial: 'Kiln-Dried Pinewood + High-Tensile Manual Lever Steel Mechanism',
    foamAndSpring: '3-Zone 40-Density HR Foam + Elastic Webbing Support',
    warranty: '5-Year Structural & Lever Linkage Warranty',
    deliveryEstimate: 'Ready to Dispatch in 3–5 Days',
    description:
      'Operated smoothly by pulling our ergonomic brushed side lever—requiring zero wall plug or power socket. Ideal for bedrooms, reading balconies, and sunlit living corners with 360-degree rocker/swivel option available on request.',
    customizableOptions: ['Custom Fabric or Leatherette', 'Rocker Swivel Option', '2-Seater Love Seat Custom'],
    variants: [
      { label: '1-Seater Fixed Base', dimensions: '84 cm W × 92 cm D × 102 cm H', priceDelta: 0 },
      { label: '1-Seater 360° Rocker Swivel', dimensions: '86 cm W × 94 cm D × 103 cm H', priceDelta: 3500 },
      { label: '2-Seater Manual Love Seat', dimensions: '158 cm W × 92 cm D × 102 cm H', priceDelta: 17000 },
    ],
    finishes: [
      { name: 'Terracotta Tan', swatchHex: '#B66338', upholstery: 'Micro-Perforated Leatherette' },
      { name: 'Olive Grey', swatchHex: '#6E7368', upholstery: 'Textured Cotton Suede' },
      { name: 'Deep Mocha', swatchHex: '#4B362A', upholstery: 'Breathable Pro Leatherette' },
    ],
  },
  {
    id: 'zss-mirza-custom-sofa',
    name: 'Zain Mirza Factory-Custom 3-Seater Sofa Set',
    subtitle: 'Sofa Sets · Custom Color, Fabric & Size',
    category: 'Sofa Sets',
    room: 'Sofa Sets',
    mechanism: 'Fixed / Static',
    price: 34999,
    mrp: 52999,
    rating: 4.9,
    reviewCount: 364,
    image: IMG_HERO_LIVING,
    tag: '100% Customizable',
    dimensions: '215 cm W × 90 cm D × 80 cm H (Custom Lengths Available)',
    frameMaterial: 'Kiln-Dried Meranti Hardwood & Solid Teak Exposed Arms',
    foamAndSpring: '40-Density HR Foam + Heavy Zigzag Spring Seat Deck',
    warranty: '5-Year Manufacturing Structural Warranty',
    deliveryEstimate: 'Custom Built in 7–10 Days',
    description:
      'Manufactured to order in our unit so you never settle on dimensions or shade. Customize seating depth, armrest silhouette, fabric texture (linen, bouclé, velvet, or leatherette), and choose from 20+ upholstery colors at factory-direct pricing.',
    customizableOptions: ['3+1+1 Full Set', 'Custom Width & Depth', '20+ Factory Colors'],
    variants: [
      { label: '3-Seater Sofa (7 ft)', dimensions: '215 cm W × 90 cm D × 80 cm H', priceDelta: 0 },
      { label: '3+2 Living Set', dimensions: '215 cm + 158 cm W × 90 cm D', priceDelta: 22000 },
      { label: '3+1+1 Full Lounge Set', dimensions: '215 cm 3-Seat + Two 86 cm Armchairs', priceDelta: 27000 },
    ],
    finishes: [
      { name: 'Cognac Linen', swatchHex: '#9C582B', upholstery: 'Stain-Resistant Woven Linen' },
      { name: 'Oatmeal Bouclé', swatchHex: '#E5DDD0', upholstery: 'Heavyweight Textured Bouclé' },
      { name: 'Sage Velvet', swatchHex: '#5E7560', upholstery: '380 GSM Matte Velvet' },
      { name: 'Slate Indigo', swatchHex: '#3B4D63', upholstery: 'Performance Cotton Blend' },
    ],
  },
  {
    id: 'zss-noor-sectional-custom',
    name: 'Zain Noor L-Shape Custom Modular Sofa Set',
    subtitle: 'Sofa Sets · Left or Right Lounger Custom',
    category: 'Sofa Sets',
    room: 'Sofa Sets',
    mechanism: 'Fixed / Static',
    price: 46999,
    mrp: 69999,
    rating: 4.8,
    reviewCount: 289,
    image: IMG_SOFA_MODULAR,
    tag: 'Custom L-Shape',
    dimensions: '275 cm W × 168 cm D × 80 cm H',
    frameMaterial: 'Seasoned Hardwood Box Frame + Honey Teak Plinth Base',
    foamAndSpring: 'Dual-Layer HR Foam + Feather-Touch Topper Cushions',
    warranty: '5-Year Frame & Cushion Core Warranty',
    deliveryEstimate: 'Custom Built in 7–12 Days',
    description:
      'Configured directly to your living room wall measurements with choice of Left or Right chaise lounger. Add manual or motorized reclining end seats on demand straight from our factory floor.',
    customizableOptions: ['Left / Right Chaise', 'Add End Recliner Seat', 'Any Fabric Color'],
    variants: [
      { label: 'Left Chaise L-Shape (9×5.5 ft)', dimensions: '275 cm W × 168 cm D × 80 cm H', priceDelta: 0 },
      { label: 'Right Chaise L-Shape (9×5.5 ft)', dimensions: '275 cm W × 168 cm D × 80 cm H', priceDelta: 0 },
      { label: 'L-Shape + End Electric Recliner', dimensions: '285 cm W × 168 cm D × 84 cm H', priceDelta: 12500 },
    ],
    finishes: [
      { name: 'Ivory Bouclé', swatchHex: '#EDE6DA', upholstery: 'Loop-Pile Bouclé' },
      { name: 'Warm Sand', swatchHex: '#C7B69E', upholstery: 'Spill-Guard Linen' },
      { name: 'Forest Moss', swatchHex: '#4F6352', upholstery: 'Matte Velvet' },
    ],
  },
  {
    id: 'zss-sukun-electric-sofabed',
    name: 'Zain Sukun Electric Extendable Sofa Cum Bed',
    subtitle: 'Electric Sofa Bed · Motorized Forward Extension',
    category: 'Electric Sofa Beds',
    room: 'Electric Sofa Beds',
    mechanism: 'Motorized Push-Button',
    price: 38499,
    mrp: 56999,
    rating: 4.9,
    reviewCount: 221,
    image: IMG_SOFA_CUM_BED,
    tag: 'Electric Forward-Extend',
    dimensions: '198 cm W × 92 cm D (Extends Forward to 156 cm Sleeper)',
    frameMaterial: 'Reinforced Steel Telescopic Rails + 24V Dual Linear Actuator + Hardwood Frame',
    foamAndSpring: 'Pocket Spring + High-Resilience Mattress Grade Foam',
    warranty: '5-Year Frame & 3-Year Electric Actuator Warranty',
    deliveryEstimate: 'Ships in 6–9 Days · Free Demo & Setup',
    description:
      'Our flagship electrically operated sofa-cum-bed glides forward smoothly at the press of a recessed side button—converting an everyday 3-seater sofa into an extra-deep lounger or full sleeper bed with zero manual lifting.',
    customizableOptions: ['Electric Push-Button Glide', 'Custom Length 6ft / 6.5ft', 'Removable Fabric Cover'],
    variants: [
      { label: '2-Seater Compact (5.5 ft)', dimensions: '168 cm W × 92–156 cm D', priceDelta: -3500 },
      { label: '3-Seater Standard (6.5 ft)', dimensions: '198 cm W × 92–156 cm D', priceDelta: 0 },
      { label: 'King Sleeper (7 ft + USB)', dimensions: '214 cm W × 96–164 cm D', priceDelta: 6500 },
    ],
    finishes: [
      { name: 'Oatmeal Melange', swatchHex: '#CFC6B8', upholstery: 'Heavy Textured Linen' },
      { name: 'Charcoal Ash', swatchHex: '#4A4E54', upholstery: 'Performance Upholstery' },
      { name: 'Caramel Suede', swatchHex: '#9C582B', upholstery: 'Soft Matte Suede' },
    ],
  },
  {
    id: 'zss-aranya-modern-chair',
    name: 'Zain Aranya Modernist Wingback Home Chair',
    subtitle: 'Home Chairs · Contemporary Sculpted Profile',
    category: 'Home Chairs',
    room: 'Home Chairs',
    mechanism: 'Fixed / Static',
    price: 16499,
    mrp: 24999,
    rating: 4.8,
    reviewCount: 192,
    image: IMG_WING_LOUNGE,
    tag: 'Modernist Design',
    dimensions: '78 cm W × 84 cm D × 102 cm H',
    frameMaterial: 'Solid Seasoned Hardwood Legs & Mortise Joinery',
    foamAndSpring: 'Curved Contour HR Foam Seat + Matching Ottoman Optional',
    warranty: '3-Year Structural Warranty',
    deliveryEstimate: 'Ships in 4–6 Days',
    description:
      'A crisp modernist take on the classic reading armchair, scaled cleanly for apartments, master bedrooms, and living suites. Custom upholstered in your preferred velvet, bouclé, or woven shade.',
    customizableOptions: ['Add Matching Ottoman', 'Wood Stain Options', 'Custom Fabric Color'],
    variants: [
      { label: 'Wingback Chair Only', dimensions: '78 cm W × 84 cm D × 102 cm H', priceDelta: 0 },
      { label: 'Chair + Matching Ottoman', dimensions: 'Chair + 54 cm × 44 cm Footstool', priceDelta: 4500 },
      { label: 'Pair of 2 Chairs', dimensions: '2 × (78 cm W × 84 cm D × 102 cm H)', priceDelta: 14500 },
    ],
    finishes: [
      { name: 'Sage Velvet', swatchHex: '#5E7560', upholstery: '380 GSM Cotton Velvet' },
      { name: 'Terracotta Spice', swatchHex: '#B85D3B', upholstery: 'Herringbone Linen' },
      { name: 'Sandstone Ivory', swatchHex: '#DDD4C6', upholstery: 'Soft Bouclé' },
    ],
  },
  {
    id: 'zss-verve-modern-homechair',
    name: 'Zain Verve Modernist Shell Home & Study Chair',
    subtitle: 'Home Chairs · Curved Timber Backrest',
    category: 'Home Chairs',
    room: 'Home Chairs',
    mechanism: 'Fixed / Static',
    price: 14499,
    mrp: 21999,
    rating: 4.7,
    reviewCount: 149,
    image: IMG_ERGONOMIC_OFFICE,
    tag: 'Modernist Profile',
    dimensions: '64 cm W × 62 cm D × 96 cm H',
    frameMaterial: 'Molded Walnut Veneer Shell & Brushed Alloy Base',
    foamAndSpring: 'Molded High-Density Seat Cushion + Breathable Mesh Back',
    warranty: '3-Year Mechanism Warranty',
    deliveryEstimate: 'Ships in 2–4 Days',
    description:
      'Minimalist modernist chair crafted for work-from-home studies, reading desks, and bedroom corners where sleek silhouette meets lasting everyday support.',
    customizableOptions: ['Static or Swivel Castors', 'Walnut or White Oak Shell'],
    variants: [
      { label: 'Fixed Lounge Base', dimensions: '64 cm W × 62 cm D × 94 cm H', priceDelta: 0 },
      { label: '360° Swivel + Height Lift', dimensions: '64 cm W × 62 cm D × 96–106 cm H', priceDelta: 2200 },
    ],
    finishes: [
      { name: 'Charcoal & Walnut', swatchHex: '#33363B', upholstery: 'Breathable Weave + Walnut' },
      { name: 'Cognac & Walnut', swatchHex: '#9C582B', upholstery: 'Leatherette + Walnut' },
    ],
  },
  {
    id: 'zss-majlis-dual-recliner',
    name: 'Zain Majlis 2-Seater Dual-Mechanism Recliner Sofa',
    subtitle: 'Manual or Electric · Cinema & Lounge Seating',
    category: 'Motorized Recliners',
    room: 'Recliners',
    mechanism: 'Both Options',
    price: 49999,
    mrp: 72999,
    rating: 4.9,
    reviewCount: 176,
    image: IMG_RECLINER_SOFA,
    tag: 'Manual or Electric',
    dimensions: '164 cm W × 96 cm D × 103 cm H',
    frameMaterial: 'Heavy-Gauge Twin Recliner Chassis + Seasoned Hardwood Box',
    foamAndSpring: '40-Density HR Foam + Dual Pocket Springs',
    warranty: '5-Year Frame & 3-Year Mechanism Warranty',
    deliveryEstimate: 'Custom Built in 7–10 Days',
    description:
      'Two plush independently reclining lounge seats configurable in either Manual Lever or Electric Push-Button operation straight from our manufacturing line. Optional center storage console available.',
    customizableOptions: ['Manual or Electric Action', 'Optional Cup Console', 'Any Shade Selection'],
    variants: [
      { label: '2-Seater Twin Manual Lever', dimensions: '164 cm W × 96 cm D × 103 cm H', priceDelta: 0 },
      { label: '2-Seater Dual Motorized Button', dimensions: '164 cm W × 96 cm D × 103 cm H', priceDelta: 7000 },
      { label: '3-Seater Motorized + Center Console', dimensions: '238 cm W × 96 cm D × 103 cm H', priceDelta: 24500 },
    ],
    finishes: [
      { name: 'Cognac Hide', swatchHex: '#B66338', upholstery: 'Breathable Pro Leatherette' },
      { name: 'Slate Velvet', swatchHex: '#3A3D42', upholstery: 'Performance Suede' },
      { name: 'Warm Sand', swatchHex: '#C7B69E', upholstery: 'Heavyweight Linen' },
    ],
  },
];

export const CUSTOMER_STORIES: CustomerStory[] = [
  {
    id: 'rev-1',
    customerName: 'Rohan Deshmukh',
    city: 'Indiranagar, Bengaluru',
    rating: 5,
    date: '2 weeks ago',
    quote:
      'Ordered the Sultan push-button motorized recliner directly via WhatsApp after checking their factory video. The Okin motor glide is completely silent, USB port is super handy next to my coffee table, and leatherette color matched my living room perfectly.',
    productId: 'zss-sultan-motor-recliner',
    productName: 'Zain Sultan Motorized Recliner',
    categoryTag: 'Motorized Recliner',
    image: IMG_REVIEW_RECLINER_HOME,
    photos: [IMG_REVIEW_RECLINER_HOME, IMG_RECLINER_SOFA],
    avatarUrl: IMG_REVIEW_AVATAR_MAN,
    factoryReply: 'Thank you Rohan ji 🙏 Happy that the Saddle Cognac shade and smooth push-button recline fit your corner so well!',
    factoryReplyDate: '2 weeks ago',
  },
  {
    id: 'rev-2',
    customerName: 'Meera Malhotra',
    city: 'Worli, Mumbai',
    rating: 5,
    date: 'a month ago',
    quote:
      'Showrooms quoted ₹95k+ and refused custom wall sizes. Zain’s manufacturing team built our Noor L-shape sofa to exact 9×5.5 ft dimensions in Oatmeal Bouclé—40-density HR foam feels firm yet plush even after heavy family use.',
    productId: 'zss-noor-sectional-custom',
    productName: 'Zain Noor Custom L-Shape Sofa',
    categoryTag: 'Custom L-Shape Sofa',
    image: IMG_REVIEW_SOFA_HOME,
    photos: [IMG_REVIEW_SOFA_HOME, IMG_SOFA_MODULAR],
    avatarUrl: IMG_REVIEW_AVATAR_WOMAN,
    isRepeatBuyer: true,
    factoryReply: 'Grateful for your trust, Meera mam! Custom-sizing to exact apartment measurements is what we love doing.',
    factoryReplyDate: 'a month ago',
  },
  {
    id: 'rev-3',
    customerName: 'Arvind Subramanian',
    city: 'Nungambakkam, Chennai',
    rating: 5,
    date: '2 months ago',
    quote:
      'Best decision for our spare guest room. During the day it looks like a crisp linen 3-seater, and at night just press the side button and the seat glides forward smoothly into a comfortable full bed without dragging heavy iron frames.',
    productId: 'zss-sukun-electric-sofabed',
    productName: 'Zain Sukun Electric Sofa Cum Bed',
    categoryTag: 'Electric Sofa Bed',
    image: IMG_REVIEW_SOFABED_HOME,
    photos: [IMG_REVIEW_SOFABED_HOME],
    avatarInitials: 'A',
    avatarBg: '#131F2D',
    factoryReply: 'Thank you Dr. Arvind 🙏 Glad the forward-glide electric mechanism is effortless for your guests.',
    factoryReplyDate: '2 months ago',
  },
  {
    id: 'rev-4',
    customerName: 'Siddharth Kulkarni',
    city: 'Baner, Pune',
    rating: 5,
    date: '3 months ago',
    quote:
      'Picked the Sage Velvet Aranya chair for my bedroom reading corner. Solid wood legs, neat piping, and zero middleman markup—packaging arrived completely intact.',
    productId: 'zss-aranya-modern-chair',
    productName: 'Zain Aranya Modern Home Chair',
    categoryTag: 'Modern Home Chair',
    image: IMG_REVIEW_CHAIR_HOME,
    photos: [IMG_REVIEW_CHAIR_HOME],
    avatarInitials: 'S',
    avatarBg: '#9C582B',
    factoryReply: 'Looks awesome beside the floor lamp, Siddharth! Enjoy your reading corner.',
    factoryReplyDate: '3 months ago',
  },
  {
    id: 'rev-5',
    customerName: 'Farhan Qureshi',
    city: 'South Ex, New Delhi',
    rating: 5,
    date: '3 months ago',
    quote:
      'Got two Nawab Manual Side-Lever Recliners for my parents’ room because we didn’t want power cables running across the floor. Heavy lever linkage works effortlessly and cushioning feels rock solid.',
    productId: 'zss-nawab-manual-recliner',
    productName: 'Zain Nawab Manual Recliner Chair',
    categoryTag: 'Manual Recliner',
    image: IMG_RECLINER_SOFA,
    photos: [IMG_RECLINER_SOFA],
    avatarInitials: 'F',
    avatarBg: '#5E7560',
    factoryReply: 'Thank you Farhan bhai 🙏 Appreciate the feedback on the manual lever linkage!',
    factoryReplyDate: '3 months ago',
  },
];

export const POPULAR_SEARCHES: Array<{ label: string; category: CategoryTile['targetCategory'] }> = [
  { label: 'Manual Lever Recliners', category: 'Manual Recliners' },
  { label: 'Motorized Push-Button Recliners', category: 'Motorized Recliners' },
  { label: 'Electric Forward-Extend Sofa Bed', category: 'Electric Sofa Beds' },
  { label: 'Custom Color Sofa Sets', category: 'Sofa Sets' },
  { label: 'L-Shape Modular Sofas', category: 'Sofa Sets' },
  { label: 'Modernist Home Chairs', category: 'Home Chairs' },
];

export const DELIVERY_CITIES = [
  'New Delhi',
  'Gurugram',
  'Noida',
  'Mumbai',
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Ahmedabad',
  'Jaipur',
  'Kolkata',
  'Chandigarh',
];
