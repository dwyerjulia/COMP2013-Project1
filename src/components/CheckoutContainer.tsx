import type { ClothingProduct } from "../data/data";
import CheckoutCard from "./CheckoutCard";

interface CartItem {
    product: ClothingProduct;
    quantity: number;
}

interface CheckoutContainerProps {
    checkout: CartItem[];
    onRemove: (productId: number) => void;
    onEmpty: () => void;
}

function CheckoutContainer({
    checkout, onRemove, onEmpty,
}: CheckoutContainerProps) {
    const total = checkout.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    );

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>

            {checkout.length === 0 ? (
                <p>Cart Empty</p>
            ): (
                <>
                    {checkout.map((item) => (
                        <CheckoutCard
                        key={item.product.id}
                        product={item.product}
                        quantity={item.quantity}
                        onRemove={onRemove}
                        />

                    ))}

                    <button onClick={onEmpty}>
                        Empty Checkout
                    </button>
                </>
            )}

            <h3>Grand Total: ${total.toFixed(2)}</h3>
        </div>
    );
}

export default CheckoutContainer;