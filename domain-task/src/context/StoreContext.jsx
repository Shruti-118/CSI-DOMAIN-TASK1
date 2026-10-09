import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadJSON, saveJSON } from "../utils/storage";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => loadJSON("shopholic_cart", []));
  const [wishlist, setWishlist] = useState(() => loadJSON("shoholic_wishlist", []));
  const [orders, setOrders] = useState(() => loadJSON("shopholic_orders", []));
  const [user, setUser] = useState(() =>
    loadJSON("shopholic_user", { loggedIn: false, name: "", email: "" })
  );

  useEffect(() => saveJSON("shopholic_cart", cart), [cart]);
  useEffect(() => saveJSON("shopholic_wishlist", wishlist), [wishlist]);
  useEffect(() => saveJSON("shopholic_orders", orders), [orders]);
  useEffect(() => saveJSON("shopholic_user", user), [user]);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((current) =>
      current
        .map((item) => item.id === id ? { ...item, quantity } : item)
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const toggleWishlist = (product) => {
    setWishlist((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product]
    );
  };

  const moveToCart = (product) => {
    addToCart(product);
    setWishlist((current) => current.filter((item) => item.id !== product.id));
  };

  const placeOrder = (customer, items) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = {
      id: `NC-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      customer,
      items,
      total: Number(subtotal.toFixed(2))
    };
    setOrders((current) => [order, ...current]);
    setCart([]);
    return order;
  };

  const login = (name, email) => setUser({ loggedIn: true, name, email });
  const logout = () => setUser({ loggedIn: false, name: "", email: "" });

  const value = useMemo(() => ({
    cart, wishlist, orders, user,
    addToCart, updateQuantity, removeFromCart,
    toggleWishlist, moveToCart, placeOrder, login, logout
  }), [cart, wishlist, orders, user]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}