import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, CustomizationOptions, Order, Reservation, CustomerReview, ToastMessage, OrderStatus } from '../types';
import { MENU_ITEMS, CUSTOMER_REVIEWS, CAFE_INFO } from '../data/cafeData';
import confetti from 'canvas-confetti';

interface CafeContextType {
  // Cart
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  couponCode: string;
  total: number;
  deliveryType: 'pickup' | 'delivery';
  setDeliveryType: (type: 'pickup' | 'delivery') => void;
  addToCart: (item: MenuItem, quantity?: number, customization?: Partial<CustomizationOptions>) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Modals & Panels
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProduct: MenuItem | null;
  setSelectedProduct: (item: MenuItem | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Confirmed Order & Tracking
  activeConfirmedOrder: Order | null;
  setActiveConfirmedOrder: (order: Order | null) => void;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'estimatedMinutes' | 'items' | 'subtotal' | 'tax' | 'deliveryFee' | 'discount' | 'total'>) => Order;
  trackOrderId: string;
  setTrackOrderId: (id: string) => void;
  currentTrackedOrder: Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Reservations
  reservations: Reservation[];
  createReservation: (resData: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => Reservation;

  // Reviews
  reviews: CustomerReview[];
  addReview: (review: Omit<CustomerReview, 'id' | 'date' | 'verified'>) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (itemId: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'cart') => void;
  removeToast: (id: string) => void;

  // WhatsApp Helper
  getWhatsAppOrderUrl: (orderSummary?: string) => string;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);

export const CafeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lalten_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('delivery');
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Orders
  const [activeConfirmedOrder, setActiveConfirmedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('lalten_orders');
      if (saved) return JSON.parse(saved);
      // Sample existing initial order for realistic tracking demo
      return [
        {
          id: 'LTC-7821',
          customerName: 'Aarav Mehta',
          phone: '9829012345',
          email: 'aarav@gmail.com',
          type: 'delivery',
          address: 'Station Road, Near GVT College, Merta City',
          landmark: 'Opposite Clock Tower',
          paymentMethod: 'upi',
          paymentStatus: 'paid',
          items: [
            {
              cartItemId: 'init-1',
              item: MENU_ITEMS[0], // Cappuccino
              quantity: 2,
              customization: {
                size: 'Medium',
                temperature: 'Hot',
                sugar: 'Normal',
                milk: 'Standard Dairy',
                syrups: ['Hazelnut Syrup'],
              },
              unitPrice: 179,
              totalPrice: 358,
            },
            {
              cartItemId: 'init-2',
              item: MENU_ITEMS[12], // Lal Ten Special Grilled Cheese Sandwich
              quantity: 1,
              customization: {
                size: 'Regular',
                sugar: 'None',
                milk: 'Standard Dairy',
                syrups: [],
              },
              unitPrice: 199,
              totalPrice: 199,
            },
          ],
          subtotal: 557,
          tax: 28,
          deliveryFee: 0,
          discount: 50,
          couponCode: 'LALTEN20',
          total: 535,
          status: 'preparing',
          createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
          estimatedMinutes: 20,
        },
      ];
    } catch {
      return [];
    }
  });

  const [trackOrderId, setTrackOrderId] = useState<string>('LTC-7821');

  // Reservations
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('lalten_reservations');
      return saved ? JSON.parse(saved) : [
        {
          id: 'RES-4410',
          name: 'Neha Sharma',
          phone: '9414012345',
          email: 'neha.sharma@example.com',
          date: 'Tomorrow',
          time: '07:30 PM',
          guests: 4,
          specialRequest: 'Fairy light corner table with window view',
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        }
      ];
    } catch {
      return [];
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lalten_favorites');
      return saved ? JSON.parse(saved) : ['c-1', 'c-7', 'f-1'];
    } catch {
      return ['c-1', 'c-7', 'f-1'];
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('lalten_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('lalten_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Persist reservations
  useEffect(() => {
    try {
      localStorage.setItem('lalten_reservations', JSON.stringify(reservations));
    } catch (e) {
      console.error(e);
    }
  }, [reservations]);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem('lalten_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'cart' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(itemId);
      const item = MENU_ITEMS.find(m => m.id === itemId);
      const itemName = item ? item.name : 'Item';
      if (exists) {
        showToast('Removed from Favorites', `${itemName} removed`, 'info');
        return prev.filter(id => id !== itemId);
      } else {
        showToast('Added to Favorites ❤️', `${itemName} saved to your favorites`, 'success');
        return [...prev, itemId];
      }
    });
  };

  const addToCart = (
    item: MenuItem,
    quantity: number = 1,
    customization?: Partial<CustomizationOptions>
  ) => {
    const fullCustomization: CustomizationOptions = {
      size: customization?.size || 'Regular',
      temperature: customization?.temperature || (item.category === 'Cold Drinks' ? 'Iced' : 'Hot'),
      sugar: customization?.sugar || 'Normal',
      milk: customization?.milk || 'Standard Dairy',
      syrups: customization?.syrups || [],
      specialInstructions: customization?.specialInstructions || '',
    };

    let calculatedUnitPrice = item.price;
    if (fullCustomization.size === 'Medium') calculatedUnitPrice += 30;
    if (fullCustomization.size === 'Large') calculatedUnitPrice += 50;
    if (fullCustomization.milk.includes('Oat')) calculatedUnitPrice += 30;
    if (fullCustomization.milk.includes('Almond')) calculatedUnitPrice += 35;
    if (fullCustomization.milk.includes('Double Cream')) calculatedUnitPrice += 25;
    if (fullCustomization.syrups.length > 0) calculatedUnitPrice += fullCustomization.syrups.length * 25;

    const cartKey = `${item.id}-${fullCustomization.size}-${fullCustomization.temperature}-${fullCustomization.sugar}-${fullCustomization.milk}-${fullCustomization.syrups.sort().join('-')}`;

    setCart(prev => {
      const existingIdx = prev.findIndex(c => c.cartItemId === cartKey);
      if (existingIdx > -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          totalPrice: newQty * updated[existingIdx].unitPrice,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId: cartKey,
          item,
          quantity,
          customization: fullCustomization,
          unitPrice: calculatedUnitPrice,
          totalPrice: calculatedUnitPrice * quantity,
        };
        return [...prev, newItem];
      }
    });

    showToast(
      'Added to Cart! ☕',
      `${quantity}x ${item.name} (${fullCustomization.size}) added to your tray`,
      'cart'
    );
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(ci => {
          if (ci.cartItemId === cartItemId) {
            const newQty = ci.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...ci,
              quantity: newQty,
              totalPrice: newQty * ci.unitPrice,
            };
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(c => c.cartItemId !== cartItemId));
    showToast('Item Removed', 'Item was removed from your cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'LALTEN20') {
      setCouponCode('LALTEN20');
      setDiscountPercent(20);
      showToast('Coupon Applied! 🎉', '20% discount unlocked on your total bill');
      return true;
    }
    if (clean === 'BOGO') {
      setCouponCode('BOGO');
      setDiscountPercent(25);
      showToast('BOGO Deal Applied! ☕', 'Buy 1 Get 1 equivalent 25% discount applied');
      return true;
    }
    if (clean === 'STUDENT15') {
      setCouponCode('STUDENT15');
      setDiscountPercent(15);
      showToast('Student Discount Applied! 🎓', '15% student discount applied');
      return true;
    }
    if (clean === 'COMBO199') {
      setCouponCode('COMBO199');
      setDiscountPercent(18);
      showToast('Combo Offer Applied! 🍪', 'Special combo discount applied');
      return true;
    }
    showToast('Invalid Code', 'Please enter a valid promo code (e.g. LALTEN20)', 'info');
    return false;
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
    showToast('Coupon Removed', 'Promo discount cleared', 'info');
  };

  // Calculations
  const cartCount = cart.reduce((acc, c) => acc + c.quantity, 0);
  const subtotal = cart.reduce((acc, c) => acc + c.totalPrice, 0);
  const discount = Math.round((subtotal * discountPercent) / 100);
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * 0.05); // 5% GST
  const deliveryFee = deliveryType === 'delivery' ? (subtotal >= 299 || subtotal === 0 ? 0 : 30) : 0;
  const total = Math.max(0, taxableAmount + tax + deliveryFee);

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'estimatedMinutes' | 'items' | 'subtotal' | 'tax' | 'deliveryFee' | 'discount' | 'total'>): Order => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newId = `LTC-${randomDigits}`;

    const newOrder: Order = {
      ...orderData,
      id: newId,
      items: [...cart],
      subtotal,
      tax,
      deliveryFee,
      discount,
      couponCode: couponCode || undefined,
      total,
      status: 'received',
      createdAt: new Date().toISOString(),
      estimatedMinutes: deliveryType === 'delivery' ? 30 : 15,
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveConfirmedOrder(newOrder);
    setTrackOrderId(newId);
    clearCart();

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c6894c', '#e5ab6b', '#f5ece3', '#241710']
      });
    } catch {
      // safe fallback
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (activeConfirmedOrder?.id === orderId) {
      setActiveConfirmedOrder(prev => prev ? { ...prev, status } : null);
    }
    showToast('Status Updated', `Order #${orderId} marked as ${status.replace('_', ' ').toUpperCase()}`);
  };

  const currentTrackedOrder = orders.find(o => o.id.toLowerCase() === trackOrderId.trim().toLowerCase()) || null;

  const createReservation = (resData: Omit<Reservation, 'id' | 'createdAt' | 'status'>): Reservation => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newReservation: Reservation = {
      ...resData,
      id: `RES-${randomDigits}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setReservations(prev => [newReservation, ...prev]);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c6894c', '#d49757', '#faf6f0']
      });
    } catch {
      // safe fallback
    }

    showToast('Table Reserved! 🪑', `Reservation ID: ${newReservation.id}. See you at Lal Ten Cafe!`);
    return newReservation;
  };

  const addReview = (newReview: Omit<CustomerReview, 'id' | 'date' | 'verified'>) => {
    const review: CustomerReview = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verified: true,
    };
    setReviews(prev => [review, ...prev]);
    showToast('Thank You! ⭐', 'Your review for Lal Ten Cafe has been posted.');
  };

  const getWhatsAppOrderUrl = (notes?: string): string => {
    let orderListText = cart.map((c, i) => `${i + 1}. ${c.item.name} (${c.customization.size}, ${c.customization.temperature || 'Standard'}) x ${c.quantity} = ₹${c.totalPrice}`).join('\n');
    if (!orderListText) {
      orderListText = 'Custom Inquiry / Special Order';
    }

    const message = `Hello Lal Ten Cafe (लाल टेन कैफे)! ☕🏮
I would like to place an order from Merta City.

*Order Details:*
${orderListText}

*Subtotal:* ₹${subtotal}
*Discount:* ₹${discount}
*GST (5%):* ₹${tax}
*Delivery Type:* ${deliveryType === 'delivery' ? 'Home Delivery in Merta City' : 'Self Pickup from Lal Ten Cafe'}
*Grand Total:* ₹${total}

${notes ? `*Customer Note:* ${notes}\n` : ''}
Please confirm my order. Thank you!`;

    return `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CafeContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        tax,
        deliveryFee,
        discount,
        couponCode,
        total,
        deliveryType,
        setDeliveryType,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isReservationOpen,
        setIsReservationOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        isAdminOpen,
        setIsAdminOpen,
        activeConfirmedOrder,
        setActiveConfirmedOrder,
        orders,
        createOrder,
        trackOrderId,
        setTrackOrderId,
        currentTrackedOrder,
        updateOrderStatus,
        reservations,
        createReservation,
        reviews,
        addReview,
        favorites,
        toggleFavorite,
        toasts,
        showToast,
        removeToast,
        getWhatsAppOrderUrl,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = () => {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error('useCafe must be used within a CafeProvider');
  }
  return context;
};
