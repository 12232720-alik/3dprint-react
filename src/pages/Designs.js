import { useDesigns } from '../DesignContext';
import { useCart } from '../CartContext';

function Designs() {
  const { designs } = useDesigns();
  const { addToCart } = useCart();

  return (
    <div className="designs">
      <h1>Available Designs</h1>

      {designs.length === 0 ? (
        <p>No designs available.</p>
      ) : (
        <div className="design-grid">
          {designs.map((d) => (
            <div key={d.id} className="design-card">
              <h3>{d.name}</h3>
              <p>${d.price.toFixed(2)}</p>
              <button onClick={() => addToCart(d)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Designs;
