import { useQuery } from 'react-query';
import { getAllProducts } from './api/productApi';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ProductItem from './components/ProductItem';
import { useEffect, useRef, useState } from 'react';
import CartDrawer from './components/CartDrawer';
import NavBar from './components/NavBar';

export interface ProductItemType {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    rating: { rate: number; count: number };
}

export type AppBarPosType = 'static' | 'sticky';

const App: React.FC = () => {
    const { isLoading, data, isError, error } = useQuery<
        ProductItemType[],
        Error
    >('products', getAllProducts, { staleTime: 30000 });

    const [appBarPos, setAppBarPos] = useState<AppBarPosType>('static');
    const [isShowCart, setIsShowCart] = useState(false);

    const bodyRef = useRef<HTMLDivElement>(null);

    const headerObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;

            entry.isIntersecting
                ? setAppBarPos('static')
                : setAppBarPos('sticky');
        },
        {
            root: null,
            rootMargin: '100px',
        }
    );

    useEffect(() => {
        const appBarElement = bodyRef?.current as Element;

        headerObserver.observe(appBarElement);

        return () => headerObserver.unobserve(appBarElement);
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <NavBar position={appBarPos} setIsShowCart={setIsShowCart} />
            <CartDrawer isShowCart={isShowCart} setIsShowCart={setIsShowCart} />
            <Container maxWidth="xl" sx={{ my: '30px' }}>
                <div ref={bodyRef}></div>
                {isLoading && <LinearProgress color="secondary" />}
                {isError && (
                    <Typography color="red" textAlign="center" component="span">
                        {error?.message}
                    </Typography>
                )}
                {data && (
                    <Grid container spacing={3}>
                        {data?.map(item => (
                            <ProductItem key={item.id} product={item} />
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default App;
