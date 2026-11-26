import type {
  CategoryTile,
  CustomerStory,
  DealCard,
  Product,
} from '../types';

export const SUPABASE_IMAGES_BASE =
  'https://vrjvxpzutmingaqrsvnn.supabase.co/storage/v1/object/public/images';

export function storageImg(objectPath: string): string {
  return `${SUPABASE_IMAGES_BASE}/${objectPath.replace(/^\/+/, '')}`;
}

export const WHATSAPP_RAW = '918178942327';
export const WHATSAPP_DISPLAY = '+91 81789 42327';
export const FACTORY_MOBILE_RAW = '+918178942327';
export const FACTORY_MOBILE_DISPLAY = '+91 81789 42327';
export const FACTORY_ADDRESS = 'E-94, Jasola Village, Ground Floor, New Delhi - 110025';
export const FACTORY_GSTIN = '07ACMPH7962E1ZD';
export const FACTORY_PAN = 'ACMPH7962E';
export const BRAND_LOGO_HORIZONTAL = storageImg('catalog/zain_logo_horizontal_1794908716681.jpg');
export const BRAND_LOGO_COMPACT = storageImg('catalog/zain_logo_compact_1794908719414.jpg');
export const BRAND_LOGO_PATH = BRAND_LOGO_HORIZONTAL;

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(message)}`;
}

/* Campaign Banners & Interactive Mechanism Explainer Assets */
export const IMG_HERO_LIVING = storageImg('catalog/zain_hero_living_1794901393144.jpg');
export const IMG_SHOWROOM_NIGHT = storageImg('catalog/zain_showroom_night_1794901393520.jpg');
export const IMG_SOFA_MODULAR = storageImg('catalog/zain_sofa_modular_1794901395208.jpg');
export const IMG_WING_LOUNGE = storageImg('catalog/zain_wing_lounge_1794901394246.jpg');
export const IMG_ERGONOMIC_OFFICE = storageImg('catalog/zain_ergonomic_office_1794901395371.jpg');
export const IMG_RECLINER_SOFA = storageImg('catalog/hero_recliner_suite.webp');
export const IMG_RECLINE_95 = storageImg('catalog/recline_step1_closed.webp');
export const IMG_RECLINE_130 = storageImg('catalog/recline_step2_partial.webp');
export const IMG_RECLINE_160 = storageImg('catalog/recline_step3_full.webp');
export const IMG_SOFA_CUM_BED = storageImg('catalog/zain_sofa_cum_bed_1794901397072.jpg');
export const IMG_SOFABED_125 = storageImg('catalog/sofabed_125cm_half_1794980271716.jpg');
export const IMG_SOFABED_156 = storageImg('catalog/sofabed_156cm_sleeper_1794980251485.jpg');
export const IMG_SOFABED_STEP1 = storageImg('catalog/sofabed_step1_switch_1794980549527.jpg');
export const IMG_SOFABED_STEP2 = storageImg('catalog/sofabed_step2_rails_1794980545090.jpg');
export const IMG_SOFABED_STEP3 = storageImg('catalog/sofabed_step3_support_1794980548263.jpg');
export const IMG_SOFABED_VIDEO_POSTER = storageImg('media/sofa-cum-bed-poster.webp');
export const VIDEO_MOTORIZED_RECLINER =
  'https://vrjvxpzutmingaqrsvnn.supabase.co/storage/v1/object/public/images/media/WhatsApp%20Video%202026-11-26%20at%203.45.32%20PM_gwr_video_mvp.mp4';

/* Studio Color-Variant Renders (Matched to Exact Product Silhouettes) */
export const IMG_VAR_SOFABED_CHARCOAL = storageImg('catalog/sofabed_charcoal_ash_1795082505413.jpg');
export const IMG_VAR_SOFABED_CARAMEL = storageImg('catalog/sofabed_caramel_suede_1795082504249.jpg');
export const IMG_VAR_SOFASET_COGNAC = storageImg('catalog/sofa_set_cognac_tan_1795082506064.jpg');
export const IMG_VAR_CHAIR_SAGE = storageImg('catalog/chair_sage_velvet_1795082506018.jpg');
export const IMG_VAR_LOVESEAT_NAVY = storageImg('catalog/loveseat_navy_plush_1795082506432.jpg');

/* Multi-Angle E-Commerce Product Shots (Same Product · Front, Reclined, Detail & Rear 3/4 Views) */
export const IMG_SULTAN_RECLINED = storageImg('catalog/sultan_reclined_side_1795344547187.jpg');
export const IMG_SULTAN_DETAIL = storageImg('catalog/sultan_detail_usb_1795347005932.jpg');
export const IMG_SULTAN_BACK = storageImg('catalog/sultan_back_angle_1795344547503.jpg');

export const IMG_NAWAB_RECLINED = storageImg('catalog/nawab_reclined_side_1795344546174.jpg');
export const IMG_NAWAB_DETAIL = storageImg('catalog/nawab_detail_lever_1795344546865.jpg');
export const IMG_NAWAB_BACK = storageImg('catalog/nawab_back_angle_1795344546216.jpg');

export const IMG_IMPERIAL_RECLINED = storageImg('catalog/imperial_reclined_side_1795347009117.jpg');
export const IMG_IMPERIAL_DETAIL = storageImg('catalog/imperial_detail_tray_1795344546793.jpg');
export const IMG_IMPERIAL_BACK = storageImg('catalog/imperial_back_angle_1795344548862.jpg');

export const IMG_NOOR_RECLINED = storageImg('catalog/noor_recliner_open_1795344547429.jpg');
export const IMG_NOOR_DETAIL = storageImg('catalog/noor_detail_suede_1795344546867.jpg');
export const IMG_NOOR_OPPOSITE = storageImg('catalog/noor_opposite_angle_1795344547120.jpg');

export const IMG_MAJLIS_DETAIL = storageImg('catalog/majlis_detail_console_1795347009268.jpg');
export const IMG_MAJLIS_SIDE = storageImg('catalog/majlis_side_angle_1795344547115.jpg');

export const IMG_AURA_RECLINED = storageImg('catalog/aura_reclined_side_1795347007411.jpg');
export const IMG_AURA_DETAIL = storageImg('catalog/aura_detail_fabric_1795344547121.jpg');
export const IMG_AURA_BACK = storageImg('catalog/aura_back_angle_1795344547230.jpg');

export const IMG_MIRZA_RECLINED = storageImg('catalog/mirza_reclined_view_1795347008860.jpg');
export const IMG_MIRZA_DETAIL = storageImg('catalog/mirza_detail_stitch_1795344546586.jpg');

export const IMG_ARANYA_RECLINED = storageImg('catalog/aranya_reclined_side_1795344547115.jpg');
export const IMG_ARANYA_DETAIL = storageImg('catalog/aranya_detail_stitch_1795344547266.jpg');
export const IMG_ARANYA_BACK = storageImg('catalog/aranya_back_angle_1795344548092.jpg');

export const IMG_HARMONY_RECLINED = storageImg('catalog/harmony_reclined_view_1795347007446.jpg');
export const IMG_HARMONY_DETAIL = storageImg('catalog/harmony_detail_suede_1795344547117.jpg');
export const IMG_HARMONY_BACK = storageImg('catalog/harmony_back_angle_1795344546092.jpg');

export const IMG_ROYALE_RECLINED = storageImg('catalog/royale_reclined_row_1795344547192.jpg');
export const IMG_ROYALE_DETAIL = storageImg('catalog/royale_detail_cupholder_1795344549024.jpg');
export const IMG_ROYALE_SIDE = storageImg('catalog/royale_side_angle_1795344548455.jpg');

export const IMG_VERVE_RECLINED = storageImg('catalog/verve_reclined_side_1795344548783.jpg');
export const IMG_VERVE_DETAIL = storageImg('catalog/verve_detail_swivel_1795344547396.jpg');
export const IMG_VERVE_BACK = storageImg('catalog/verve_back_angle_1795344547193.jpg');

/* Real Zain Seating System Product Photography (Hosted in Supabase Storage `images` bucket) */
export const IMG_DRV_BEIGE_MOTOR = storageImg('drive/recliner_beige_motorized.jpg');
export const IMG_DRV_CREAM_TRAY = storageImg('drive/cinema_1seater_cream_tray.jpg');
export const IMG_DRV_CREAM_EXT = storageImg('drive/recliner_cream_extended.jpg');
export const IMG_DRV_NAVY_TRAY = storageImg('drive/cinema_1seater_navy_tray.jpg');
export const IMG_DRV_SAND_TRAY = storageImg('drive/cinema_1seater_sand_tray.jpg');
export const IMG_DRV_CARAMEL_TRAY = storageImg('drive/cinema_1seater_caramel_tray.jpg');
export const IMG_DRV_ROYAL_USB = storageImg('drive/cinema_1seater_royal_usb.jpg');
export const IMG_DRV_COGNAC_USB = storageImg('drive/recliner_cognac_usb.jpg');
export const IMG_DRV_CHARCOAL_SLATE = storageImg('drive/recliner_charcoal_slate.jpg');
export const IMG_DRV_ESPRESSO_BROWN = storageImg('drive/recliner_espresso_brown.jpg');
export const IMG_DRV_BLACK_MANUAL = storageImg('drive/recliner_black_manual.jpg');
export const IMG_DRV_IVORY_MANUAL = storageImg('drive/recliner_ivory_manual.jpg');
export const IMG_DRV_TERRACOTTA_MANUAL = storageImg('drive/recliner_terracotta_manual.jpg');
export const IMG_DRV_NAVY_CLOUD = storageImg('drive/recliner_navy_cloud.jpg');
export const IMG_DRV_MUSTARD_MANUAL = storageImg('drive/recliner_mustard_manual.jpg');
export const IMG_DRV_WHITE_SWIVEL = storageImg('drive/recliner_white_swivel.jpg');
export const IMG_DRV_GREY_FABRIC_EXT = storageImg('drive/recliner_grey_fabric_extended.jpg');
export const IMG_DRV_TEAL_UPRIGHT = storageImg('drive/recliner_teal_upright.jpg');
export const IMG_DRV_TEAL_RECLINED = storageImg('drive/recliner_teal_reclined.jpg');
export const IMG_DRV_LOVESEAT_CHARCOAL = storageImg('drive/loveseat_charcoal_manual.jpg');
export const IMG_DRV_LOVESEAT_TAUPE = storageImg('drive/loveseat_taupe_upright.jpg');
export const IMG_DRV_CINEMA2_CHARCOAL_UP = storageImg('drive/cinema_2seater_charcoal_upright.jpg');
export const IMG_DRV_CINEMA2_CHARCOAL_REC = storageImg('drive/cinema_2seater_charcoal_reclined.jpg');
export const IMG_DRV_CINEMA2_COGNAC = storageImg('drive/cinema_2seater_cognac.jpg');
export const IMG_DRV_CINEMA2_BLACK = storageImg('drive/cinema_2seater_black_console.jpg');
export const IMG_DRV_CINEMA2_OLIVE = storageImg('drive/cinema_2seater_olive_tray.jpg');
export const IMG_DRV_CINEMA3_GREY = storageImg('drive/cinema_3seater_grey.jpg');
export const IMG_DRV_CINEMA3_BLACK = storageImg('drive/cinema_3seater_black.jpg');
export const IMG_DRV_CINEMA4_COGNAC = storageImg('drive/cinema_4seater_cognac_factory.jpg');
export const IMG_DRV_CINEMA4_CRIMSON = storageImg('drive/cinema_4seater_crimson.jpg');
export const IMG_DRV_LSHAPE_BROWN = storageImg('drive/sofa_lshape_brown.jpg');
export const IMG_DRV_LSHAPE_TAUPE = storageImg('drive/sofa_lshape_taupe_extended.jpg');
export const IMG_DRV_SOFASET_321 = storageImg('drive/sofa_set_321_espresso.jpg');
export const IMG_DRV_SOFA3_GREY = storageImg('drive/sofa_3seater_grey_recliner.jpg');
export const IMG_DRV_SOFA3_ESPRESSO = storageImg('drive/sofa_3seater_espresso_recliner.jpg');
export const IMG_DRV_CHAIR_ESPRESSO = storageImg('drive/chair_espresso_modern.jpg');
export const IMG_DRV_CHAIR_SAND = storageImg('drive/chair_sand_swivel.jpg');
export const IMG_DRV_SPEC_DIMENSIONS = storageImg('drive/recliner_dimensions_spec.jpg');
export const IMG_DRV_FACTORY_FLOOR = storageImg('drive/factory_floor_recliners.jpg');

/* Authentic Customer Delivery & Portrait Review Assets */
export const IMG_REVIEW_RECLINER_HOME = storageImg('catalog/review_recliner_home_1794978621438.jpg');
export const IMG_REVIEW_SOFA_HOME = storageImg('catalog/review_sofa_delivered_1794978624596.jpg');
export const IMG_REVIEW_SOFABED_HOME = storageImg('catalog/review_sofabed_home_1794978624350.jpg');
export const IMG_REVIEW_CHAIR_HOME = storageImg('catalog/review_chair_home_1794978641595.jpg');
export const IMG_REVIEW_AVATAR_MAN = storageImg('catalog/review_customer_avatar_1794978625502.jpg');
export const IMG_REVIEW_AVATAR_WOMAN = storageImg('catalog/review_woman_avatar_1794978642354.jpg');

/* 360° Revolving & Swivel Rocker Recliner Studio Photography */
export const IMG_REVOLVING_IVORY_LOUNGE = storageImg('uploads/WhatsApp_Image_2026-11-24_at_5.48.02_PM_2ca80368.jpeg');
export const IMG_REVOLVING_IVORY_RECLINED = storageImg('uploads/WhatsApp_Image_2026-11-24_at_5.47.49_PM_6b12b949.jpeg');
export const IMG_REVOLVING_DIMENSIONS_SPEC = storageImg('uploads/image_6647440f.png');
export const IMG_REVOLVING_COGNAC = storageImg('catalog/revolving_cognac_tan_1795584283993.jpg');
export const IMG_REVOLVING_CHARCOAL = storageImg('catalog/revolving_charcoal_suede_1795584284777.jpg');
export const IMG_REVOLVING_ESPRESSO = storageImg('catalog/revolving_espresso_brown_1795584290825.jpg');
export const IMG_REVOLVING_NAVY_MOTOR = storageImg('catalog/revolving_navy_motor_1795584288005.jpg');
export const IMG_REVOLVING_TAUPE_UPRIGHT = storageImg('catalog/revolving_taupe_upright_1795584290347.jpg');

/* Multi-Angle Revolving Recliner Shots (Same Product · Front, Reclined, Detail & Rear 3/4 Views) */
export const IMG_ORBIT_DETAIL = storageImg('catalog/orbit_detail_lever_1795584852794.jpg');
export const IMG_ORBIT_BACK = storageImg('catalog/orbit_back_angle_1795584853038.jpg');

export const IMG_AXIS_UPRIGHT = storageImg('catalog/axis_upright_front_1795584854505.jpg');
export const IMG_AXIS_DETAIL = storageImg('catalog/axis_detail_suede_1795584855931.jpg');
export const IMG_AXIS_BACK = storageImg('catalog/axis_back_angle_1795584857078.jpg');
export const IMG_AXIS_DIMENSIONS_SPEC = storageImg('catalog/axis_dimensions_spec_1795586016924.jpg');

export const IMG_ZENITH_RECLINED = storageImg('catalog/zenith_reclined_side_1795584859661.jpg');
export const IMG_ZENITH_DETAIL = storageImg('catalog/zenith_detail_usb_1795584859983.jpg');
export const IMG_ZENITH_BACK = storageImg('catalog/zenith_back_angle_1795584862891.jpg');
export const IMG_ZENITH_DIMENSIONS_SPEC = storageImg('catalog/zenith_dimensions_spec_1795586024698.jpg');

/* 7 distinct core manufactured categories */
export const CATEGORY_TILES: CategoryTile[] = [
  {
    id: 'cat-manual-recliners',
    label: 'MANUAL RECLINERS',
    sublabel: 'Side Lever Operated',
    room: 'Recliners',
    targetCategory: 'Manual Recliners',
    image: IMG_DRV_BLACK_MANUAL,
    startingPrice: 12999,
  },
  {
    id: 'cat-motorized-recliners',
    label: 'MOTORIZED RECLINERS',
    sublabel: 'Electric Push-Button',
    room: 'Recliners',
    targetCategory: 'Motorized Recliners',
    image: IMG_DRV_BEIGE_MOTOR,
    startingPrice: 19999,
  },
  {
    id: 'cat-revolving-manual',
    label: 'REVOLVING MANUAL',
    sublabel: '360° Swivel · Manual Lever',
    room: 'Recliners',
    targetCategory: 'Manual Revolving Recliners',
    image: IMG_REVOLVING_IVORY_LOUNGE,
    startingPrice: 17500,
  },
  {
    id: 'cat-revolving-motorized',
    label: 'REVOLVING MOTORIZED',
    sublabel: '360° Swivel · Push-Button',
    room: 'Recliners',
    targetCategory: 'Motorized Revolving Recliners',
    image: IMG_REVOLVING_NAVY_MOTOR,
    startingPrice: 24500,
  },
  {
    id: 'cat-custom-sofas',
    label: 'CUSTOM SOFA SETS',
    sublabel: 'Any Color, Fabric & Size',
    room: 'Sofa Sets',
    targetCategory: 'Sofa Sets',
    image: IMG_DRV_LSHAPE_BROWN,
    startingPrice: 30000,
  },
  {
    id: 'cat-electric-sofabed',
    label: 'ELECTRIC SOFA CUM BED',
    sublabel: 'Motor Forward-Extend',
    room: 'Electric Sofa Beds',
    targetCategory: 'Electric Sofa Beds',
    image: IMG_SOFA_CUM_BED,
    startingPrice: 49500,
  },
  {
    id: 'cat-home-lounge',
    label: 'MODERN HOME CHAIRS',
    sublabel: 'Modernist Accent Chairs',
    room: 'Home Chairs',
    targetCategory: 'Home Chairs',
    image: IMG_DRV_CHAIR_ESPRESSO,
    startingPrice: 9500,
  },
];

export const EXCLUSIVE_DEALS: DealCard[] = [
  {
    id: 'deal-recline',
    title: 'Manual & Motorized Cinema Recliners',
    highlight: 'Side Lever from ₹12,999 · Push-Button from ₹19,999',
    caption: 'Heavy-gauge steel glide linkages with optional swivel tray tables, cup holders & USB charging.',
    targetCategory: 'Motorized Recliners',
    image: IMG_DRV_CINEMA2_CHARCOAL_UP,
  },
  {
    id: 'deal-sofas',
    title: '100% Custom Recliner & L-Shape Sofa Sets',
    highlight: 'Starting ₹30,000 · Made in Your Color & Size',
    caption: 'Built directly in our manufacturing unit with 40-density HR foam & pocket springs.',
    targetCategory: 'Sofa Sets',
    image: IMG_DRV_SOFASET_321,
  },
  {
    id: 'deal-electric-bed',
    title: 'Electric Forward-Extend Sofa Bed',
    highlight: 'One-Touch Motor Conversion from ₹49,500',
    caption: 'Glides forward effortlessly via push-button control into a full sleeper bed.',
    targetCategory: 'Electric Sofa Beds',
    image: IMG_SOFA_CUM_BED,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'zss-sultan-motor-recliner',
    name: 'Zain Sultan Motorized Push-Button Recliner',
    subtitle: 'Motorized Recliner · Side Push-Button + USB',
    category: 'Motorized Recliners',
    room: 'Recliners',
    mechanism: 'Motorized Push-Button',
    price: 19999,
    mrp: 29999,
    rating: 4.9,
    reviewCount: 312,
    image: IMG_DRV_BEIGE_MOTOR,
    gallery: [
      IMG_DRV_BEIGE_MOTOR,
      IMG_SULTAN_RECLINED,
      IMG_SULTAN_DETAIL,
      IMG_SULTAN_BACK,
      IMG_DRV_SPEC_DIMENSIONS,
    ],
    galleryLabels: [
      'Front 3/4 View',
      'Reclined Side View',
      'USB & Switch Detail',
      'Rear 3/4 View',
      'Dimensions Guide',
    ],
    tag: 'Electric Push-Button',
    dimensions: '93 cm W × 96 cm D × 104 cm H (162 cm Reclined)',
    frameMaterial: 'Seasoned Hardwood Frame + Okin 24V Silent Actuator + Heavy Steel Chassis',
    foamAndSpring: '40-Density Super-Soft HR Foam + Pocket Spring Core',
    warranty: '5-Year Frame & 3-Year Electric Motor Warranty',
    deliveryEstimate: 'Factory Dispatch in 5–7 Days',
    description:
      'Operated effortlessly via sleek side push-buttons that glide the backrest and footrest into infinite micro-angles. Built in-house with whisper-quiet motorized hardware, integrated USB charging port, and customizable leatherette or suede colors.',
    customizableOptions: ['Custom Color Swatch', 'Leatherette or Suede', 'USB + Cup Holder Trim'],
    variants: [
      { label: '1-Seater Push-Button', dimensions: '93 cm W × 96 cm D × 104 cm H', priceDelta: 0, image: IMG_DRV_BEIGE_MOTOR },
      { label: '1-Seater + Swivel Tray & Cup Holders', dimensions: '95 cm W × 96 cm D × 104 cm H', priceDelta: 3500, image: IMG_DRV_CREAM_TRAY },
      { label: '2-Seater Cinema Console', dimensions: '176 cm W × 96 cm D × 104 cm H', priceDelta: 19000 },
    ],
    finishes: [
      { name: 'Champagne Cream', swatchHex: '#DFD2BD', upholstery: 'Breathable Pro Leatherette', image: IMG_DRV_BEIGE_MOTOR },
      { name: 'Saddle Cognac', swatchHex: '#B66338', upholstery: 'Breathable Pro Leatherette', image: IMG_DRV_COGNAC_USB },
      { name: 'Charcoal Slate', swatchHex: '#3A3D42', upholstery: 'Matte Molfino Suede', image: IMG_DRV_CHARCOAL_SLATE },
      { name: 'Espresso Brown', swatchHex: '#433029', upholstery: 'Breathable Pro Leatherette', image: IMG_DRV_ESPRESSO_BROWN },
    ],
  },
  {
    id: 'zss-nawab-manual-recliner',
    name: 'Zain Nawab Manual Side-Lever Recliner Chair',
    subtitle: 'Manual Recliner · Heavy-Duty Side Lever',
    category: 'Manual Recliners',
    room: 'Recliners',
    mechanism: 'Manual Lever',
    price: 12999,
    mrp: 19999,
    rating: 4.8,
    reviewCount: 248,
    image: IMG_DRV_BLACK_MANUAL,
    gallery: [
      IMG_DRV_BLACK_MANUAL,
      IMG_NAWAB_RECLINED,
      IMG_NAWAB_DETAIL,
      IMG_NAWAB_BACK,
      IMG_DRV_SPEC_DIMENSIONS,
    ],
    galleryLabels: [
      'Front 3/4 View',
      'Reclined Side View',
      'Side Lever & Seam',
      'Rear 3/4 View',
      'Dimensions Guide',
    ],
    tag: 'Manual Side Lever',
    dimensions: '93 cm W × 96 cm D × 104 cm H',
    frameMaterial: 'Kiln-Dried Pinewood + High-Tensile Manual Lever Steel Mechanism',
    foamAndSpring: '3-Zone 40-Density HR Foam + Elastic Webbing Support',
    warranty: '5-Year Structural & Lever Linkage Warranty',
    deliveryEstimate: 'Ready to Dispatch in 3–5 Days',
    description:
      'Operated smoothly by pulling our ergonomic recessed side lever—requiring zero wall plug or power socket. Ideal for bedrooms, reading balconies, and sunlit living corners with 360-degree rocker/swivel option available on request.',
    customizableOptions: ['Custom Fabric or Leatherette', 'Rocker Swivel Option', '2-Seater Love Seat Custom'],
    variants: [
      { label: '1-Seater Fixed Base', dimensions: '93 cm W × 96 cm D × 104 cm H', priceDelta: 0, image: IMG_DRV_BLACK_MANUAL },
      { label: '1-Seater 360° Rocker Swivel', dimensions: '93 cm W × 96 cm D × 104 cm H', priceDelta: 4501 },
      { label: '2-Seater Manual Love Seat', dimensions: '158 cm W × 96 cm D × 104 cm H', priceDelta: 12000 },
    ],
    finishes: [
      { name: 'Jet Matte Black', swatchHex: '#252629', upholstery: 'Breathable Pro Leatherette', image: IMG_DRV_BLACK_MANUAL },
      { name: 'Terracotta Suede', swatchHex: '#B85D32', upholstery: 'Soft Matte Molfino Suede', image: IMG_DRV_TERRACOTTA_MANUAL },
      { name: 'Mustard Ochre', swatchHex: '#D19A24', upholstery: 'Textured Velvet Suede', image: IMG_DRV_MUSTARD_MANUAL },
    ],
  },
  {
    id: 'zss-imperial-cinema-recliner',
    name: 'Zain Imperial Cinema Recliner with Swivel Tray',
    subtitle: 'Motorized Cinema Seat · Cup Holders + USB + Tray',
    category: 'Motorized Recliners',
    room: 'Recliners',
    mechanism: 'Motorized Push-Button',
    price: 19999,
    mrp: 30999,
    rating: 4.9,
    reviewCount: 204,
    image: IMG_DRV_NAVY_TRAY,
    gallery: [
      IMG_DRV_NAVY_TRAY,
      IMG_IMPERIAL_RECLINED,
      IMG_IMPERIAL_DETAIL,
      IMG_IMPERIAL_BACK,
    ],
    galleryLabels: [
      'Front Cinema View',
      'Reclined with Tray',
      'Tray, Cupholder & USB',
      'Rear 3/4 View',
    ],
    tag: 'Tray + Cup Holders',
    dimensions: '94 cm W × 96 cm D × 105 cm H',
    frameMaterial: 'Reinforced Cinema Steel Chassis + Okin 24V Motor + Brushed USB Switch',
    foamAndSpring: 'High-Loft 40-Density HR Foam + Diamond-Quilted Arm Panels',
    warranty: '5-Year Frame & 3-Year Electric Actuator Warranty',
    deliveryEstimate: 'Factory Dispatch in 5–7 Days',
    description:
      'Engineered for dedicated home theatres and executive lounges. Features dual integrated armrest cup holders, a removable 360-degree wooden swivel tray table, brushed metal USB electric buttons, and custom diamond-stitched upholstery.',
    customizableOptions: ['Wood or Matte Black Tray', 'Diamond Quilted Arms', 'Single or Multi-Seat Row'],
    variants: [
      { label: '1-Seater Cinema + Tray', dimensions: '94 cm W × 96 cm D × 105 cm H', priceDelta: 0, image: IMG_DRV_NAVY_TRAY },
      { label: 'Pair of 2 Individual Seats', dimensions: '2 × (94 cm W × 96 cm D)', priceDelta: 19000 },
      { label: '3-Seater Connected Row', dimensions: '248 cm W × 96 cm D × 105 cm H', priceDelta: 38000 },
    ],
    finishes: [
      { name: 'Midnight Navy', swatchHex: '#233146', upholstery: 'Pro Grain Leatherette', image: IMG_DRV_NAVY_TRAY },
      { name: 'Sandstone Quilted', swatchHex: '#D8C7B2', upholstery: 'Diamond-Stitched Leatherette', image: IMG_DRV_SAND_TRAY },
      { name: 'Royal Blue Suede', swatchHex: '#234490', upholstery: 'Velvet-Touch Suede', image: IMG_DRV_ROYAL_USB },
      { name: 'Caramel Tan', swatchHex: '#C69049', upholstery: 'Pro Grain Leatherette', image: IMG_DRV_CARAMEL_TRAY },
    ],
  },
  {
    id: 'zss-noor-sectional-custom',
    name: 'Zain Noor L-Shape Custom Recliner Sectional Sofa',
    subtitle: 'Sofa Sets · L-Shape Corner with Built-In Recliner',
    category: 'Sofa Sets',
    room: 'Sofa Sets',
    mechanism: 'Both Options',
    price: 30000,
    mrp: 45000,
    rating: 4.9,
    reviewCount: 289,
    image: IMG_DRV_LSHAPE_BROWN,
    gallery: [
      IMG_DRV_LSHAPE_BROWN,
      IMG_NOOR_RECLINED,
      IMG_NOOR_DETAIL,
      IMG_NOOR_OPPOSITE,
    ],
    galleryLabels: [
      'Front Room View',
      'Recliner Extended',
      'Suede & Seam Detail',
      'Rear & Corner Angle',
    ],
    tag: 'Custom L-Shape',
    dimensions: '275 cm W × 210 cm D × 98 cm H (Custom Wall Sizes)',
    frameMaterial: 'Seasoned Hardwood Box Frame + Steel Recliner Corner Modules',
    foamAndSpring: 'Dual-Layer 40-Density HR Foam + Plush Pillow-Back Cushions',
    warranty: '5-Year Frame & Cushion Core Warranty',
    deliveryEstimate: 'Custom Built in 7–12 Days',
    description:
      'Configured directly to your living room wall measurements with choice of Left or Right corner layout. Combine fixed deep-seating modules with manual or motorized reclining seats on either end straight from our factory floor.',
    customizableOptions: ['Left / Right Corner', '1 or 2 Built-In Recliners', '20+ Factory Fabrics'],
    variants: [
      { label: '5-Seater L-Shape + 1 Manual Recliner', dimensions: '275 cm × 210 cm × 98 cm H', priceDelta: 0, image: IMG_DRV_LSHAPE_BROWN },
      { label: '6-Seater L-Shape + 2 Manual Recliners', dimensions: '295 cm × 230 cm × 98 cm H', priceDelta: 9000 },
      { label: '6-Seater L-Shape + Dual Motorized Seats', dimensions: '295 cm × 230 cm × 98 cm H', priceDelta: 16000 },
    ],
    finishes: [
      { name: 'Warm Walnut Suede', swatchHex: '#7A5B47', upholstery: 'Spill-Guard Matte Suede', image: IMG_DRV_LSHAPE_BROWN },
      { name: 'Taupe Linen', swatchHex: '#A6907E', upholstery: 'Heavy Woven Linen', image: IMG_DRV_LSHAPE_TAUPE },
      { name: 'Ivory Bouclé', swatchHex: '#EDE6DA', upholstery: 'Loop-Pile Bouclé', image: IMG_SOFA_MODULAR },
    ],
  },
  {
    id: 'zss-sukun-electric-sofabed',
    name: 'Zain Sukun Electric Extendable Sofa Cum Bed',
    subtitle: 'Electric Sofa Bed · Motorized Forward Extension',
    category: 'Electric Sofa Beds',
    room: 'Electric Sofa Beds',
    mechanism: 'Motorized Push-Button',
    price: 49500,
    mrp: 72999,
    rating: 4.9,
    reviewCount: 221,
    image: IMG_SOFA_CUM_BED,
    gallery: [
      IMG_SOFA_CUM_BED,
      IMG_SOFABED_125,
      IMG_SOFABED_156,
      IMG_SOFABED_STEP1,
      IMG_SOFABED_STEP2,
    ],
    galleryLabels: [
      'Upright 3-Seater Sofa',
      '125 cm Lounger Mode',
      '156 cm Sleeper Bed',
      'Electric Switch Detail',
      'Steel Rail Mechanism',
    ],
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
      { label: '2-Seater Compact (5.5 ft)', dimensions: '168 cm W × 92–156 cm D', priceDelta: -4500 },
      { label: '3-Seater Standard (6.5 ft)', dimensions: '198 cm W × 92–156 cm D', priceDelta: 0, image: IMG_SOFA_CUM_BED },
      { label: 'King Sleeper (7 ft + USB)', dimensions: '214 cm W × 96–164 cm D', priceDelta: 7500, image: IMG_SOFABED_156 },
    ],
    finishes: [
      { name: 'Oatmeal Melange', swatchHex: '#CFC6B8', upholstery: 'Heavy Textured Linen', image: IMG_SOFA_CUM_BED },
      { name: 'Charcoal Ash', swatchHex: '#4A4E54', upholstery: 'Performance Upholstery', image: IMG_VAR_SOFABED_CHARCOAL },
      { name: 'Caramel Suede', swatchHex: '#9C582B', upholstery: 'Soft Matte Suede', image: IMG_VAR_SOFABED_CARAMEL },
    ],
  },
  {
    id: 'zss-majlis-dual-recliner',
    name: 'Zain Majlis 2-Seater Cinema Recliner with Trays',
    subtitle: 'Motorized Cinema Loveseat · Quilted Arms & Trays',
    category: 'Motorized Recliners',
    room: 'Recliners',
    mechanism: 'Both Options',
    price: 39999,
    mrp: 58999,
    rating: 4.9,
    reviewCount: 176,
    image: IMG_DRV_CINEMA2_CHARCOAL_UP,
    gallery: [
      IMG_DRV_CINEMA2_CHARCOAL_UP,
      IMG_DRV_CINEMA2_CHARCOAL_REC,
      IMG_MAJLIS_DETAIL,
      IMG_MAJLIS_SIDE,
    ],
    galleryLabels: [
      'Front Upright View',
      'Dual Reclined View',
      'Tray & Control Detail',
      'Rear & Quilted Side',
    ],
    tag: 'Dual Cinema Seats',
    dimensions: '176 cm W × 96 cm D × 104 cm H (162 cm Reclined)',
    frameMaterial: 'Heavy-Gauge Twin Cinema Chassis + Diamond-Quilted Side Consoles',
    foamAndSpring: '40-Density HR Foam + Dual Independent Pocket Springs',
    warranty: '5-Year Frame & 3-Year Mechanism Warranty',
    deliveryEstimate: 'Custom Built in 7–10 Days',
    description:
      'Two plush independently reclining home-theatre seats with removable swivel wooden snack trays, concealed cup holders, and optional center storage console. Available in charcoal suede, cognac leatherette, olive green, or matte black.',
    customizableOptions: ['Manual or Electric Action', 'Center Storage Console', 'Swivel Wood Trays'],
    variants: [
      { label: '2-Seater Dual Motorized + Trays', dimensions: '176 cm W × 96 cm D × 104 cm H', priceDelta: 0, image: IMG_DRV_CINEMA2_CHARCOAL_UP },
      { label: '2-Seater Motorized + Storage Console', dimensions: '192 cm W × 96 cm D × 104 cm H', priceDelta: 6000, image: IMG_DRV_CINEMA2_CHARCOAL_REC },
      { label: '2-Seater Twin Manual + Trays', dimensions: '176 cm W × 96 cm D × 104 cm H', priceDelta: -9000 },
    ],
    finishes: [
      { name: 'Charcoal Slate Suede', swatchHex: '#3B3E44', upholstery: 'Diamond-Quilted Molfino Suede', image: IMG_DRV_CINEMA2_CHARCOAL_UP },
      { name: 'Cognac Hide', swatchHex: '#B66338', upholstery: 'Breathable Pro Leatherette', image: IMG_DRV_CINEMA2_COGNAC },
      { name: 'Olive Emerald', swatchHex: '#3D5234', upholstery: 'Quilted Grain Leatherette', image: IMG_DRV_CINEMA2_OLIVE },
      { name: 'Matte Jet Black', swatchHex: '#252629', upholstery: 'Breathable Pro Leatherette', image: IMG_DRV_CINEMA2_BLACK },
    ],
  },
  {
    id: 'zss-aura-fabric-recliner',
    name: 'Zain Aura Ivory Fabric Manual Lever Recliner',
    subtitle: 'Manual Recliner · Breathable Soft Weave Fabric',
    category: 'Manual Recliners',
    room: 'Recliners',
    mechanism: 'Manual Lever',
    price: 12999,
    mrp: 19999,
    rating: 4.8,
    reviewCount: 164,
    image: IMG_DRV_IVORY_MANUAL,
    gallery: [
      IMG_DRV_IVORY_MANUAL,
      IMG_AURA_RECLINED,
      IMG_AURA_DETAIL,
      IMG_AURA_BACK,
    ],
    galleryLabels: [
      'Front 3/4 View',
      'Reclined Side View',
      'Fabric Weave & Lever',
      'Rear 3/4 View',
    ],
    tag: 'Cool Breathable Fabric',
    dimensions: '90 cm W × 94 cm D × 102 cm H',
    frameMaterial: 'Seasoned Hardwood Frame + Zero-Electricity Side Lever Mechanism',
    foamAndSpring: '40-Density Cool-Touch HR Foam + Soft Pillow Armrests',
    warranty: '5-Year Structural & Lever Linkage Warranty',
    deliveryEstimate: 'Ships in 4–6 Days',
    description:
      'Tailored in airy woven upholstery that stays cool during Indian summers. Pull the side lever to kick up the full-length padded footrest—ideal for sunlit apartments, nursing corners, and everyday living rooms.',
    customizableOptions: ['Summer-Cool Linen Weave', '360° Swivel Rocker Base', '15+ Pastel & Jewel Shades'],
    variants: [
      { label: '1-Seater Manual Lever', dimensions: '90 cm W × 94 cm D × 102 cm H', priceDelta: 0, image: IMG_DRV_IVORY_MANUAL },
      { label: '1-Seater Rocker + Swivel', dimensions: '90 cm W × 95 cm D × 103 cm H', priceDelta: 4501 },
      { label: '1-Seater Push-Button Electric', dimensions: '90 cm W × 94 cm D × 102 cm H', priceDelta: 7000 },
    ],
    finishes: [
      { name: 'Ivory Oat Fabric', swatchHex: '#E5DFD5', upholstery: 'Breathable Textured Weave', image: IMG_DRV_IVORY_MANUAL },
      { name: 'Cloud Mist Grey', swatchHex: '#C5C3C0', upholstery: 'Breathable Textured Weave', image: IMG_DRV_GREY_FABRIC_EXT },
      { name: 'Peacock Teal Velvet', swatchHex: '#0F6F8C', upholstery: '380 GSM Soft Velvet', image: IMG_DRV_TEAL_UPRIGHT },
    ],
  },
  {
    id: 'zss-mirza-custom-sofa',
    name: 'Zain Mirza 3+2+1 Full Living Room Recliner Set',
    subtitle: 'Sofa Sets · Complete Living Room Factory Custom Suite',
    category: 'Sofa Sets',
    room: 'Sofa Sets',
    mechanism: 'Both Options',
    price: 30000,
    mrp: 45999,
    rating: 4.9,
    reviewCount: 364,
    image: IMG_DRV_SOFASET_321,
    gallery: [
      IMG_DRV_SOFASET_321,
      IMG_MIRZA_RECLINED,
      IMG_DRV_SOFA3_ESPRESSO,
      IMG_MIRZA_DETAIL,
    ],
    galleryLabels: [
      '3+2+1 Full Suite',
      'Reclined Action View',
      '3-Seater Front View',
      'Leatherette & Seam Detail',
    ],
    tag: '3+2+1 Full Suite',
    dimensions: '3-Seat (215 cm) + 2-Seat (158 cm) + 1-Seat Recliner (93 cm)',
    frameMaterial: 'Kiln-Dried Meranti Hardwood & Heavy-Gauge Steel Recliner Mechanisms',
    foamAndSpring: '40-Density HR Foam + Heavy Zigzag Spring Seat Deck',
    warranty: '5-Year Manufacturing Structural Warranty',
    deliveryEstimate: 'Custom Built in 7–10 Days',
    description:
      'Complete living room seating suite manufactured to order in our own factory. Choose which seats recline (manual lever or electric push-button), select from 20+ leatherette or fabric shades, and adjust widths to fit your exact living hall.',
    customizableOptions: ['Buy 3-Seater Alone or 3+2+1', 'Custom Width & Depth', '20+ Factory Colors'],
    variants: [
      { label: '3+2 Living Sofa Set (5-Seater)', dimensions: '215 cm + 158 cm W × 96 cm D', priceDelta: 0, image: IMG_DRV_SOFA3_ESPRESSO },
      { label: '3+2+1 Complete 6-Seater Suite', dimensions: '215 cm + 158 cm + 93 cm W', priceDelta: 12000, image: IMG_DRV_SOFASET_321 },
      { label: '3+2+1 Suite + Dual Motorized Seats', dimensions: '215 cm + 158 cm + 93 cm W', priceDelta: 22000 },
    ],
    finishes: [
      { name: 'Espresso Mocha', swatchHex: '#4A3731', upholstery: 'Pro Grain Leatherette', image: IMG_DRV_SOFASET_321 },
      { name: 'Warm Ash Grey', swatchHex: '#7A7876', upholstery: 'Soft Matte Suede', image: IMG_DRV_SOFA3_GREY },
      { name: 'Cognac Tan', swatchHex: '#9C582B', upholstery: 'Breathable Pro Leatherette', image: IMG_VAR_SOFASET_COGNAC },
    ],
  },
  {
    id: 'zss-aranya-modern-chair',
    name: 'Zain Aranya Slim-Arm Modernist Push-Back Chair',
    subtitle: 'Home Chairs · Compact Architectural Profile',
    category: 'Home Chairs',
    room: 'Home Chairs',
    mechanism: 'Manual Lever',
    price: 9500,
    mrp: 14500,
    rating: 4.8,
    reviewCount: 192,
    image: IMG_DRV_CHAIR_ESPRESSO,
    gallery: [
      IMG_DRV_CHAIR_ESPRESSO,
      IMG_ARANYA_RECLINED,
      IMG_ARANYA_DETAIL,
      IMG_ARANYA_BACK,
    ],
    galleryLabels: [
      'Front 3/4 View',
      'Push-Back Reclined',
      'Armrest & Leg Detail',
      'Rear 3/4 View',
    ],
    tag: 'Modernist Profile',
    dimensions: '74 cm W × 84 cm D × 100 cm H',
    frameMaterial: 'Solid Seasoned Hardwood Legs & Smooth Push-Back Recline Mechanism',
    foamAndSpring: 'Contoured High-Resilience Foam with Tailored Lumbar Bolster',
    warranty: '3-Year Structural & Mechanism Warranty',
    deliveryEstimate: 'Ships in 4–6 Days',
    description:
      'A sleek, space-saving modernist armchair that looks like a tailored accent piece upright yet gently reclines back when you lean in. Built for compact bedrooms, living corners, and executive reading rooms.',
    customizableOptions: ['Fixed or Push-Back Action', 'Leatherette or Textured Fabric', 'Pair Discount Available'],
    variants: [
      { label: 'Single Push-Back Chair', dimensions: '74 cm W × 84 cm D × 100 cm H', priceDelta: 0, image: IMG_DRV_CHAIR_ESPRESSO },
      { label: 'Single Chair + Swivel Base', dimensions: '74 cm W × 84 cm D × 100 cm H', priceDelta: 2500 },
      { label: 'Pair of 2 Chairs', dimensions: '2 × (74 cm W × 84 cm D)', priceDelta: 8500 },
    ],
    finishes: [
      { name: 'Espresso Leatherette', swatchHex: '#3B2B28', upholstery: 'Matte Grain Leatherette', image: IMG_DRV_CHAIR_ESPRESSO },
      { name: 'Warm Sand Linen', swatchHex: '#BFA792', upholstery: 'Woven Performance Fabric', image: IMG_DRV_CHAIR_SAND },
      { name: 'Sage Velvet', swatchHex: '#5E7560', upholstery: '380 GSM Cotton Velvet', image: IMG_VAR_CHAIR_SAGE },
    ],
  },
  {
    id: 'zss-harmony-manual-loveseat',
    name: 'Zain Harmony 2-Seater Manual Recliner Loveseat',
    subtitle: 'Manual Recliners · Dual Independent Footrests',
    category: 'Manual Recliners',
    room: 'Recliners',
    mechanism: 'Manual Lever',
    price: 25999,
    mrp: 38999,
    rating: 4.8,
    reviewCount: 138,
    image: IMG_DRV_LOVESEAT_CHARCOAL,
    gallery: [
      IMG_DRV_LOVESEAT_CHARCOAL,
      IMG_HARMONY_RECLINED,
      IMG_HARMONY_DETAIL,
      IMG_HARMONY_BACK,
      IMG_DRV_SPEC_DIMENSIONS,
    ],
    galleryLabels: [
      'Front Upright View',
      'Dual Recline Action',
      'Suede & Lever Detail',
      'Rear 3/4 View',
      'Dimensions Guide',
    ],
    tag: '2-Seater Loveseat',
    dimensions: '158 cm W × 94 cm D × 102 cm H',
    frameMaterial: 'Kiln-Dried Hardwood + Dual Side-Lever Steel Mechanisms',
    foamAndSpring: '40-Density Plush HR Foam + Split-Back Lumbar Cushions',
    warranty: '5-Year Frame & Lever Linkage Warranty',
    deliveryEstimate: 'Factory Dispatch in 5–7 Days',
    description:
      'Compact 2-seater sofa where both left and right seats recline independently via discreet side pull levers—giving couples full lounge comfort without needing the footprint of a 3-seater.',
    customizableOptions: ['Upgrade to Electric Buttons', 'Matching 1-Seater Available', '20+ Suede & Fabric Colors'],
    variants: [
      { label: '2-Seater Twin Manual Lever', dimensions: '158 cm W × 94 cm D × 102 cm H', priceDelta: 0, image: IMG_DRV_LOVESEAT_CHARCOAL },
      { label: '2-Seater Twin Motorized Button', dimensions: '158 cm W × 94 cm D × 102 cm H', priceDelta: 12000 },
      { label: '3-Seater Matching Recliner Sofa', dimensions: '212 cm W × 94 cm D × 102 cm H', priceDelta: 9000 },
    ],
    finishes: [
      { name: 'Charcoal Mist Suede', swatchHex: '#51565E', upholstery: 'Soft Brushed Suede', image: IMG_DRV_LOVESEAT_CHARCOAL },
      { name: 'Warm Greige Taupe', swatchHex: '#ABA198', upholstery: 'Easy-Clean Matte Suede', image: IMG_DRV_LOVESEAT_TAUPE },
      { name: 'Deep Navy Plush', swatchHex: '#25396B', upholstery: 'Plush Brushed Suede', image: IMG_VAR_LOVESEAT_NAVY },
    ],
  },
  {
    id: 'zss-royale-theatre-row',
    name: 'Zain Royale 3-Seater Home Theatre Recliner Row',
    subtitle: 'Motorized Cinema Row · 3 Independent Push-Button Seats',
    category: 'Motorized Recliners',
    room: 'Recliners',
    mechanism: 'Motorized Push-Button',
    price: 58999,
    mrp: 84999,
    rating: 4.9,
    reviewCount: 152,
    image: IMG_DRV_CINEMA3_GREY,
    gallery: [
      IMG_DRV_CINEMA3_GREY,
      IMG_ROYALE_RECLINED,
      IMG_ROYALE_DETAIL,
      IMG_ROYALE_SIDE,
    ],
    galleryLabels: [
      'Front Row View',
      'Reclined Theatre View',
      'Cupholder & USB Panel',
      'Rear & Side Angle',
    ],
    tag: 'Home Theatre Row',
    dimensions: '248 cm W × 96 cm D × 104 cm H (Custom 3 to 6 Seats)',
    frameMaterial: 'Commercial-Grade Home Theatre Steel Frame + Triple Okin 24V Motors',
    foamAndSpring: 'High-Resilience 40-Density Cinema Foam + Integrated Cup Holders',
    warranty: '5-Year Frame & 3-Year Electric Motor Warranty',
    deliveryEstimate: 'Custom Built in 7–12 Days',
    description:
      'Purpose-built straight or curved home cinema rows manufactured directly in our workshop for villas, basement theatres, and family lounges. Every seat includes smooth electric recline, armrest cup holders, and optional swivel trays.',
    customizableOptions: ['Straight or Curved Row', '3, 4, or 5-Seat Custom', 'LED Cup Holders & Trays'],
    variants: [
      { label: '3-Seater Straight Motorized Row', dimensions: '248 cm W × 96 cm D × 104 cm H', priceDelta: 0, image: IMG_DRV_CINEMA3_GREY },
      { label: '4-Seater Curved Cinema Row', dimensions: '332 cm W × 98 cm D × 104 cm H', priceDelta: 19000 },
      { label: '3-Seater Manual Lever Row', dimensions: '248 cm W × 96 cm D × 104 cm H', priceDelta: -15000 },
    ],
    finishes: [
      { name: 'Dove Cinema Grey', swatchHex: '#8C8E92', upholstery: 'Pro Grain Leatherette', image: IMG_DRV_CINEMA3_GREY },
      { name: 'Theatre Matte Black', swatchHex: '#24262A', upholstery: 'Pro Grain Leatherette', image: IMG_DRV_CINEMA3_BLACK },
      { name: 'Saddle Cognac', swatchHex: '#A65D37', upholstery: 'Diamond-Stitched Leatherette', image: IMG_DRV_CINEMA4_COGNAC },
      { name: 'Crimson Theatre Red', swatchHex: '#7E1F28', upholstery: 'Pro Grain Leatherette', image: IMG_DRV_CINEMA4_CRIMSON },
    ],
  },
  {
    id: 'zss-verve-modern-homechair',
    name: 'Zain Verve Swivel Modernist Reading & Cloud Chair',
    subtitle: 'Home Chairs · 360° Swivel Base & Tailored Backrest',
    category: 'Home Chairs',
    room: 'Home Chairs',
    mechanism: 'Manual Lever',
    price: 9500,
    mrp: 14999,
    rating: 4.8,
    reviewCount: 149,
    image: IMG_DRV_CHAIR_SAND,
    gallery: [
      IMG_DRV_CHAIR_SAND,
      IMG_VERVE_RECLINED,
      IMG_VERVE_DETAIL,
      IMG_VERVE_BACK,
    ],
    galleryLabels: [
      'Front 3/4 View',
      'Reclined Side Profile',
      'Linen & 360° Base Detail',
      'Rear 3/4 View',
    ],
    tag: '360° Swivel Base',
    dimensions: '76 cm W × 86 cm D × 101 cm H',
    frameMaterial: 'Heavy Powder-Coated 360° Steel Swivel Ring + Hardwood Frame',
    foamAndSpring: 'Molded High-Density Seat Core + Ergonomic Neck Bolster',
    warranty: '3-Year Swivel & Mechanism Warranty',
    deliveryEstimate: 'Ships in 4–6 Days',
    description:
      'Clean-lined swivel lounge chair engineered for modern bedrooms, study corners, and nursery rooms—combining 360-degree rotation with a discreet side-lever footrest so you can read, work, or unwind effortlessly.',
    customizableOptions: ['360° Swivel + Rocker', 'Fabric or Leatherette', 'Custom Neutral or Bold Shades'],
    variants: [
      { label: '360° Swivel Manual Chair', dimensions: '76 cm W × 86 cm D × 101 cm H', priceDelta: 0, image: IMG_DRV_CHAIR_SAND },
      { label: 'Cloud-Plush Deep Rocker Edition', dimensions: '88 cm W × 94 cm D × 104 cm H', priceDelta: 3500 },
    ],
    finishes: [
      { name: 'Warm Sand Weave', swatchHex: '#C2AA93', upholstery: 'Textured Cotton Linen', image: IMG_DRV_CHAIR_SAND },
      { name: 'Royal Cloud Navy', swatchHex: '#263B70', upholstery: 'Plush Tufted Velvet', image: IMG_DRV_NAVY_CLOUD },
      { name: 'Pure Ivory White', swatchHex: '#F3F1EC', upholstery: 'Easy-Wipe Leatherette', image: IMG_DRV_WHITE_SWIVEL },
    ],
  },
  {
    id: 'zss-orbit-revolving-recliner',
    name: 'Zain Orbit 360° Manual Lever Revolving Recliner',
    subtitle: 'Manual Revolving · 360° Swivel Base + Side Lever',
    category: 'Manual Revolving Recliners',
    room: 'Recliners',
    mechanism: 'Manual Lever',
    price: 17500,
    mrp: 26500,
    rating: 4.9,
    reviewCount: 186,
    image: IMG_REVOLVING_IVORY_LOUNGE,
    gallery: [
      IMG_REVOLVING_IVORY_LOUNGE,
      IMG_REVOLVING_IVORY_RECLINED,
      IMG_ORBIT_DETAIL,
      IMG_ORBIT_BACK,
      IMG_REVOLVING_DIMENSIONS_SPEC,
    ],
    galleryLabels: [
      'Front 3/4 Lounge View',
      'Full Recline & 360° Base',
      'Side Lever & Seam Detail',
      'Rear 3/4 View',
      'Dimensions Guide',
    ],
    tag: 'Manual Lever · 360°',
    dimensions: '92 cm W × 101.6 cm D × 109.2 cm H (Seat Height: 49 cm)',
    frameMaterial: 'Heavy-Duty 360° Circular Steel Swivel Ring + Dual Rocker Springs + Hardwood Frame',
    foamAndSpring: '3-Tier Pillow-Back 40-Density HR Foam + Pocket Spring Seat',
    warranty: '5-Year Frame & 360° Swivel Ring Warranty',
    deliveryEstimate: 'Ready to Dispatch in 4–6 Days',
    description:
      'Engineered on a heavy-gauge circular 360-degree steel swivel base with smooth rocking springs and a recessed side pull-lever. Plush 3-tier tufted pillow backrest and overstuffed armrests deliver cloud-like full-body support in any direction you turn.',
    customizableOptions: ['Custom Leatherette or Suede', 'Manual Lever Swivel + Rocker', '30+ Factory Shade Swatches'],
    variants: [
      { label: '360° Revolving + Rocker (Manual Lever)', dimensions: '92 cm W × 101.6 cm D × 109.2 cm H', priceDelta: 0, image: IMG_REVOLVING_IVORY_LOUNGE },
      { label: '360° Revolving Full Recline + Rock Lock', dimensions: '92 cm W × 101.6 cm D × 109.2 cm H', priceDelta: 2000, image: IMG_REVOLVING_IVORY_RECLINED },
    ],
    finishes: [
      { name: 'Pure Ivory Cream', swatchHex: '#F3F0E8', upholstery: 'Breathable Pro Leatherette', image: IMG_REVOLVING_IVORY_LOUNGE },
      { name: 'Saddle Cognac Tan', swatchHex: '#AE6336', upholstery: 'Breathable Pro Leatherette', image: IMG_REVOLVING_COGNAC },
      { name: 'Espresso Chocolate', swatchHex: '#422B23', upholstery: 'Breathable Pro Leatherette', image: IMG_REVOLVING_ESPRESSO },
      { name: 'Charcoal Slate Suede', swatchHex: '#4C4F54', upholstery: 'Soft Matte Molfino Suede', image: IMG_REVOLVING_CHARCOAL },
    ],
  },
  {
    id: 'zss-axis-suede-revolving-recliner',
    name: 'Zain Axis 360° Manual Lever Suede Revolving Recliner',
    subtitle: 'Manual Revolving · Plush Molfino Suede + Side Lever',
    category: 'Manual Revolving Recliners',
    room: 'Recliners',
    mechanism: 'Manual Lever',
    price: 17500,
    mrp: 26999,
    rating: 4.9,
    reviewCount: 142,
    image: IMG_AXIS_UPRIGHT,
    gallery: [
      IMG_AXIS_UPRIGHT,
      IMG_REVOLVING_CHARCOAL,
      IMG_AXIS_DETAIL,
      IMG_AXIS_BACK,
      IMG_AXIS_DIMENSIONS_SPEC,
    ],
    galleryLabels: [
      'Front 3/4 View',
      'Reclined & 360° Spring Base',
      'Suede & Lever Detail',
      'Rear 3/4 View',
      'Dimensions Guide',
    ],
    tag: 'Manual Lever · Swivel',
    dimensions: '92 cm W × 101.6 cm D × 109.2 cm H (Seat Height: 49 cm)',
    frameMaterial: 'Powder-Coated 360° Circular Steel Ring + Coil Rocker Chassis + Pinewood Core',
    foamAndSpring: 'Triple-Channel Cloud Backrest + 40-Density HR Cushioning',
    warranty: '5-Year Structural & Swivel Mechanism Warranty',
    deliveryEstimate: 'Factory Dispatch in 5–7 Days',
    description:
      'Wrapped in breathable velvet-touch Molfino suede over our signature 360-degree revolving coil-rocker chassis with a zero-electricity side pull-lever. Effortlessly pivot toward the TV, window, or conversation while enjoying gentle rocking and deep leg-rest elevation.',
    customizableOptions: ['Molfino Suede or Linen Fabric', 'Stain-Guard Upholstery', 'Optional Side Storage Pocket'],
    variants: [
      { label: '1-Seater 360° Manual Lever Rocker', dimensions: '92 cm W × 101.6 cm D × 109.2 cm H', priceDelta: 0, image: IMG_AXIS_UPRIGHT },
      { label: 'Pair of 2 Manual Revolving Recliners', dimensions: '2 × (92 cm W × 101.6 cm D)', priceDelta: 16500 },
    ],
    finishes: [
      { name: 'Charcoal Slate Suede', swatchHex: '#4C4F54', upholstery: 'Soft Matte Molfino Suede', image: IMG_AXIS_UPRIGHT },
      { name: 'Champagne Taupe Suede', swatchHex: '#B6A28E', upholstery: 'Textured Soft Suede', image: IMG_REVOLVING_TAUPE_UPRIGHT },
      { name: 'Espresso Chocolate', swatchHex: '#422B23', upholstery: 'Breathable Pro Leatherette', image: IMG_REVOLVING_ESPRESSO },
    ],
  },
  {
    id: 'zss-zenith-motor-revolving-recliner',
    name: 'Zain Zenith Motorized 360° Revolving Recliner',
    subtitle: 'Motorized Revolving · Push-Button Electric + USB + 360° Swivel',
    category: 'Motorized Revolving Recliners',
    room: 'Recliners',
    mechanism: 'Motorized Push-Button',
    price: 24500,
    mrp: 36500,
    rating: 4.9,
    reviewCount: 118,
    image: IMG_REVOLVING_NAVY_MOTOR,
    gallery: [
      IMG_REVOLVING_NAVY_MOTOR,
      IMG_ZENITH_RECLINED,
      IMG_ZENITH_DETAIL,
      IMG_ZENITH_BACK,
      IMG_ZENITH_DIMENSIONS_SPEC,
    ],
    galleryLabels: [
      'Front 3/4 View',
      'Full Recline Side View',
      'USB & Push-Button Detail',
      'Rear 3/4 View',
      'Dimensions Guide',
    ],
    tag: 'Motorized · 360°',
    dimensions: '92 cm W × 101.6 cm D × 109.2 cm H (Seat Height: 49 cm)',
    frameMaterial: 'Heavy-Gauge 360° Swivel Ring + Silent 24V Okin Actuator + Brushed USB Switch',
    foamAndSpring: '40-Density Super-Soft HR Foam + 3-Tier Pillow-Back Lumbar Support',
    warranty: '5-Year Frame & 3-Year Electric Motor Warranty',
    deliveryEstimate: 'Factory Dispatch in 5–7 Days',
    description:
      'Combines full 360-degree revolving convenience with whisper-quiet motorized push-button reclining and a built-in USB charging port. Designed with snag-free internal cabling so the chair pivots smoothly in modern living rooms and nurseries.',
    customizableOptions: ['Custom Leatherette or Suede', 'Optional Detachable Swivel Tray', 'Custom Stitching Contrast'],
    variants: [
      { label: 'Motorized 360° Swivel + USB', dimensions: '92 cm W × 101.6 cm D × 109.2 cm H', priceDelta: 0, image: IMG_REVOLVING_NAVY_MOTOR },
      { label: 'Motorized 360° Swivel + Removable Tray', dimensions: '94 cm W × 101.6 cm D × 109.2 cm H', priceDelta: 3500, image: IMG_ZENITH_RECLINED },
    ],
    finishes: [
      { name: 'Midnight Navy', swatchHex: '#253852', upholstery: 'Breathable Pro Leatherette', image: IMG_REVOLVING_NAVY_MOTOR },
      { name: 'Espresso Chocolate', swatchHex: '#422B23', upholstery: 'Breathable Pro Leatherette', image: IMG_REVOLVING_ESPRESSO },
      { name: 'Saddle Cognac Tan', swatchHex: '#AE6336', upholstery: 'Breathable Pro Leatherette', image: IMG_REVOLVING_COGNAC },
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
      'Ordered the Sultan push-button motorized recliner directly via WhatsApp after seeing their factory floor photos. The Okin motor glide is completely silent, USB port is super handy, and the Champagne Cream leatherette matches our living room wall.',
    productId: 'zss-sultan-motor-recliner',
    productName: 'Zain Sultan Motorized Recliner',
    categoryTag: 'Motorized Recliner',
    image: IMG_DRV_BEIGE_MOTOR,
    photos: [IMG_DRV_BEIGE_MOTOR, IMG_DRV_CREAM_TRAY],
    avatarUrl: IMG_REVIEW_AVATAR_MAN,
    factoryReply: 'Thank you Rohan ji. Happy that the Champagne Cream shade and smooth push-button recline fit your corner so well!',
    factoryReplyDate: '2 weeks ago',
  },
  {
    id: 'rev-2',
    customerName: 'Meera Malhotra',
    city: 'Worli, Mumbai',
    rating: 5,
    date: 'a month ago',
    quote:
      'Showrooms quoted ₹95k+ and refused custom wall sizes. Zain’s manufacturing team built our Noor L-shape recliner sectional to exact apartment measurements—40-density HR foam feels firm yet plush even after heavy family use.',
    productId: 'zss-noor-sectional-custom',
    productName: 'Zain Noor L-Shape Recliner Sectional',
    categoryTag: 'Custom L-Shape Sofa',
    image: IMG_DRV_LSHAPE_BROWN,
    photos: [IMG_DRV_LSHAPE_BROWN, IMG_DRV_LSHAPE_TAUPE],
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
      'Best decision for our home theatre room. We ordered the 2-seater charcoal suede Majlis cinema set with wooden swivel trays—the diamond-quilted arms and full recline look straight out of a luxury multiplex.',
    productId: 'zss-majlis-dual-recliner',
    productName: 'Zain Majlis 2-Seater Cinema Recliner',
    categoryTag: 'Motorized Cinema',
    image: IMG_DRV_CINEMA2_CHARCOAL_UP,
    photos: [IMG_DRV_CINEMA2_CHARCOAL_UP, IMG_DRV_CINEMA2_CHARCOAL_REC],
    avatarInitials: 'A',
    avatarBg: '#131F2D',
    factoryReply: 'Thank you Dr. Arvind. Glad the charcoal suede cinema set and swivel trays transformed your theatre room!',
    factoryReplyDate: '2 months ago',
  },
  {
    id: 'rev-4',
    customerName: 'Siddharth Kulkarni',
    city: 'Baner, Pune',
    rating: 5,
    date: '3 months ago',
    quote:
      'Picked the Espresso Aranya slim-arm chair for my bedroom reading corner. Compact footprint, neat stitching, and zero middleman markup—packaging arrived completely intact.',
    productId: 'zss-aranya-modern-chair',
    productName: 'Zain Aranya Slim-Arm Modernist Chair',
    categoryTag: 'Modern Home Chair',
    image: IMG_DRV_CHAIR_ESPRESSO,
    photos: [IMG_DRV_CHAIR_ESPRESSO, IMG_VAR_CHAIR_SAGE],
    avatarInitials: 'S',
    avatarBg: '#9C582B',
    factoryReply: 'Looks great beside your wood console, Siddharth! Enjoy your reading corner.',
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
    image: IMG_DRV_BLACK_MANUAL,
    photos: [IMG_DRV_BLACK_MANUAL, IMG_DRV_IVORY_MANUAL],
    avatarInitials: 'F',
    avatarBg: '#5E7560',
    factoryReply: 'Thank you Farhan bhai. Appreciate the feedback on the manual lever linkage!',
    factoryReplyDate: '3 months ago',
  },
];

export const POPULAR_SEARCHES: Array<{ label: string; category: CategoryTile['targetCategory'] }> = [
  { label: 'Manual Lever Recliners', category: 'Manual Recliners' },
  { label: 'Motorized Cinema Recliners', category: 'Motorized Recliners' },
  { label: 'Manual Lever Revolving Recliners', category: 'Manual Revolving Recliners' },
  { label: 'Motorized Revolving Recliners', category: 'Motorized Revolving Recliners' },
  { label: 'Home Theatre Recliner Rows', category: 'Motorized Recliners' },
  { label: 'L-Shape Recliner Sofas', category: 'Sofa Sets' },
  { label: 'Electric Forward-Extend Sofa Bed', category: 'Electric Sofa Beds' },
  { label: 'Modernist Swivel Chairs', category: 'Home Chairs' },
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
