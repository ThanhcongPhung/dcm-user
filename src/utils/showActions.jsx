import { useTranslation } from 'react-i18next';

const showActions = ({ actions }) => {
  const { t } = useTranslation();
  if (!actions) return null;
  return actions.map((action) => ` ${t(action)}`);
};

export default showActions;
