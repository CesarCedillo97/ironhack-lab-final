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

type LoginUserResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

type AvalibleLanguagesType = {
  languageName: string;
  languageCode: 'en' | 'es';
};

export {
  Product,
  ProductsApiResponse,
  ProductInCart,
  LoginUserResponse,
  ApiResponse,
  AvalibleLanguagesType,
};
