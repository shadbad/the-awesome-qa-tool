import { configureStore, combineReducers, createListenerMiddleware } from '@reduxjs/toolkit';
import app from './slices/app.slice';
import questionAnswer, { listeners as questionAnswerListeners } from './slices/questionAnswer.slice';

const rootReducer = combineReducers({ app, questionAnswer });
const listenerMiddleware = createListenerMiddleware();

const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) => [listenerMiddleware.middleware, ...getDefaultMiddleware()]
});

listenerMiddleware.startListening(questionAnswerListeners.syncListener);

export type storeType = typeof store;
export type RootStateType = ReturnType<typeof rootReducer>;
export { store };
export { actions as appActions } from './slices/app.slice';
export { actions as questionAnswerActions } from './slices/questionAnswer.slice';
export { initializeStore } from './initialize';
