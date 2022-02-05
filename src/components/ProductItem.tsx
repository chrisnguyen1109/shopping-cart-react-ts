import Grid from '@mui/material/Grid';
import { ProductItemType } from '../App';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useCartContext from '../hooks/useCartContext';

interface ProductItemProps {
    product: ProductItemType;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const { image, title, description, price } = product;

    const { addItem } = useCartContext();

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className="same-height">
                <Box>
                    <CardMedia
                        component="img"
                        height="250px"
                        image={image}
                        alt={title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                </Box>
                <CardActions sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" component="div" marginLeft="5px">
                        {price} $
                    </Typography>
                    <Button
                        fullWidth={true}
                        size="large"
                        color="secondary"
                        onClick={() => addItem(product)}
                    >
                        Add to cart
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductItem;
