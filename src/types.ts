export type CategoryType = 'All' | 'Coffee' | 'Tea' | 'Cold Drinks' | 'Food' | 'Desserts' | 'Breakfast';

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  category: 'Coffee' | 'Tea' | 'Cold Drinks' | 'Food' | 'Desserts' | 'Breakfast';
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isSpecialCoffee?: boolean;
  rating: number;
  reviewCount: number;
  available: boolean;
  tags?: string[];
  calories?: string;
  prepTime?: string;
}

export interface CustomizationOptions {
  size: 'Regular' | 'Medium' | 'Large';
  temperature?: 'Hot' | 'Iced';
  sugar: 'None' | 'Less' | 'Normal' | 'Extra';
  milk: 'Standard Dairy' | 'Oat Milk (+₹30)' | 'Almond Milk (+₹35)' | 'Double Cream (+₹25)';
  syrups: string[];
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  customization: CustomizationOptions;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  type: 'pickup' | 'delivery';
  address?: string;
  landmark?: string;
  scheduledTime?: string;
  paymentMethod: 'upi' | 'card' | 'cod' | 'razorpay';
  paymentStatus: 'paid' | 'pending';
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedMinutes: number;
  notes?: string;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
  status: 'confirmed' | 'pending' | 'completed';
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  author?: string;
  name?: string;
  role?: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  orderFavorite?: string;
  verified: boolean;
}

export interface SpecialOffer {
  id: string;
  title: string;
  tag: string;
  subtitle?: string;
  description: string;
  code: string;
  discount?: string;
  discountPercent?: number;
  image: string;
  endTimeISO?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  featured?: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'cart';
}
