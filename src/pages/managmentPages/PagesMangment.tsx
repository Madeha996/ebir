import { PageTitle } from "@app/components/common/PageTitle/PageTitle";
import * as S from "@app/components/tables/Tables/Tables.styles";
import { BasicTable } from "@app/components/tables/BasicTable/BasicTable";
import { useTranslation } from "react-i18next";

const PagesManagmentPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("common.pages-managment")}</PageTitle>
      <S.Card
        id="editable-table"
        title={t("common.pages-managment")}
        padding="1.25rem 1.25rem 0"
      >
        <BasicTable />
      </S.Card>
    </>
  );
};

export default PagesManagmentPage;
