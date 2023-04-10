import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../interfaces/product";
import { Button, Form, Input, Select } from "antd";
import Swal from "sweetalert2";
import { ICategory } from "../interfaces/categorys";
interface IProps {
  products: IProduct[];
  categorys: ICategory[];
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

  const categoryOptions = props.categorys.map((category) => {
    return { label: category.name, value: category._id };
  });

  const [form] = Form.useForm();

  const setFields = () => {
    const category = props.categorys.find(
      (category: ICategory) => category._id === product?.categoryId
    );
    form.setFieldsValue({
      id: product?._id,
      name: product?.name,
      price: product?.price,
      description: product?.description,
      categoryId: category?._id
    });
  };

  const onFinish = (values: any) => {
    Swal.fire("Update!", "Cập nhật thành công", "success").then(() =>
      props.onUpdate(values)
    );
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
        <Form.Item
          label="Product Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Category"
          name="categoryId"
          rules={[{ required: false, message: "Please select a category!" }]}
        >
          <Select options={categoryOptions} />
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
