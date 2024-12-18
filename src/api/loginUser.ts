import {fetchData} from '../utils/apiClient';
import {ApiUrls} from '../utils/constants';
import {ApiResponse, LoginUserResponse} from '../utils/types';

export type LoginUserTypeRequest = {
  username: string;
  password: string;
};

const loginUser = async ({
  username,
  password,
}: LoginUserTypeRequest): Promise<ApiResponse<LoginUserResponse>> => {
  return await fetchData<LoginUserResponse>({
    url: ApiUrls.LOGIN_USER,
    method: 'POST',
    data: {
      username,
      password,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default loginUser;
