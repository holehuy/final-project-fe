import { REQUEST } from 'utils/actionType';
import { SUMMARIZE_ARTICLE } from 'containers/ExaminationPage/constants';

export function summarizeArticle(dataArticle) {
  return {
    type: REQUEST(SUMMARIZE_ARTICLE),
    dataArticle,
  };
}
