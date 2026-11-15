import { useState } from "react";
import type { ClothingProduct } from "../data/data";

interface ItemCardProps {
    product: ClothingProduct;
    onAddToCheckout: (productId: number, quantity: number) => boolean;
}

const imageModules = import.meta.glob(
    "../assets/images/*.png",
    { eager: true, query: "?url", import: "default"}
) as Record<string, string>;

function ItemCard({ product, onAddToCheckout }: ItemCardProps) {
    const fileName = product.image.split("/").pop();
    const imagePath = imageModules[`../assets/images/${fileName}`];

    const [selectedQuantity, setSelectedQuantity] = useState<number>(0);

    const safeQuantity = Math.min(selectedQuantity, product.quantity);

function increaseQuantity() {
    setSelectedQuantity((current) =>
    Math.min(current + 1, product.quantity));
}

function decreaseQuantity() {
    setSelectedQuantity((current) =>
    Math.max(Math.min(current, product.quantity) - 1, 0));
}

function handleAddToCheckout() {
  if (safeQuantity > 0) {
    const added = onAddToCheckout(product.id, safeQuantity);

    if (added) {
      setSelectedQuantity(0);
    }
  }
}

    return (
        <div className="item-card">
            <img src={imagePath} alt={product.name}/>

            <h3>{product.name}</h3>

            <p>{product.description}</p>
            <p>Fit: {product.fit}</p>
            <p>Category: {product.category}</p>
            <p>Colour: {product.color}</p>
            <p>Size: {product.size}</p>

            <p>Price: ${product.price.toFixed(2)}</p>

            <p>
                {product.quantity === 0
                ? "Out of Stock"
                : `Stock: ${product.quantity}`
                }
            </p>

            <div className="quantity-selector">

                <button onClick={decreaseQuantity}
                disabled={safeQuantity === 0} >
                    -
                </button>

                <span>{safeQuantity}</span>

                <button onClick={increaseQuantity}
                disabled={safeQuantity >= product.quantity}>
                    +
                </button>

            </div>

            <button className="add-button" 
            onClick={handleAddToCheckout}
            disabled={ product.quantity === 0 || safeQuantity === 0 } >
                {product.quantity === 0 ? "Out of Stock" : "Add to Checkout"}
            </button>

        </div>
    );
}


export default ItemCard;