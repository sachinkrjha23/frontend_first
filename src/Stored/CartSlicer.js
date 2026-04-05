import { createSlice } from "@reduxjs/toolkit";

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            return JSON.parse(savedCart);
        }
    } catch (error) {
        console.error("Failed to load cart:", error);
    }
    return { items: [], count: 0 };
};

// Helper function to save cart to localStorage
const saveCartToStorage = (state) => {
    try {
        localStorage.setItem("cart", JSON.stringify({
            items: state.items,
            count: state.count
        }));
    } catch (error) {
        console.error("Failed to save cart:", error);
    }
};

const cartSlice = createSlice({
    name: 'cartslice',
    initialState: loadCartFromStorage(),
    reducers: {
        addItems: (state, action) => {
            state.items.push({ ...action.payload, quantity: 1 });
            state.count++;
            saveCartToStorage(state);
        },
        IncrementItems: (state, action) => {
            const element = state.items.find(item => item.id === action.payload.id);
            if (element) {
                element.quantity += 1;
                state.count++;
                saveCartToStorage(state);
            }
        },
        DecrementItems: (state, action) => {
            const elementIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (elementIndex !== -1) {
                const element = state.items[elementIndex];
                if (element.quantity > 1) {
                    element.quantity -= 1;
                    state.count--;
                } else {
                    state.items.splice(elementIndex, 1);
                    state.count--;
                }
                saveCartToStorage(state);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.count = 0;
            saveCartToStorage(state);
        }
    }
});

export const { addItems, IncrementItems, DecrementItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;