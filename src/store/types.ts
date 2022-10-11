export interface PrimitiveActionType<T> {

    type: string,
    payload: T

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
