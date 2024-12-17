type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  thumbnail: string;
  images: string[];
};

type ProductInCart = {
  product: Product;
  quantityInCart: number;
};

type ProductsApiResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export {Product, ProductsApiResponse, ProductInCart, ApiResponse};
