import React, { useState } from "react";
import { message, Space } from "antd";
import { Pagination } from "@app/api/pages.api";
import { Table } from "components/common/Table/Table";
import { Button } from "components/common/buttons/Button/Button";
import { useTranslation } from "react-i18next";

import { EditAdminModal } from "@app/components/Modals/EditAdminModal";
import { Modal } from "@app/components/common/Modal/Modal";
import { useMutation, useQuery } from "react-query";
import { notificationController } from "@app/controllers/notificationController";
import { AdminModal } from "@app/domain/AppModal";
import { Alert } from "@app/components/common/Alert/Alert";
import { PagesTableData } from "@app/api/pages.api";
import dayjs from "dayjs";
import { CURRENT_PAGINATION, PAGE_SIZE_PAGINATION } from "@app/constants/Pages";
import {
  GetAllAdmins,
  CreateAdmin,
  DeleteAdmin,
  UpdateAdmin,
} from "@app/api/admin.api";
import * as S from "@app/components/forms/ControlForm/ControlForm.styles";
import AddAdmainModal from "@app/components/Modals/AddAdminModal";

export const AdminBasicTable: React.FC = () => {
  const { t } = useTranslation();
  const [editmodaldata, setEditmodaldata] = useState<AdminModal | undefined>(
    undefined
  );
  const [deletedmodaldata, setDeletedmodaldata] = useState<
    AdminModal | undefined
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
  const [keyWord, setKeyWord] = useState<string>("");
  const [total, setTotal] = useState<number>();

  const showAddModal = () => setIsAddVisible(true);
  const hideAddModal = () => setIsAddVisible(false);
  const showEditModal = () => setIsEditVisible(true);
  const hideEditModal = () => setIsEditVisible(false);

  const { data, isLoading, refetch, isFetching, error } = useQuery(
    ["pages", pagination.current, pagination.pageSize, keyWord],
    () =>
      GetAllAdmins(pagination.current ?? 1, pagination.pageSize ?? 5, keyWord),
    {
      onSuccess: (data) => {
        setTotal(data?.data?.total);
        setTableData(data?.data);
      },
      onError: (err: any) => {
        notificationController.error({
          message: err?.message || err.error?.message,
        });
      },
      refetchOnWindowFocus: false, // Prevent refetching on window focus
      keepPreviousData: true, // Optionally keep previous data while refetching
    }
  );

  const AddNew = useMutation((data: AdminModal) =>
    CreateAdmin(data.name, data.email, data.password)
      .then(() => {
        notificationController.success({
          message: t("common.addAdminSuccessMessage"),
        });
        setIsAddVisible(false);
        refetch(); // Trigger a refetch after adding a new admin
      })
      .catch((error) => {
        notificationController.error({
          message: error.message || error.error?.message,
        });
      })
  );

  const editNew = useMutation((data: AdminModal) => UpdateAdmin(data));

  const handleEdit = (data: AdminModal, _id: string) => {
    editNew
      .mutateAsync({ ...data, _id })
      .then(() => {
        setIsEditVisible(false);
        refetch(); // Trigger a refetch after editing an admin
        message.open({
          content: (
            <Alert
              message={t(`common.editAdminSuccessMessage`)}
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
      });
  };

  const deleteNew = useMutation((id: string) => DeleteAdmin(id));

  const handleDelete = (id: string) => {
    deleteNew
      .mutateAsync(id)
      .then(() => {
        notificationController.success({
          message: t("common.deleteAdminSuccessMessage"),
        });
        refetch(); // Trigger a refetch after deleting an admin
      })
      .catch((error) => {
        notificationController.error({
          message: error.message || error.error?.message,
        });
      });
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
      columnWidth: "20%",
      render: (name: string) => <span>{name}</span>,
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
      render: (index: number, record: AdminModal) => {
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
      <AddAdmainModal
        visible={isAddVisible}
        onCancel={hideAddModal}
        onCreate={(data: AdminModal) => {
          AddNew.mutateAsync(data);
        }}
      />
      <EditAdminModal
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
          total: total,
        }}
        loading={isLoading || isFetching}
      />
    </>
  );
};
