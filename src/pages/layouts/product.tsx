import React from "react";
import { IProduct } from "../../interfaces/product";

type Props = {
  products: IProduct[];
};

const ProductPage = ({ products }: Props) => {
  if (!Array.isArray(products) || !products.length) {
    return <div>Loading...</div>;
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px"
      }}
    >
      {products?.map((item: IProduct, index: number) => (
        <div key={index}>
          <div style={{ paddingTop: 20, paddingBottom: 1 }}>
            <span style={{ fontSize: 18, fontWeight: "bold" }}>
              <a href={`/products/${item._id}`}>{item.name}</a>
            </span>
          </div>
          <br />
          <img src={item.image} alt="" />
          <br />
          {item.description} <br />
          <span style={{ color: "red" }}>{item.price}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
