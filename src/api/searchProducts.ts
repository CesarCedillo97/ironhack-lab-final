import {fetchData} from '../utils/apiClient';
import {ApiUrls} from '../utils/constants';
import {ApiResponse, ProductsApiResponse} from '../utils/types';

const searchProducts = async ({
  query,
}: {
  query: string;
}): Promise<ApiResponse<ProductsApiResponse>> => {
  return await fetchData<ProductsApiResponse>({
    url: `${ApiUrls.SEARCH_PRODUCTS}${query}`,
    method: 'GET',
  });
};

export default searchProducts;
