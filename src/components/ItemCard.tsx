import type { ClothingProduct } from "../data/data";

interface ItemCardProps {
    product: ClothingProduct;
}

function ItemCard({ product }: ItemCardProps) {
    const imagePath = `/${product.image}`;

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
        </div>
    );
}

export default ItemCard;