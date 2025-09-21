export interface Product {
  _id: string;
  title: string;
  imageCover: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  price: number;
  count: number;
}

export interface Order {
  _id: string;
  totalOrderPrice: number;
  createdAt: string;
  paymentMethodType: string;
  cartItems: CartItem[];
}
 