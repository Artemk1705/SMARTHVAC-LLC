import React, { useEffect, useState } from "react";
import ConfirmModal from "../equipmentPageContent/confirm";
import EqApplyForm from "./eq-apply-form";

export default function CartPage() {
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [itemToRemoveIndex, setItemToRemoveIndex] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("myCart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const confirmRemove = () => {
    const updatedCart = cartItems.filter(
      (_, index) => index !== itemToRemoveIndex
    );
    setCartItems(updatedCart);
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
    setShowRemoveConfirm(false);
    setItemToRemoveIndex(null);
  };

  const handleQtyChange = (item, change) => {
    const updatedCart = cartItems
      .map((i) => {
        if (i.name === item.name && i.model === item.model) {
          return { ...i, qty: i.qty + change };
        }
        return i;
      })
      .filter((i) => i.qty > 0);

    setCartItems(updatedCart);
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("myCart");
  };

  return (
    <div className="cart_page">
      <div className="equip_cart_title_page">
        <h1 className="cart_page_main_title">Your Equipment Cart</h1>
      </div>
      <div className="clear_cart_block">
        <button
          className="submit_cart_button"
          onClick={() => {
            setSelectedItem({ cart: cartItems });
            setShowRequestForm(true);
          }}
        >
          Submit Cart
        </button>
        <button className="clear_cart_button" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
      {cartItems.length === 0 ? (
        <div className="empty_cart_not">
          <p>Cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="equip_cart_card_container">
            {cartItems.map((item, index) => (
              <div key={index}>
                <div className="equip_cart_card">
                  <img
                    className="equip_cart_picture"
                    src={item.image_url}
                    alt={item.name}
                  />
                  <div className="equip_cart_text_container">
                    <h3>{item.name}</h3>
                    <p>Model: {item.model}</p>
                    <p>BTU: {item.btu}</p>
                    <p>Power: {item.power}t</p>
                    {item.price && (
                      <p>
                        Price: $
                        {(
                          parseFloat(item.price.replace(/[$,]/g, "")) * 3 +
                          (item.category === "air_conditioners" ? 700 : 0)
                        ).toFixed(2)}
                      </p>
                    )}
                    <div className="qty_controls">
                      <h4 className="qty_cart_title">Quantity</h4>
                      <div>
                        <button
                          className="equip_quant_but"
                          onClick={() => handleQtyChange(item, -1)}
                          disabled={item.qty <= 1}
                        >
                          −
                        </button>
                        <span className="equip_quant">{item.qty}</span>
                        <button
                          className="equip_quant_but"
                          onClick={() => handleQtyChange(item, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    className="equip_cart_remove"
                    onClick={() => {
                      setItemToRemoveIndex(index);
                      setShowRemoveConfirm(true);
                    }}
                  >
                    Remove
                  </button>
                  <ConfirmModal
                    isOpen={showRemoveConfirm}
                    onClose={() => setShowRemoveConfirm(false)}
                    onConfirm={confirmRemove}
                    message="Are you sure you want to remove this item from your cart?"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <EqApplyForm
        setCartItems={setCartItems}
        isOpen={showRequestForm}
        onClose={() => setShowRequestForm(false)}
        item={selectedItem}
      />
    </div>
  );
}
