import KnowMoreComponent from "../../components/KnowMore";
import SectionContainer from "../../containers/SectionContainer";
import { useTranslation } from "react-i18next";

const KnowMore = () => {
    const { t } = useTranslation()
  return (
    <SectionContainer id="know_more" title={t('menu_know_more')} maxWidth="md">
      <KnowMoreComponent />
    </SectionContainer>
  );
};

export default KnowMore;