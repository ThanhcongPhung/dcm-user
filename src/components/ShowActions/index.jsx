import { useTranslation } from 'react-i18next';

const ShowAction = ({ actions }) => {
  const { t } = useTranslation();
  if (!actions) return null;
  return actions.map((item, index) =>
    index + 1 < actions.length ? `${t(item)}, ` : `${t(item)}`,
  );
};

export default ShowAction;
