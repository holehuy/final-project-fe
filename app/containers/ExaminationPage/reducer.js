/* eslint-disable no-case-declarations */
import produce from 'immer';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
import { SUMMARIZE_ARTICLE } from 'containers/ExaminationPage/constants';

const export initialState = {
    dataCostSetting = {
        data: [],
        isFetching: false,
    }
}

const examinationReducer = (state = initialState, action)=>{
    produce(state,draft)=>{
        switch (action.type) {
            case REQUEST(SUMMARIZE_ARTICLE):
                draft.isFetching = true;
                // draft.isSuccess = false;
                // draft.isError = false;
                break;
            case SUCCESS(SUMMARIZE_ARTICLE):
                draft.dataCostSetting = action.payload.data;
                draft.isFetching = false;
                // draft.isSuccess = true;
                // draft.isError = false;
                break;
            case FAILURE(SUMMARIZE_ARTICLE):
                draft.dataCostSetting = {};
                draft.isFetching = false;
                // draft.isSuccess = true;
                // draft.isError = false;
            default: 
                break;
        }
    }
}

export default examinationReducer;