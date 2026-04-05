import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cartslice',
    initialState: {
        items: [],
        count: 0
    },
    reducers: {
        addItems: (state, action) => {
            state.items.push({ ...action.payload, quantity: 1 });
            state.count++;
        },
        IncrementItems: (state, action) => {
            const element = state.items.find(item => item.id === action.payload.id);
            if (element) {
                element.quantity += 1;
                state.count++;
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
            }
        }
    }
});

export const { addItems, IncrementItems, DecrementItems } = cartSlice.actions;
export default cartSlice.reducer;