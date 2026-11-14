import { useState } from "react";
import type { ClothingProduct } from "../data/data";

interface ItemCardProps {
    product: ClothingProduct;
}

function ItemCard({ product }: ItemCardProps) {
    const imagePath = `/${product.image}`;

    const [selectedQuantity, setSelectedQuantity] = useState<number>(0);

function increaseQuantity() {
    if (selectedQuantity < product.quantity) {
        setSelectedQuantity(selectedQuantity + 1);
    }
}

function decreaseQuantity() {
    if (selectedQuantity > 0) {
        setSelectedQuantity(selectedQuantity - 1);
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

                <span>{selectedQuantity}</span>

                <button onClick={increaseQuantity}
                disabled={selectedQuantity === 0} >
                    +
                </button>

            </div>

            <button className="add-button" 
            disabled={product.quantity === 0}>
                {product.quantity === 0 ? "Out of Stock" : "Add to Checkout"}
            </button>

        </div>
    );
}


export default ItemCard;