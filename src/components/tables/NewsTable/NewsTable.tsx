import React, { useEffect, useState } from "react";
import { message, Space } from "antd";
import { Pagination } from "@app/api/pages.api";
import { Table } from "components/common/Table/Table";
import { Button } from "components/common/buttons/Button/Button";
import { useTranslation } from "react-i18next";
import * as S from "@app/components/forms/ControlForm/ControlForm.styles";
import { Modal } from "@app/components/common/Modal/Modal";
import { useMutation, useQuery } from "react-query";
import { notificationController } from "@app/controllers/notificationController";
import { NewsModal } from "@app/domain/AppModal";
import { Alert } from "@app/components/common/Alert/Alert";
import { PagesTableData } from "@app/api/pages.api";
import dayjs from "dayjs";
import { CURRENT_PAGINATION, PAGE_SIZE_PAGINATION } from "@app/constants/Pages";
import { CreateNew, DeleteNew, GetAllNews, UpdateNew } from "@app/api/news.api";
import { EditNewsModal } from "@app/components/Modals/EditNewsModal";
import AddNewsModal from "@app/components/Modals/AddNewsModal";

export const NewsBasicTable: React.FC = () => {
  const { t } = useTranslation();
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
  const [keyWord, setKeyWord] = useState<string>("");
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

  const { isLoading, refetch, isRefetching, isFetched } = useQuery(
    ["news", pagination.current, pagination.pageSize, keyWord],
    async () => {
      const response = await GetAllNews(
        pagination.current ?? 1,
        pagination.pageSize ?? 10,
        keyWord
      );
      setTotal(response?.data?.total ?? 0);
      setTableData(response?.data ?? { data: [] });
      return response;
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

  useEffect(() => {
    if (isFetched) {
      refetch();
    }
  }, [isFetched, refetch]);

  const AddNew = useMutation((data: NewsModal) =>
    CreateNew(data.title)
      .then(() => {
        notificationController.success({
          message: t("common.addNewSuccessMessage"),
        });
        setIsAddVisible(false);
        refetch();
      })
      .catch((error) => {
        notificationController.error({
          message: error.message || "An error occurred",
        });
      })
  );

  const editNew = useMutation((data: NewsModal) => UpdateNew(data));

  const handleEdit = (data: NewsModal, _id: string) => {
    editNew
      .mutateAsync({ ...data, _id })
      .then(() => {
        setIsEditVisible(false);
        refetch();
        message.open({
          content: (
            <Alert
              message={t(`common.editNewSuccessMessage`)}
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
              message={error.message || "An error occurred"}
              type={`error`}
              showIcon
            />
          ),
        });
      });
  };

  const deleteNew = useMutation((id: string) => DeleteNew(id));

  const handleDelete = (id: string) => {
    deleteNew
      .mutateAsync(id)
      .then(() => {
        notificationController.success({
          message: t("common.deleteNewSuccessMessage"),
        });
        setIsDeleteVisible(false);
        refetch();
      })
      .catch((error) => {
        notificationController.error({
          message: error.message || "An error occurred",
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
      dataIndex: "title",
      render: (title: string) => <span>{title}</span>,
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
        loading={isLoading || isRefetching}
      />
    </>
  );
};
