import React from "react";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table, { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ICategory } from "../interfaces/categorys";
type Props = {
  categorys: ICategory[];
  onRemove: (_id: number | string) => void;
};

const CategoriesList = (props: Props) => {
  const removeCategory = (_id: number | string) => {
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
  const columns: ColumnsType<ICategory> = [
    {
      title: "CategoriesId",
      dataIndex: "_id",
      key: "_id"
    },
    {
      title: "Categories",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt"
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt"
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
            onClick={() => removeCategory(record._id)}
          >
            Remove
          </Button>

          <Button type="primary" icon={<EditOutlined />}>
            <Link to={`/admin/categorys/${record._id}/update`}> edit </Link>
          </Button>
        </Space>
      )
    }
  ];

  const data: ICategory[] = props.categorys.map((item: ICategory) => {
    return {
      key: item._id,
      ...item
    };
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 6,
          paddingRight: 6,
          alignItems: "center"
        }}
      >
        <div>
          <h1>Danh sách danh mục</h1>
        </div>
        <div>
          <Button
            style={{ marginTop: 10, marginBottom: 10 }}
            type="primary"
            icon={<PlusOutlined />}
          >
            <Link to={"/admin/categorys/add"}> Add New</Link>
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default CategoriesList;
