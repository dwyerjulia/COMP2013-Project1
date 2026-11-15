import { useState } from "react";
import { products } from "../data/data";
import type { ClothingProduct } from "../data/data";
import ItemsContainer from "./ItemsContainer";
import CheckoutContainer from "./CheckoutContainer";

interface CartItem {
    product: ClothingProduct;
    quantity: number;
}

interface ShopState {
  inventory: ClothingProduct[];
  checkout: CartItem[];
}

function ThriftHappens() {
    const [shop, setShop] = useState<ShopState>({
    inventory: products.map((product) => ({ ...product })),
    checkout: [],
    });

    function addToCheckout(productId: number, quantity: number): boolean {
        const product = shop.inventory.find(
            (item) => item.id === productId
        );

        if (!product || quantity <= 0 || quantity > product.quantity) {
            return false;
        }

        setShop((currentShop) => {
            const currentProduct = currentShop.inventory.find(
                (item) => item.id === productId
            );

            if (!currentProduct || quantity <= 0 || quantity > currentProduct.quantity) {
                return currentShop;
            }

            const updatedInventory = currentShop.inventory.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity - quantity }: item );

            const existingItem = currentShop.checkout.find((item) => item.product.id === productId );
            
            let updatedCheckout: CartItem[];

            if (existingItem) {
                updatedCheckout = currentShop.checkout.map((item) =>
                    item.product.id === productId ? { ...item, quantity: item.quantity + quantity }: item
                );
            } else {
                updatedCheckout = [
                    ...currentShop.checkout,
                    { product: currentProduct, quantity },
                ];
            }

            return {
                inventory: updatedInventory,
                checkout: updatedCheckout,
            };
        });

        return true;
    }

    function removeFromCheckout(productId: number) {
        setShop((currentShop) => {
            const removedItem = currentShop.checkout.find(
                (item) => item.product.id === productId
            );

            if (!removedItem) {
                return currentShop;
            }

            const updatedInventory = currentShop.inventory.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + removedItem.quantity} : item 
            );

            const updatedCheckout = currentShop.checkout.filter(
                (item) => item.product.id !== productId
            );

            return {
                inventory: updatedInventory,
                checkout: updatedCheckout,
            };
        });
    }

    function emptyCheckout() {
        setShop((currentShop) => {
            const updatedInventory = currentShop.inventory.map((product) => {
                const cartItem = currentShop.checkout.find(
                    (item) => item.product.id === product.id
                );

                return {
                    ...product, 
                    quantity: product.quantity + (cartItem?.quantity ?? 0),
                };
            });

            return {
                inventory: updatedInventory,
                checkout: [],
            };
        });
    }

    return (
        <div className="thrift-happens">
    <h1>Thrift Happens</h1>

    <h2>Available Products</h2>

    <ItemsContainer
      products={shop.inventory}
      onAddToCheckout={addToCheckout}
    />

    <CheckoutContainer
      checkout={shop.checkout}
      onRemove={removeFromCheckout}
      onEmpty={emptyCheckout}
    />
  </div>
    );
}

export default ThriftHappens;