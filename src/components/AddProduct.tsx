import React from "react";
import { IProduct } from "../interfaces/product";
import { Button, Checkbox, Form, Input, Select, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";
import { ICategory } from "../interfaces/categorys";
import Swal from "sweetalert2";
interface IProps {
  categorys: ICategory[];
  onAdd: (product: IProduct) => void;
}

const AddProductPage = (props: IProps) => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    Swal.fire("Good!", "Thêm sản phẩm thành công", "success").then(() =>
      props.onAdd(values)
    );
    navigate("/admin/products");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const categoryOptions = props.categorys.map((category) => {
    return { label: category.name, value: category._id };
  });
  return (
    <div>
      <h1>Thêm sản phẩm</h1>
      <Form
        name="basic"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 1000 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[
            { required: true, message: "Please input product description!" }
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Product Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => e && e.fileList}
          rules={[{ required: false, message: "Please upload product image!" }]}
        >
          <Upload.Dragger name="image">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area</p>
            <p className="ant-upload-hint">
              Support for a single upload. Strictly prohibit from uploading
              company data or other band files
            </p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item
          label="Product Category"
          name="categoryId"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select options={categoryOptions} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add New Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductPage;
