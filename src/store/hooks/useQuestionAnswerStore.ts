import { useSelector, useDispatch } from 'react-redux';
import { RootStateType, questionAnswerActions } from 'store';
import { QuestionAnswerType, SliceStatus } from 'store/types';
import { generateId } from 'utilities';

function useQuestionAnswerStore() {

    const data = useSelector((state: RootStateType) => state.questionAnswer);

    const dispatch = useDispatch();

    return {

        find(id: string): QuestionAnswerType | undefined {

            return data.items.find((qa) => qa.id === id);

        },

        add(question: string, answer: string): void {

            const qa: QuestionAnswerType = {
                id: generateId(),
                date: new Date().valueOf(),
                question,
                answer
            };

            dispatch(questionAnswerActions.add(qa));

        },

        update(item: QuestionAnswerType): void {

            dispatch(questionAnswerActions.update(item));

        },

        delete(id: string): void {

            dispatch(questionAnswerActions.delete(id));

        },

        purge(): void {

            dispatch(questionAnswerActions.purge());

        },

        sort(order: 'date' | 'date desc' | 'question' | 'question desc') {

            dispatch(questionAnswerActions.sort(order));

        },

        getStatus(): SliceStatus {

            let type: 'error' | 'loaded' | 'loading' = 'loaded';

            if (data.error !== '') type = 'error';
            else if (data.isLoading) type = 'loading';

            return {
                type,
                message: data.error
            };

        },

        items: data.items,

        sortOrder: data.sortOrder

    };

}

export { useQuestionAnswerStore };
