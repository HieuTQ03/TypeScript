import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { IRegister } from "../interfaces/user";

type Props = {
  onAdd: (user: IRegister) => void;
};

const Signup = (props: Props) => {
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    props.onAdd(values);
    console.log(props);

    message.success("Đăng kí thành công!");
    navigate("/signin");
  };

  return (
    <Form
      onFinish={onSubmit}
      className="signup-form"
      style={{ width: 600, margin: "auto" }}
    >
      <h1>Đăng kí</h1>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Name" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please input a valid email!" }
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be at least 6 characters!" }
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu không khớp!"));
            }
          })
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="signup-button">
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;
