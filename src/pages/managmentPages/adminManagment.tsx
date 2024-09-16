import { PageTitle } from "@app/components/common/PageTitle/PageTitle";
import * as S from "@app/components/tables/Tables/Tables.styles";
import { useTranslation } from "react-i18next";
import { AdminBasicTable } from "@app/components/tables/AdminTable/AdminTable";

const NewsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("common.admin-page")}</PageTitle>
      <S.Card
        id="editable-table"
        title={t("common.admin-page")}
        padding="1.25rem 1.25rem 0"
      >
        <AdminBasicTable />
      </S.Card>
    </>
  );
};

export default NewsPage;
