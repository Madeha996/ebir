import { PageTitle } from "@app/components/common/PageTitle/PageTitle";
import * as S from "@app/components/tables/Tables/Tables.styles";
import { NewsBasicTable } from "@app/components/tables/NewsTable/NewsTable";
import { useTranslation } from "react-i18next";

const NewsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("common.news-page")}</PageTitle>
      <S.Card
        id="editable-table"
        title={t("common.news-page")}
        padding="1.25rem 1.25rem 0"
      >
        <NewsBasicTable />
      </S.Card>
    </>
  );
};

export default NewsPage;
