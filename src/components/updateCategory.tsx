import React, { useEffect, useState } from "react";
import { ICategory } from "../interfaces/categorys";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Select } from "antd";

type Props = {
  categorys: ICategory[];
  onUpdate: (categories: ICategory) => void;
};

const UpdateCategory = (props: Props) => {
  const [categories, setCategories] = useState<ICategory>();
  const { id } = useParams();
  useEffect(() => {
    const currentCategories = props.categorys.find(
      (categorys: ICategory) => categorys._id == String(id)
    );

    setCategories(currentCategories);
  }, [props]);

  useEffect(() => {
    setFields();
  }, [categories]);

  const [form] = Form.useForm();
  const setFields = () => {
    form.setFieldsValue({
      id: categories?._id,
      name: categories?.name
    });
  };

  const navigate = useNavigate();

  const onFinish = (values: any) => {
    Swal.fire("Good!", "Update danh mục thành công", "success").then(() =>
      props.onUpdate(values)
    );
    navigate("/admin/categorys");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>Thêm danh mục</h1>
      <Form
        name="basic"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 1000 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label=""
          name="id"
          style={{ display: "none" }}
          rules={[{ required: true, message: "Please input your id!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Categories Name"
          name="name"
          rules={[{ required: true, message: "Please input categories name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update New Categories
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateCategory;
