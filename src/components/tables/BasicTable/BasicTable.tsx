import React, { useState } from "react";
import { message, Space } from "antd";
import { Pagination } from "@app/api/pages.api";
import { Table } from "components/common/Table/Table";
import { Button } from "components/common/buttons/Button/Button";
import { useTranslation } from "react-i18next";
import * as S from "@app/components/forms/ControlForm/ControlForm.styles";
import { EditPageModal } from "@app/components/Modals/EditPageModal";
import { Modal } from "@app/components/common/Modal/Modal";
import { useMutation, useQuery } from "react-query";
import { notificationController } from "@app/controllers/notificationController";
import { PagesModal } from "@app/domain/AppModal";
import { Alert } from "@app/components/common/Alert/Alert";
import {
  CreatePage,
  DeletePage,
  GetAllPages,
  PagesTableData,
  UpdatePage,
} from "@app/api/pages.api";
import dayjs from "dayjs";
import { CURRENT_PAGINATION, PAGE_SIZE_PAGINATION } from "@app/constants/Pages";
import { useNavigate } from "react-router-dom";
import AddPagesModal from "@app/components/Modals/AddPagesModal";

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
  const [refetchOnEditPage, setRefetchOnEditPage] = useState(false);
  const [refetchOnDeletePage, setRefetchOnDeletePage] = useState(false);
  const [total, setTotal] = useState();

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

  const { data } = useQuery(
    [
      "pages",
      pagination.current,
      pagination.pageSize,
      isDelete,
      isEdit,
      refetchOnAddPage,
      refetchOnEditPage,
      refetchOnDeletePage,
    ],
    async () => {
      setLoading(true);
      return await GetAllPages(
        pagination.current ?? 1,
        pagination.pageSize ?? 10,
        keyWord
      )
        .then((data) => {
          setTotal(data?.data?.total);
          setTableData(data?.data);
          setLoading(false);
          return data;
        })
        .catch((err) => {
          setLoading(false);
          notificationController.error({
            message: err?.message || err.error?.message,
          });
          throw err;
        });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onError: (err: any) => {
        notificationController.error({
          message: err?.message || "An error occurred",
        });
      },
    }
  );

  const AddPage = useMutation((data: PagesModal) =>
    CreatePage(data.name)
      .then(() => {
        notificationController.success({
          message: t("common.addPagesSuccessMessage"),
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
        setIsEditVisible(false);
        setRefetchOnEditPage(true);
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
        setRefetchOnEditPage(false);
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
        daletePage
          .mutateAsync(id)
          .then(() => {
            notificationController.success({
              message: t("common.deletePagesSuccessMessage"),
            });
            setIsAddVisible(false);
            setRefetchOnDeletePage(true);
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
            <Button
              type="default"
              onClick={() => navigate(`/pageSetting/${record?._id}`)}
            >
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
      <AddPagesModal
        visible={isAddVisible}
        onCancel={hideAddModal}
        onCreate={(data: PagesModal) => {
          AddPage.mutateAsync(data);
        }}
      />
      <EditPageModal
        visible={isEditVisible}
        onCancel={hideEditModal}
        onEdit={(data) =>
          editmodaldata !== undefined && handleEdit(data, editmodaldata._id)
        }
        editedValues={editmodaldata}
        title="Page"
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
          total: total,
        }}
        scroll={{ x: 800 }}
        bordered
        loading={loading}
      />
    </>
  );
};
