import React, { useEffect, useState } from "react";
import { message, Space } from "antd";
import { Pagination } from "@app/api/pages.api";
import { Table } from "components/common/Table/Table";
import { Button } from "components/common/buttons/Button/Button";
import { useTranslation } from "react-i18next";
import { AddFormModal } from "@app/components/Modals/AddFormModal";
import * as S from "@app/components/forms/ControlForm/ControlForm.styles";
import { EditFormModal } from "@app/components/Modals/EditFormModal";
import { Modal } from "@app/components/common/Modal/Modal";
import { useMutation, useQuery } from "react-query";
import { notificationController } from "@app/controllers/notificationController";
import { NewsModal } from "@app/domain/AppModal";
import { Alert } from "@app/components/common/Alert/Alert";
import { PagesTableData } from "@app/api/pages.api";
import dayjs from "dayjs";
import { CURRENT_PAGINATION, PAGE_SIZE_PAGINATION } from "@app/constants/Pages";
import { useNavigate } from "react-router-dom";
import { AddNewsModal } from "@app/components/Modals/AddNewsModal";
import { EditNewsModal } from "@app/components/Modals/EditNewsModal";
import {
  GetAllAdmins,
  CreateAdmin,
  DeleteAdmin,
  UpdateAdmin,
} from "@app/api/admin.api";

export const AdminBasicTable: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [editmodaldata, setEditmodaldata] = useState<NewsModal | undefined>(
    undefined
  );
  const [deletedmodaldata, setDeletedmodaldata] = useState<
    NewsModal | undefined
  >(undefined);
  const [tableData, setTableData] = useState<{ data: PagesTableData[] }>({
    data: [],
  });
  const [pagination, setPagination] = useState<Pagination>({
    current: CURRENT_PAGINATION,
    pageSize: PAGE_SIZE_PAGINATION,
  });
  const [isAddVisible, setIsAddVisible] = useState<boolean>(false);
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [keyWord, setKeyWord] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [refetchOnAddNew, setRefetchOnAddNew] = useState(false);
  const [refetchOnEditNew, setRefetchOnEditNew] = useState(false);
  const [refetchOnDeleteNew, setRefetchOnDeleteNew] = useState(false);

  const showAddModal = () => {
    setIsAddVisible(true);
  };
  const hideAddModal = () => {
    setIsAddVisible(false);
  };
  const showEditModal = () => {
    setIsEditVisible(true);
  };
  const hideEditModal = () => {
    setIsEditVisible(false);
  };

  const { data, isLoading, refetch, isRefetching, isFetched, error } = useQuery(
    [
      "pages",
      pagination.current,
      pagination.pageSize,
      isDelete,
      isEdit,
      refetchOnAddNew,
      refetchOnEditNew,
      refetchOnDeleteNew,
    ],
    async () => {
      setLoading(true); // Set loading to true before the API request
      return await GetAllAdmins(
        pagination.current ?? 1,
        pagination.pageSize ?? 10,
        keyWord
      )
        .then((data) => {
          setTableData(data?.data);
          setLoading(false); // Set loading to false after receiving data
          return data; // Ensure the data is returned for useQuery to process
        })
        .catch((err) => {
          setLoading(false); // Set loading to false on error
          notificationController.error({
            message: err?.message || err.error?.message,
          });
          throw err; // Ensure the error is thrown to let useQuery handle it
        });
    }
  );

  useEffect(() => {
    refetch();
  }, [isFetched]);

  const AddNew = useMutation((data: NewsModal) =>
    CreateAdmin(data.title)
      .then(() => {
        notificationController.success({
          message: t("common.addPagesSuccessMessage"),
        });
        setIsAddVisible(false);
        setRefetchOnAddNew(true);
      })
      .catch((error) => {
        notificationController.error({
          message: error.message || error.error?.message,
        });
      })
  );

  const editNew = useMutation((data: NewsModal) => UpdateAdmin(data));

  const handleEdit = (data: NewsModal, _id: string) => {
    editNew
      .mutateAsync({ ...data, _id })
      .then((data) => {
        setIsEdit(data.data?.success);
        setIsEditVisible(false);
        setRefetchOnEditNew(true);
        message.open({
          content: (
            <Alert
              message={t(`common.editPagesSuccessMessage`)}
              type={`success`}
              showIcon
            />
          ),
        });
      })
      .catch((error) => {
        message.open({
          content: (
            <Alert
              message={error.error?.message || error.message}
              type={`error`}
              showIcon
            />
          ),
        });
      })
      .finally(() => {
        setLoading(false);
        setRefetchOnEditNew(false);
      });
  };

  const daleteNew = useMutation((id: string) => DeleteAdmin(id));

  const handleDelete = (id: string) => {
    if (pagination.current) {
      if (pagination.current > 1 && tableData?.data?.length === 1) {
        daleteNew.mutateAsync(id);
        setPagination({ ...pagination, current: pagination.current - 1 });
        setLoading(true);
      } else {
        daleteNew
          .mutateAsync(id)
          .then(() => {
            notificationController.success({
              message: t("common.deletePagesSuccessMessage"),
            });
            setIsAddVisible(false);
            setRefetchOnDeleteNew(true);
          })
          .catch((error) => {
            notificationController.error({
              message: error.message || error.error?.message,
            });
          })
          .finally(() => setLoading(false));
      }
    }
  };

  const columns = [
    {
      title: t("common.id"),
      dataIndex: "_id",
      width: "2%",
      render: (id: string) => <span>{id?.substring(0, 3)}</span>,
    },
    {
      title: t("common.name"),
      dataIndex: "name",
      width: "20%",
      render: (name: string) => <span>{name}</span>,
    },
    {
      title: t("common.password"),
      dataIndex: "password",
      width: "20%",

      render: (password: string) => <span>{password}</span>,
    },
    {
      title: t("common.email"),
      dataIndex: "email",
      width: "20%",

      render: (email: string) => <span>{email}</span>,
    },
    {
      title: t("common.createdAt"),
      dataIndex: "createdAt",
      width: "10%",
      render: (date: string) => <span>{dayjs(date).format("YYYY-MM-DD")}</span>,
    },
    {
      title: t("common.updatedAt"),
      dataIndex: "updatedAt",
      width: "10%",
      render: (date: string) => <span>{dayjs(date).format("YYYY-MM-DD")}</span>,
    },

    {
      title: t("tables.actions"),
      dataIndex: "actions",
      width: "15%",
      render: (index: number, record: NewsModal) => {
        return (
          <Space>
            <Button
              type="ghost"
              onClick={() => {
                showEditModal();
                setEditmodaldata(record);
              }}
            >
              {t("common.edit")}
            </Button>
            <Button
              type="default"
              danger
              onClick={() => {
                setIsDeleteVisible(true);
                setDeletedmodaldata(record);
              }}
            >
              {t("tables.delete")}
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <S.AddUserButton type="default" htmlType="button" onClick={showAddModal}>
        {t("common.add")}
      </S.AddUserButton>
      <AddNewsModal
        visible={isAddVisible}
        onCancel={hideAddModal}
        onCreate={(data: NewsModal) => {
          AddNew.mutateAsync(data);
        }}
      />
      <EditNewsModal
        visible={isEditVisible}
        onCancel={hideEditModal}
        onEdit={(data) =>
          editmodaldata !== undefined && handleEdit(data, editmodaldata._id)
        }
        editedValues={editmodaldata}
        title="news"
      />
      <div>
        <Modal
          title={t("common.deleteModal")}
          centered
          visible={isDeleteVisible}
          onOk={() => {
            deletedmodaldata?._id && handleDelete(deletedmodaldata?._id);
            setIsDeleteVisible(false);
            setIsDelete(true);
          }}
          onCancel={() => setIsDeleteVisible(false)}
          size="small"
        >
          <p>{t("common.deleteEnsureMessage")}</p>
        </Modal>
      </div>
      <Table
        columns={columns}
        dataSource={tableData.data}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          onChange: (page: number, pageSize: number) => {
            setPagination({
              current: page,
              pageSize: pageSize,
            });
          },
          total: 20,
        }}
        // loading={loading}
        // onChange={handleTableChange}
        scroll={{ x: 800 }}
        bordered
        loading={loading}
      />
    </>
  );
};
