export interface PrimitiveActionType<T> {

    type: string,
    payload: T

}

export type ModalActionType = {

    type: string,
    payload: {
        modal: 'add' | 'update' | 'delete' | 'none',
        questionAnswer: QuestionAnswerType | null
    }

}

export type SliceStatus = {

    type: 'loading' | 'error' | 'loaded',
    message: string

}

export type QuestionAnswerType = {

    readonly id: string,
    question: string,
    answer: string
    date: number

}

export type QuestionAnswerService = {

    find: (id: string) => QuestionAnswerType | undefined,

    add: (item: QuestionAnswerType) => void,

    update: (item: QuestionAnswerType) => void,

    delete: (id: string) => void,

    purge: () => void,

    sort: (order: 'date' | 'date desc' | 'question' | 'question desc') => void,

    getStatus: () => {
        type: 'error' | 'loaded' | 'loading',
        message: string
    },

    items: QuestionAnswerType[],

    sortOrder: 'date' | 'date desc' | 'question' | 'question desc'

}
