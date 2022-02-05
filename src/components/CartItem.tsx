import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ProductItemType } from '../App';
import { CartItemType } from '../context/CartProvider';

interface CartItemProps {
    cartItem: CartItemType;
    addItem: (data: ProductItemType) => void;
    removeItem: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
    cartItem,
    addItem,
    removeItem,
}) => {
    const { title, price, quantity, image } = cartItem;

    return (
        <Grid
            container
            paddingBottom="30px"
            marginTop="30px"
            sx={{ borderBottom: '1px solid #9c27b0' }}
        >
            <Grid item xs={9}>
                <Typography variant="h6" marginBottom="40px">
                    {title}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '20px',
                    }}
                >
                    <Typography component="p">
                        Price: <strong>${price.toFixed(2)}</strong>
                    </Typography>
                    <Typography component="p">
                        Total: <strong>${(price * quantity).toFixed(2)}</strong>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        size="large"
                        disableElevation
                        variant="contained"
                        color="secondary"
                        onClick={() => removeItem(cartItem.id)}
                    >
                        -
                    </Button>
                    <Typography variant="h6" component="p">
                        {quantity}
                    </Typography>
                    <Button
                        size="large"
                        disableElevation
                        variant="contained"
                        color="secondary"
                        onClick={() => addItem(cartItem)}
                    >
                        +
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <img
                    style={{
                        maxWidth: '80px',
                        objectFit: 'cover',
                        marginLeft: '40px',
                        height: '100%',
                    }}
                    src={image}
                    alt={title}
                />
            </Grid>
        </Grid>
    );
};

export default CartItem;
