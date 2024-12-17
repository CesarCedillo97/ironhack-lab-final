import {fetchData} from '../utils/apiClient';
import {ApiUrls} from '../utils/constants';
import {ApiResponse, ProductsApiResponse} from '../utils/types';

const getProducts = async (): Promise<ApiResponse<ProductsApiResponse>> => {
  return await fetchData<ProductsApiResponse>({
    url: ApiUrls.GET_PRODUCTS,
    method: 'GET',
  });
};

export default getProducts;
