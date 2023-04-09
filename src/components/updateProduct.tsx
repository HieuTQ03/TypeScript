import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../interfaces/product";
import { Button, Form, Input } from "antd";
interface IProps {
  products: IProduct[];
  onUpdate: (product: IProduct) => void;
}

const UpdateProductPage = (props: IProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const currentProduct = props.products.find(
      (product: IProduct) => product._id == String(id)
    );
    setProduct(currentProduct);
  }, [props]);

  useEffect(() => {
    setFields();
  }, [product]);
  const [form] = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      id: product?._id,
      name: product?.name,
      price: product?.price
    });
  };

  const onFinish = (values: any) => {
    props.onUpdate(values);
    navigate("/admin/products");
  };

  return (
    <div>
      <Form form={form} style={{ maxWidth: 600 }} onFinish={onFinish}>
        <Form.Item
          label=""
          name="id"
          style={{ display: "none" }}
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProductPage;
