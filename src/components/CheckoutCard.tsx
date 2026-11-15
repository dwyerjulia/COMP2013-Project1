import type { ClothingProduct } from "../data/data";

interface CheckoutCardProps {
    product: ClothingProduct;
    quantity: number;
    onRemove: (productId: number) => void;
}

const imageModules = ImageBitmapRenderingContext.meta.glob(
    "../assets/images/*.png", { eager: true, query: "?url", import: "default"}
) as Record<string, string>;

function CheckoutCard({
    product, quantity, onRemove,
}: CheckoutCardProps) {
    const fileName = product.image.split("/").pop();

    const imagePath = imageModules[`../assets/images/${fileName}`];

    const subtotal = product.price * quantity;

    return (
        <div className="checkout-card">
            <img src={imagePath} alt={product.name}/>

            <h3>{product.name}</h3>

            <p>Unit Price: ${product.price.toFixed(2)}</p>
            <p>Quantity: {quantity}</p>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>

            <button onClick={() => onRemove(product.id)}>
                Remove
            </button>
        </div>
    );
}

export default CheckoutCard;