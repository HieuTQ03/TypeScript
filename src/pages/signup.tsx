import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";

type Props = {};

const Signup = (props: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const { data: user } = await signup(data);
    localStorage.setItem("user", JSON.stringify(user));
    console.log(data);

    message.success("Đăng kí thành công!");
    navigate("/signin");
  };

  const validatePassword = (value: string) => {
    const password = watch("password");
    return value === password || "Mật khẩu không khớp!";
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      className="signup-form"
      style={{ width: 600, margin: "auto" }}
    >
      <h1>Đăng kí</h1>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Name"
          {...register("name")}
        />
      </Form.Item>
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
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be at least 6 characters!" }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          {...register("password")}
        />
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
          {...register("confirmPassword")}
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
