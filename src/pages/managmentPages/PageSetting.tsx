import React, { useEffect, useState } from "react";
import { message, Alert, Divider, Col, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  GetAttachmentByPageId,
  UploadAttachment,
  DeleteAttachment,
} from "@app/api/files";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { ImagesForm } from "./UploadedForms/ImagesForm";
import VideoForm from "./UploadedForms/VideoForm";
import FilesForm from "./UploadedForms/FilesForm";
import { PageTitle } from "@app/components/common/PageTitle/PageTitle";
import { Spinner } from "@app/components/common/Spinner/Spinner.styles";

const PageSettingPage: React.FC = () => {
  const { t } = useTranslation();
  const { pageId } = useParams();
  const [form] = BaseForm.useForm();

  const [imagesList, setImagesList] = useState<any[]>([]);
  const [videosList, setVideosList] = useState<any[]>([]);
  const [filesList, setFilesList] = useState<any[]>([]);

  const [newImagesList, setNewImagesList] = useState<any[]>([]);
  const [newVideosList, setNewVideosList] = useState<any[]>([]);
  const [newFilesList, setNewFilesList] = useState<any[]>([]);

  const [isLoading, setLoading] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const { data: attachmentByPageId, refetch } = useQuery(
    ["attachments", pageId, isDeleting, isEditing],
    () => GetAttachmentByPageId(pageId ?? ""),
    {
      onSuccess: (data) => {
        const response = data?.data?.data || [];

        const images = response.filter((item: any) =>
          item.fileType.includes("image")
        );
        const videos = response.filter((item: any) =>
          item.fileType.includes("video")
        );
        const files = response.filter((item: any) =>
          item.fileType.includes("application")
        );
        setImagesList(images);
        setVideosList(videos);
        setFilesList(files);
      },
      onError: (error: any) => {
        message.error(error.message || "Error fetching attachments");
      },
      onSettled: () => setLoading(false),
    }
  );

  const uploadAttachment = useMutation(
    (data: FormData) => UploadAttachment(data),
    {
      onSuccess: () => {
        // message.success(t("Pagess.editPagesSuccessMessage"));
        refetch();
      },
      onError: (error: any) => {
        message.error(error.message || "Error uploading file");
      },
    }
  );

  const handleFileUpload =
    (
      type: "image" | "video" | "application",
      setNewList: React.Dispatch<React.SetStateAction<any[]>>
    ) =>
    (info: any) => {
      const { fileList } = info;
      fileList.forEach((item: any, index: number) => {
        const reader = new FileReader();
        reader.onload = () => {
          const updatedItem = { ...item, url: reader.result };
          if (item.type.includes(type)) {
            setNewList((prevState) => {
              const newList = [...prevState];
              newList[index] = updatedItem;
              return newList;
            });
          }
        };
        reader.readAsDataURL(item.originFileObj);
      });
      setLoading(false);
    };

  const handleSubmission =
    (
      list: any[],
      setNewList: React.Dispatch<React.SetStateAction<any[]>>,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) =>
    () => {
      if (list.length > 0) {
        setLoading(true);

        const promises = list.map((item) => {
          const formData = new FormData();
          formData.append("file", item.originFileObj);
          formData.append("title", item.title || "");
          formData.append("description", item.description || "");
          formData.append("pageId", pageId ?? "");

          return uploadAttachment.mutateAsync(formData); // Use mutateAsync to get a promise
        });

        Promise.all(promises)
          .then(() => {
            message.success("All files uploaded successfully");
          })
          .catch((error) => {
            message.error(error.message || "Error uploading files");
          })
          .finally(() => {
            setLoading(false);
            setNewList([]);
          });
      }
    };

  const handleDelete = (
    type: "image" | "video" | "application",
    uid: string
  ) => {
    setDeleting(true);
    setTimeout(() => {
      const setList =
        type === "image"
          ? setNewImagesList
          : type === "video"
          ? setNewVideosList
          : setNewFilesList;
      setList((prevList) => prevList.filter((item) => item.uid !== uid));
    }, 1000);
  };

  useEffect(() => {
    refetch();
  }, [isDeleting, imagesList, videosList, filesList]);

  return (
    <>
      <PageTitle>{t("common.pageManagment")}</PageTitle>
      <Col span={23} style={{ margin: "1rem auto" }}>
        <ImagesForm
          handeSubmissionImages={handleSubmission(
            newImagesList,
            setNewImagesList,
            setLoading
          )}
          handleDeleteImageCard={(uid) => handleDelete("image", uid)}
          handleUploadImages={handleFileUpload("image", setNewImagesList)}
          imagesList={imagesList}
          newImagesList={newImagesList}
          onFinish={handleSubmission(
            newImagesList,
            setNewImagesList,
            setLoading // Pass setLoading here
          )}
          loading={isLoading}
          setNewImagesList={setNewImagesList}
          setDeleting={setDeleting}
        />
        <Divider />
        <VideoForm
          handeSubmissionVideos={handleSubmission(
            newVideosList,
            setNewVideosList,
            setLoading // Pass setLoading here
          )}
          handleDeleteVideoCard={(uid: string) => handleDelete("video", uid)}
          handleUploadVideos={handleFileUpload("video", setNewVideosList)}
          newVideosList={newVideosList}
          videosList={videosList}
          loading={isLoading}
          setNewVideosList={setNewVideosList}
          onFinish={handleSubmission(
            newVideosList,
            setNewVideosList,
            setLoading
          )}
        />
        <Divider />
        <FilesForm
          filesList={filesList}
          newFilesList={newFilesList}
          setNewFilesList={setNewFilesList}
          handeSubmissionFiles={handleSubmission(
            newFilesList,
            setNewFilesList,
            setLoading
          )}
          handleDeleteFileCard={(uid: string) =>
            handleDelete("application", uid)
          }
          handleUploadFiles={handleFileUpload("application", setNewFilesList)}
          onFinish={handleSubmission(newFilesList, setNewFilesList, setLoading)}
          loading={isLoading}
        />
      </Col>
    </>
  );
};

export default PageSettingPage;
