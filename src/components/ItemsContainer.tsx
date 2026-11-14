import type { ClothingProduct } from "../data/data";
import ItemCard from "./ItemCard";

interface ItemsContainerProps {
    products: ClothingProduct[];
}

function ItemsContainer({ products }: ItemsContainerProps) {
    return (
        <div>
            {products.map((product) => (
                <ItemCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ItemsContainer;