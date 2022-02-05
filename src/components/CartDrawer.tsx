import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import CartItem from './CartItem';
import useCartContext from '../hooks/useCartContext';
import Typography from '@mui/material/Typography';

interface CartDrawerProps {
    isShowCart: boolean;
    setIsShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
    isShowCart,
    setIsShowCart,
}) => {
    const closeCart = () => setIsShowCart(false);

    const { cart, addItem, removeItem } = useCartContext();

    return (
        <Drawer anchor="right" open={isShowCart} onClose={closeCart}>
            <Box padding="30px" width="450px">
                <h2>Your Shopping Cart</h2>
                {!cart.items.length && (
                    <Typography variant="body1" color="text.secondary">
                        No items in cart!!! 😢
                    </Typography>
                )}
                {cart.items.map(el => (
                    <CartItem
                        key={el.id}
                        cartItem={el}
                        addItem={addItem}
                        removeItem={removeItem}
                    />
                ))}
                <h2>Total: ${cart.totalPrice.toFixed(2)}</h2>
            </Box>
        </Drawer>
    );
};

export default CartDrawer;
