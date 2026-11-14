import { products } from "./data/data";
import ItemsContainer from "./components/ItemsContainer";
import './App.css'

function App() {
  return (
    <div>
      <h1>Thrift Happens</h1>
      <h2>Available Products</h2>

      <p>Total Products: {products.length}</p>

      <ItemsContainer products={products} />
    </div>
  )
}

export default App
