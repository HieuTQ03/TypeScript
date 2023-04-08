import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../interfaces/product";
const ProductDetailPage = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    setProduct(props.products.find((product) => product._id == id));
  });
  console.log(props.products);
  return (
    <div>
      <h1>ProductDetailPage</h1>

      <h3>{product?.name}</h3>
      <div>{product?.description}</div>
      <img src={product?.image} alt="" />
    </div>
  );
};
export default ProductDetailPage;
