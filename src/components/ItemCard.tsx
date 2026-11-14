import { useState } from "react";
import type { ClothingProduct } from "../data/data";

interface ItemCardProps {
    product: ClothingProduct;
    onAddToCheckout: (productId: number, quantity: number) => boolean;
}

function ItemCard({ product, onAddToCheckout }: ItemCardProps) {
    const imagePath = `/${product.image}`;

    const [selectedQuantity, setSelectedQuantity] = useState<number>(0);

function increaseQuantity() {
    setSelectedQuantity((current) =>
    Math.min(current + 1, product.quantity));
}

function decreaseQuantity() {
    setSelectedQuantity((current) =>
    Math.max(current - 1, 0));
}

function handleAddToCheckout() {
    if (selectedQuantity > 0 && selectedQuantity <= product.quantity) {
        const added = onAddToCheckout(product.id, selectedQuantity);

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
                disabled={selectedQuantity === 0} >
                    -
                </button>

                <span>{Math.min(selectedQuantity, product.quantity)}</span>

                <button onClick={increaseQuantity}
                disabled={selectedQuantity === 0} >
                    +
                </button>

            </div>

            <button className="add-button" 
            onClick={handleAddToCheckout}
            disabled={product.quantity === 0 || selectedQuantity === 0 || selectedQuantity > product.quantity} >
                {product.quantity === 0 ? "Out of Stock" : "Add to Checkout"}
            </button>

        </div>
    );
}


export default ItemCard;