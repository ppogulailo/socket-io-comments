import { $api, API_URL } from '../config/axios';
import { AxiosResponse } from 'axios';
import {IPost, IPostCreate } from '../types/components/post/post.type';



export const PostApi = {
  getPost: (page: number): Promise<AxiosResponse<{ post: IPost[]; count: number }>> => {
    return $api.get(`${API_URL}/post?skip=${page}`);
  },
  createPost: (body: IPostCreate): Promise<AxiosResponse<IPost>> => {
    return $api.post('/post/create', body, { headers: { 'Content-Type': 'multipart/form-data' } });
    // 'Content-Type':'multipart/form-data',Recaptcha:`${body.token}`
  },
  deletePost: (id: string): Promise<AxiosResponse<{ id: string }>> => {
    return $api.delete(`/post/${id}`);
  },
  downloadPost: (file: string): Promise<AxiosResponse<string>> => {
    return $api.get(`files/image/${file}`);
  },
};
