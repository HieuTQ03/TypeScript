import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  addProduct,
  getProducts,
  removeProduct,
  updateProduct
} from "./api/product";
import AdminLayout from "./components/adminLayout";
import ProductList from "./components/productList";
import RootLayout from "./components/rootLayout";
import { IProduct } from "./interfaces/product";
import Signin from "./pages/signin";
import React from "react";
import ProductPage from "./pages/layouts/product";
import HomePage from "./components/homePage";
import UpdateProductPage from "./components/updateProduct";
import AddProductPage from "./components/AddProduct";
import ProductDetailPage from "./pages/layouts/ProductDetail";
import Signup from "./pages/signup";

function App() {
  const [products, setProduct] = useState<IProduct[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProducts();
        const newProducts = data.product.docs;
        setProduct(newProducts);
      } catch (error) {}
    })();
  }, []);
  const onHandelRemove = async (id: string | number) => {
    try {
      await removeProduct(id);
      const { data } = await getProducts();
      const newProducts = data.product.docs;
      setProduct(newProducts);
    } catch (error) {}
  };
  const onHandleUpdate = async (product: IProduct) => {
    try {
      await updateProduct(product);
      const { data } = await getProducts();
      const newProducts = data.product.docs;
      setProduct(newProducts);
    } catch (error) {}
  };
  const onHandleAdd = async (product: IProduct) => {
    try {
      await addProduct(product);
      const { data } = await getProducts();
      const newProducts = data.product.docs;
      setProduct(newProducts);
    } catch (error) {}
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" index element={<HomePage />} />
          <Route
            path="products"
            element={<ProductPage products={products} />}
          />
          <Route
            path="products/:id"
            element={<ProductDetailPage products={products} />}
          />
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route
            path="products"
            element={
              <ProductList onRemove={onHandelRemove} products={products} />
            }
          />
          <Route
            path="products/add"
            element={<AddProductPage onAdd={onHandleAdd} />}
          />

          <Route
            path="products/:id/update"
            element={
              <UpdateProductPage
                onUpdate={onHandleUpdate}
                products={products}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
