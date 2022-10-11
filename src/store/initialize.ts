import type { } from 'redux-thunk/extend-redux';
import { store, questionAnswerActions } from 'store';

const initializeStore = function () {

    store.dispatch(questionAnswerActions.fetch());

};

export { initializeStore };
