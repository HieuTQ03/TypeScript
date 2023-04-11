import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../api/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Props = {};

const Signin = (props: Props) => {
  const {
    register,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

  const onFinish = async (data: any) => {
    const { data: user } = await login(data);
    localStorage.setItem("user", JSON.stringify(user));
   

    message.success("Đăng nhập thành công!");
    if (user.user.role == "admin") {
      navigate("/admin/products");
    } else {
      navigate("/products");
    }
  };

  return (
    <Form onFinish={onFinish} style={{ width: 600, margin: " auto" }}>
      <h1>Đăng nhập</h1>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please input a valid email!" }
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Email"
          {...register("email")}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          {...register("password")}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signin;
