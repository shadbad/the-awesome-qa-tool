import { useSelector, useDispatch } from 'react-redux';
import { RootStateType, appActions } from 'store';
import { QuestionAnswerType } from 'store/types';

function useAppStore() {

    const data = useSelector((state: RootStateType) => state.app);
    const dispatch = useDispatch();

    return {

        setModal(modal: 'add' | 'update' | 'delete' | 'purge' | 'none', questionAnswer: QuestionAnswerType | null) {

            dispatch(appActions.setModal(
                {
                    modal,
                    questionAnswer
                }
            ));

        },

        toggleMenu() {

            dispatch(appActions.toggleMenu());

        },

        modal: data.modal,

        qa: data.questionAnswer,

        isMenuExpanded: data.isMenuExpanded

    };

}

export { useAppStore };
