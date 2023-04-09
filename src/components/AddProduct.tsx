import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IProduct } from "../interfaces/product";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
interface IProps {
  onAdd: (product: IProduct) => void;
}

const AddProductPage = (props: IProps) => {
  const { Dragger } = Upload;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IProduct>();

  const onSubmit: SubmitHandler<IProduct> = (data) => {
    console.log(data);

    props.onAdd(data);
    // navigate("/admin/products");
  };

  return (
    <div>
      <h1>Thêm sản phẩm</h1>
      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input {...register("name")} />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <Input {...register("price")} />
        </Form.Item>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
        <Form.Item
          label="Product Description"
          name="description"
          rules={[
            { required: true, message: "Please input product description!" }
          ]}
        >
          <Input {...register("description")} />
        </Form.Item>

        <Form.Item
          label="Product Category ID"
          name="categoryId"
          rules={[
            { required: true, message: "Please input product category ID!" }
          ]}
        >
          <Input {...register("categoryId")} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add New Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductPage;
