import { useContext } from 'react';
import { CartContext } from '../context/CartProvider';

const useCartContext = () => useContext(CartContext);

export default useCartContext;
