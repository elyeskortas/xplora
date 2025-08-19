<<<<<<< HEAD
"use client"
import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Charger depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) setCartItems(JSON.parse(stored))
  }, [])

  // Sauvegarder à chaque modification
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    setCartItems((prev) => {
      const ex = prev.find((i) => i.id === product.id)
      if (ex)
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id))

  const clearCart = () => setCartItems([])

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const total = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, total, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
=======
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Charger depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  // Sauvegarder à chaque modification
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex)
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
