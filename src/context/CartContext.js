import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { syncLocalStorageDbAndContext } from "../firebase.config";
import { UserContext } from "./UserContext";
import { cartReducer, initialCartState } from "../reducers/cartReducer";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const { currentUser } = useContext(UserContext);

  const increment = async (itemInfo, isItemInCart) => {
    let newItems;
    if (!isItemInCart) {
      newItems = [
        ...state.cartItems,
        { ...itemInfo, countInCart: 1, loading: true },
      ];
    } else {
      newItems = state.cartItems.map((item) => {
        return itemInfo.id === item.id
          ? { ...itemInfo, countInCart: item.countInCart + 1, loading: true }
          : item;
      });
    }
    dispatch({ type: "SET_CART_ITEMS", payload: newItems });
    try {
      await syncLocalStorageDbAndContext(currentUser, newItems);
      const makeLoadingFalse = newItems.map((item) =>  ({ ...item, loading: false }) )
      dispatch({ type: "SET_CART_ITEMS", payload: makeLoadingFalse });
    } catch (error) {
      console.log(error)
    }

    // dispatch({ type: "CHANGING_IN_CART" });
  };

  const decrement = async (itemInfo, isItemInCart) => {
    let newItems;
    if (isItemInCart.countInCart === 1) {
      newItems = state.cartItems.filter((item) => item.id !== itemInfo.id);
    } else {
      newItems = state.cartItems.map((item) => {
        return itemInfo.id === item.id
          ? { ...itemInfo, countInCart: item.countInCart - 1, loading: true }
          : item;
      });
    }
    dispatch({ type: "SET_CART_ITEMS", payload: newItems });
    try {
      await syncLocalStorageDbAndContext(currentUser, newItems);
      const makeLoadingFalse = newItems.map((item)=> ({ ...item, loading: false }) )
      dispatch({ type: "SET_CART_ITEMS", payload: makeLoadingFalse });
    } catch (error) {
      console.log(error);
      dispatch({ type: "SET_CART_ITEMS", payload: state.cartItems });
    }
    // dispatch({ type: "CHANGING_IN_CART" });
  };
  const cartItems = useMemo(() => {
    return state.cartItems
  },[state.cartItems])
  
  
  //set new sign in as dependancy for signup and first time you signed in true
  useEffect(() => {
    const f1 =  () => {
      dispatch({
        type: "SET_TOTAL_COUNT_AND_PRICE",
        payload: {
          totalCount: cartItems?.reduce(
            (lastCount, current) => lastCount + current.countInCart,
            0
          ),
          totalPrice: cartItems?.reduce(
            (lastTotalPrice, current) =>
              lastTotalPrice + current.countInCart * current.price,
            0
          ),
        },
      });
    };
    f1();
  }, [ cartItems]);



  return (
    <CartContext.Provider
      value={{
        increment,
        decrement,
        cartItems,
        cartDispatch: dispatch,
        totalCountAndPrice: state.totalCountAndPrice,
        newSignIn: state.newSignIn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
