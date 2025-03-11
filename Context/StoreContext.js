import React, { useState } from 'react'
import { createContext } from 'react'
import { food_list } from '../assets/assets'


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cardItems, setCardItems] = useState({});

    const addToCart = (itemId) => {
        if (!cardItems[itemId]) {
            setCardItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCardItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        setCardItems((prev) => {
            if (prev[itemId]) {
                return { ...prev, [itemId]: prev[itemId] - 1 };
            }
            return prev;
        });
    };

    // const removeFromCart = (itemId) => {
    //     setCardItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    // }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cardItems) {
            if (cardItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cardItems[item];
            }
        }
        return totalAmount;
    }

    const contextValue = {
        food_list,
        cardItems,
        setCardItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;