import { useState } from "react";
import { products } from "../data/data";
import type { ClothingProduct } from "../data/data";
import ItemsContainer from "./ItemsContainer";

interface CartItem {
    product: ClothingProduct;
    quantity: number;
}

function ThriftHappens() {
    const [inventory, setInventory] = useState<ClothingProduct[]>(products);

    const [checkout, setCheckout] = useState<CartItem[]>([]);

    function addToCheckout(productId: number, quantity: number) {
        const product = inventory.find((item) => item.id === productId);

        if (!product || quantity <= 0 || quantity > product.quantity) {
            return false;
        }

        setInventory((currentInventory) => currentInventory.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - quantity} : item));

        setCheckout((currentCheckout) => {
            const existingItem = currentCheckout.find(
                (item) => item.product.id === productId);

            if (existingItem) {
                return currentCheckout.map((item) => 
                item.product.id === productId ? { ...item, quantity: item.quantity + quantity}
            : item );
            }

            return [...currentCheckout, { product, quantity}];
        });

        return true;
    }

    return (
        <div>
            <h1>Thrift Happens</h1>
            <h2>Available Products</h2>

            <ItemsContainer 
            products={inventory}
            onAddToCheckout={addToCheckout} />

            <h2>Checkout</h2>
            <p>Items in checkout: {checkout.length}</p>
        </div>
    );
}

export default ThriftHappens;