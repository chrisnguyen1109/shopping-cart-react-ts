import { ProductItemType } from '../App';
import axiosClient from './axiosClient';

export const getAllProducts = (): Promise<ProductItemType[]> => {
    const url = '/products';

    return axiosClient.get(url);
};
