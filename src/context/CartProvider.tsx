import { createContext, useReducer } from 'react';
import { ProductItemType } from '../App';

interface CartProviderProps {
    children: React.ReactNode;
}

export interface CartItemType extends ProductItemType {
    quantity: number;
}

interface CartState {
    items: CartItemType[];
    amount: number;
    totalPrice: number;
}

interface AddAction {
    type: 'ADD';
    payload: ProductItemType;
}

interface RemoveAction {
    type: 'REMOVE';
    payload: number;
}

type CartAction = AddAction | RemoveAction;

interface CartContextType {
    cart: CartState;
    addItem: (data: ProductItemType) => void;
    removeItem: (id: number) => void;
}

const initialCart: CartState = {
    items: [],
    amount: 0,
    totalPrice: 0,
};

const reducer = (state: CartState, action: CartAction) => {
    switch (action.type) {
        case 'ADD':
            const data = action.payload;

            const itemIndex = state.items.findIndex(el => el.id === data.id);

            if (itemIndex !== -1) {
                state.items[itemIndex].quantity += 1;
            } else {
                state.items.unshift({
                    ...action.payload,
                    quantity: 1,
                });
            }

            return {
                amount: (state.amount += 1),
                totalPrice: state.totalPrice + data.price,
                items: state.items,
            };
        case 'REMOVE':
            const id = action.payload;

            const dataIndex = state.items.findIndex(el => el.id === id);

            const itemPrice = state.items[dataIndex].price;

            state.items[dataIndex].quantity--;

            if (state.items[dataIndex].quantity === 0)
                state.items.splice(dataIndex, 1);

            return {
                amount: Math.max((state.amount -= 1), 0),
                totalPrice: Math.max(state.totalPrice - itemPrice, 0),
                items: state.items,
            };
        default:
            return state;
    }
};

export const CartContext = createContext<CartContextType>({
    cart: initialCart,
    addItem: () => null,
    removeItem: () => null,
});

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, dispatch] = useReducer(reducer, initialCart);

    const addItem = (data: ProductItemType) =>
        dispatch({ type: 'ADD', payload: data });

    const removeItem = (id: number) =>
        dispatch({ type: 'REMOVE', payload: id });

    const valueObject = {
        cart,
        addItem,
        removeItem,
    };

    return (
        <CartContext.Provider value={valueObject}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
