enum ApiUrls {
  BASE_URL = 'https://dummyjson.com',
  GET_PRODUCTS = '/products',
  SEARCH_PRODUCTS = '/products/search?q=',
  LOGIN_USER = '/user/login',
}

enum PageStatus {
  LOADING = 'LOADING',
  CONTENT = 'CONTENT',
  NO_CONTENT = 'NO_CONTENT',
  ERROR = 'ERROR',
}

export {ApiUrls, PageStatus};
