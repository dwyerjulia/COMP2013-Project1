import type { ClothingProduct } from "../data/data";
import ItemCard from "./ItemCard";

interface ItemsContainerProps {
    products: ClothingProduct[];
    onAddToCheckout: (productId: number, quantity: number) => boolean;
}

function ItemsContainer({ products, onAddToCheckout, }: ItemsContainerProps) {
    return (
        <div className="items-container">
            {products.map((product) => (
                <ItemCard key={product.id} product={product} onAddToCheckout={onAddToCheckout} />
            ))}
        </div>
    );
}

export default ItemsContainer;