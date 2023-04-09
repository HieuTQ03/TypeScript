import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import { ICategory } from "./interfaces/categorys";
import { getAllCategory } from "./api/categorys";

function App() {
  const [products, setProduct] = useState<IProduct[]>([]);
  const [categoris, setCategoris] = useState<ICategory[]>([]);

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
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getAllCategory();
        const newCategorys = data.data;
        setCategoris(newCategorys);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
              <ProductList
                onRemove={onHandelRemove}
                products={products}
                categorys={categoris}
              />
            }
          />
          <Route
            path="products/add"
            element={
              <AddProductPage onAdd={onHandleAdd} categorys={categoris} />
            }
          />

          <Route
            path="products/:id/update"
            element={
              <UpdateProductPage
                onUpdate={onHandleUpdate}
                products={products}
                categorys={categoris}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
