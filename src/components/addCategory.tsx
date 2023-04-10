import React from "react";
import { ICategory } from "../interfaces/categorys";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Select } from "antd";

type Props = {
  categorys: ICategory[];
  onAdd: (categories: ICategory) => void;
};

const AddCategory = (props: Props) => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    Swal.fire("Good!", "Thêm danh mục thành công", "success").then(() =>
      props.onAdd(values)
    );
    navigate("/admin/categorys");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ paddingTop: 20 }}>
      <h1>Thêm danh mục</h1>
      <Form
        name="basic"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 800 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Categories Name"
          name="name"
          rules={[{ required: true, message: "Please input categories name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add New Categories
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCategory;
