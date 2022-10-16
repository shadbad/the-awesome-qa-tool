/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit';
import { PrimitiveActionType, QuestionAnswerType, SortOrderType } from 'store/types';

type QuestionAnswerStateType = {
    isLoading: boolean,
    error: string,
    items: QuestionAnswerType[],
    sortOrder: SortOrderType
};

const fetch = createAsyncThunk('questionAnswer/fetch', () => {

    const localStorageData = window.localStorage.getItem('questionAnswers');

    return localStorageData ? JSON.parse(localStorageData) : [];

});

const initialState: QuestionAnswerStateType = {
    isLoading: false,
    error: '',
    items: [
        {
            id: '69b281b3-1518-4851-b055-bf81b1e4ea28',
            question: 'How to add a question?',
            answer: 'Just click the add button.',
            date: new Date(2022, 10, 10).valueOf()
        }
    ],
    sortOrder: 'question'
};

const questionAnswerSlice = createSlice({

    name: 'questionAnswer',

    initialState,

    reducers: {

        add: (state, action: PrimitiveActionType<QuestionAnswerType>) => {

            state.items = [...state.items, action.payload];

        },

        update: (state, action: PrimitiveActionType<QuestionAnswerType>) => {

            const index = state.items.findIndex((x) => x.id === action.payload.id);

            state.items = [
                ...state.items.slice(0, index),
                action.payload,
                ...state.items.slice(index + 1)
            ];

        },

        delete: (state, action: PrimitiveActionType<string>) => {

            state.items = state.items.filter((item) => item.id !== action.payload);

        },

        purge: (state) => {

            state.items = [];

        },

        sort: (state, action: PrimitiveActionType<SortOrderType>) => {

            state.items = [...state.items].sort((a, b) => {

                const property = action.payload.split(' ')[0].trim() as 'question' | 'date';

                if (a[property] === b[property]) return 0;

                if (action.payload.endsWith(' desc')) {

                    return a[property] < b[property] ? 1 : -1;

                }

                return a[property] < b[property] ? -1 : 1;

            });

            state.sortOrder = action.payload;

        }
    },

    extraReducers: (builder) => {

        builder.addCase(fetch.pending, (state) => {

            state.isLoading = true;
            state.error = '';
            state.sortOrder = initialState.sortOrder;
            state.items = initialState.items;

        });

        builder.addCase(fetch.rejected, (state, action) => {

            state.isLoading = false;
            state.error = action.error?.message ?? 'Error';
            state.sortOrder = initialState.sortOrder;
            state.items = initialState.items;

        });

        builder.addCase(fetch.fulfilled, (state, action) => {

            state.isLoading = false;
            state.error = '';
            state.sortOrder = action.payload.sortOrder || initialState.sortOrder;
            state.items = action.payload.items || initialState.items;

        });

    }

});

const syncListener = {

    predicate: (action: Action) => Object
        .keys(questionAnswerSlice.actions)
        .map((a) => `questionAnswer/${a}`)
        .includes(action.type),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    effect: (action: Action, listenerApi: { getState: any; }) => {

        const { getState } = listenerApi;
        const { questionAnswer } = getState();

        window.localStorage.setItem(
            'questionAnswers',
            JSON.stringify({
                items: questionAnswer.items,
                sortOrder: questionAnswer.sortOrder
            })
        );

    }
};

export const listeners = { syncListener };

export const actions = { ...questionAnswerSlice.actions, fetch };

export default questionAnswerSlice.reducer;
