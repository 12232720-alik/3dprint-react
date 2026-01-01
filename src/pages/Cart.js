import { useCart } from "../CartContext";
import "../styles/Cart.css";

function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="cart">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>${Number(item.price).toFixed(2)}</p>

              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
