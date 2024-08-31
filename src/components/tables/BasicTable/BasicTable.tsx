import React, { useEffect, useState } from "react";
import { message, Space } from "antd";
import { Pagination } from "@app/api/pages";
import { Table } from "components/common/Table/Table";
import { Button } from "components/common/buttons/Button/Button";
import { useTranslation } from "react-i18next";
import { AddFormModal } from "@app/components/Modals/AddFormModal";
import * as S from "@app/components/forms/ControlForm/ControlForm.styles";
import { EditFormModal } from "@app/components/Modals/EditFormModal";
import { Modal } from "@app/components/common/Modal/Modal";
import { useMutation, useQuery } from "react-query";
import { notificationController } from "@app/controllers/notificationController";
import { PagesModal } from "@app/domain/NotesModal";
import { Alert } from "@app/components/common/Alert/Alert";
import {
  CreatePage,
  DeletePage,
  GetAllPages,
  PagesTableData,
  UpdatePage,
} from "@app/api/pages";
import dayjs from "dayjs";
import { CURRENT_PAGINATION, PAGE_SIZE_PAGINATION } from "@app/constants/Pages";
import { useNavigate } from "react-router-dom";

export const BasicTable: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [editmodaldata, setEditmodaldata] = useState<PagesModal | undefined>(
    undefined
  );
  const [deletedmodaldata, setDeletedmodaldata] = useState<
    PagesModal | undefined
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
  const [refetchOnAddPage, setRefetchOnAddPage] = useState(false);

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

  const { refetch, isRefetching } = useQuery(
    [
      "pages",
      pagination.current,
      pagination.pageSize,
      isDelete,
      isEdit,
      refetchOnAddPage,
    ],
    () =>
      GetAllPages(pagination.current ?? 1, pagination.pageSize ?? 10, keyWord)
        .then((data) => {
          setTableData(data?.data);
          setLoading(data.data?.success);
        })
        .catch((err) => {
          setLoading(false);
          notificationController.error({
            message: err?.message || err.error?.message,
          });
        })
  );

  // useEffect(() => {
  //   refetch();
  // }, [loading]);

  const AddPage = useMutation((data: PagesModal) =>
    CreatePage(data.name)
      .then(() => {
        notificationController.success({
          message: t("Pagess.addPagesSuccessMessage"),
        });
        setIsAddVisible(false);
        setRefetchOnAddPage(true);
      })
      .catch((error) => {
        notificationController.error({
          message: error.message || error.error?.message,
        });
      })
  );

  const editPage = useMutation((data: PagesModal) => UpdatePage(data));

  const handleEdit = (data: PagesModal, _id: string) => {
    editPage
      .mutateAsync({ ...data, _id })
      .then((data) => {
        setIsEdit(data.data?.success);
        setLoading(true);
        message.open({
          content: (
            <Alert
              message={t(`Pagess.editPagesSuccessMessage`)}
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
      });
  };

  const daletePage = useMutation((id: string) => DeletePage(id));

  const handleDelete = (id: string) => {
    if (pagination.current) {
      if (pagination.current > 1 && tableData?.data?.length === 1) {
        daletePage.mutateAsync(id);
        setPagination({ ...pagination, current: pagination.current - 1 });
        setLoading(true);
      } else {
        daletePage.mutateAsync(id);
        setLoading(false);
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
      render: (name: string) => <span>{name}</span>,
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
      render: (index: number, record: PagesModal) => {
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
            <Button type="default" onClick={() => navigate(`/${record?._id}`)}>
              {t("tables.setting")}
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
      <AddFormModal
        visible={isAddVisible}
        onCancel={hideAddModal}
        onCreate={(data: PagesModal) => {
          AddPage.mutateAsync(data);
        }}
      />
      <EditFormModal
        visible={isEditVisible}
        onCancel={hideEditModal}
        onEdit={(data) =>
          editmodaldata !== undefined && handleEdit(data, editmodaldata._id)
        }
        editedValues={editmodaldata}
      />
      <div>
        <Modal
          title={t("common.DeleteModal")}
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
          <p>{t("modals.deleteEnsureMessage")}</p>
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
        // loading={tableData.loading}
        // onChange={handleTableChange}
        scroll={{ x: 800 }}
        bordered
        loading={loading}
      />
    </>
  );
};
