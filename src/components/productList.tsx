import React from "react";
import { IProduct } from "../interfaces/product";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table, { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
type Props = {
  products: IProduct[];
  onRemove: (_id: number | string) => void;
};

const ProductList = (props: Props) => {
  const removeProduct = (_id: number) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Bạn sẽ không thể hoàn nguyên điều này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Tập tin đã bị xóa", "success").then(() =>
          props.onRemove(_id)
        );
      }
    });
  };
  const columns: ColumnsType<IProduct> = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>
    },
    {
      title: "Product Price",
      dataIndex: "price",
      key: "price"
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Images",
      dataIndex: "image",
      render: (image) => <img width={80} src={image} alt="" />
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => removeProduct(record._id)}
          >
            Remove
          </Button>

          <Button type="primary" icon={<EditOutlined />}>
            <Link to={`/admin/products/${record._id}/update`}>edit </Link>
          </Button>
        </Space>
      )
    }
  ];

  const data: IProduct[] = props.products.map((item: IProduct) => {
    return {
      key: item._id,
      ...item
    };
  });

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />}>
        <Link to={"/admin/products/add"}> Add New</Link>
      </Button>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 3 }} />
    </div>
  );
};

export default ProductList;
