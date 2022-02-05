import { AppBarPosType } from '../App';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Typography from '@mui/material/Typography';
import useCartContext from '../hooks/useCartContext';
import Badge from '@mui/material/Badge';

interface NavBarProps {
    position: AppBarPosType;
    setIsShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ position, setIsShowCart }) => {
    const {
        cart: { amount },
    } = useCartContext();

    return (
        <AppBar position={position} sx={{ background: '#fff' }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="default"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    color="#9c27b0"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    Shopping Cart
                </Typography>
                <IconButton
                    color="default"
                    size="large"
                    onClick={() => setIsShowCart(true)}
                >
                    <Badge badgeContent={amount} color="secondary">
                        <AddShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
