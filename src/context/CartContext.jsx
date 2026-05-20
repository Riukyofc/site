import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('rky_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('rky_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsSidebarOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const checkoutWhatsApp = () => {
    const phoneNumber = "5598982715727";
    let message = `*Olá, RKY Studio!* 👋\n\nTenho interesse em iniciar um projeto com vocês e gostaria de realizar o seguinte orçamento:\n\n`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (Qtd: ${item.quantity} | Valor Médio: R$ ${(item.price || 0).toFixed(2)})\n`;
    });
    
    message += `\n*Valor Médio Total:* R$ ${cartTotal.toFixed(2)}\n\n_Sei que os valores são negociáveis e dependem do escopo. Podemos conversar?_`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setIsSidebarOpen(false);
    setCart([]); // Esvazia após o contato
  };

  return (
    <CartContext.Provider value={{
      cart,
      isSidebarOpen,
      setIsSidebarOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartCount,
      checkoutWhatsApp
    }}>
      {children}
    </CartContext.Provider>
  );
};
