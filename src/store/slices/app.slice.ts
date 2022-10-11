/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { PrimitiveActionType } from 'store/types';

type AppStateType = {
    modal: 'add' | 'update' | 'delete' | 'none'
};

const initialState: AppStateType = {
    modal: 'none'
};

const appSlice = createSlice({

    name: 'app',

    initialState,

    reducers: {

        setModal: (state, action: PrimitiveActionType<'add' | 'update' | 'delete' | 'none'>) => {

            state.modal = action.payload;

        }

    }

});

export const actions = { ...appSlice.actions };

export default appSlice.reducer;
