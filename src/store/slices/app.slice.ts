/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ModalActionType, QuestionAnswerType } from 'store/types';

type AppStateType = {
    modal: 'add' | 'update' | 'delete' | 'purge' | 'none',

    questionAnswer: QuestionAnswerType | null
};

const initialState: AppStateType = {
    modal: 'none',
    questionAnswer: null
};

const appSlice = createSlice({

    name: 'app',

    initialState,

    reducers: {

        setModal: (state, action: ModalActionType) => {

            state.modal = action.payload.modal;
            state.questionAnswer = action.payload.questionAnswer;

        }

    }

});

export const actions = { ...appSlice.actions };

export default appSlice.reducer;
