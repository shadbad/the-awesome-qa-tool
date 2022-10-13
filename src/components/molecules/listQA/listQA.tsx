import { QuestionAnswerType } from 'store/types';
import { Tooltip } from 'components/atoms';
import { ViewQA, Paginator } from 'components/molecules';
import './list-qa.scss';

function ListQA({ className, items, onItemEdit, onItemDelete }: PropTypes) {

    return (

        <div className={`list-qa ${className}`}>

            <Tooltip tip="Here you can find created questions and their answers.">

                <h2 className="form-qa__heading">Created questions</h2>

            </Tooltip>

            <Paginator size={items.length}>

                {
                    items.map((item) => (

                        <ViewQA
                            key={item.id}
                            questionAnswer={item}
                            onDelete={onItemDelete}
                            onEdit={onItemEdit}
                        />

                    ))
                }

            </Paginator>

        </div>

    );

}

type PropTypes = {

    className?: string,
    items: QuestionAnswerType[],
    onItemEdit: (item: QuestionAnswerType) => void,
    onItemDelete: (itemId: string) => void
}

ListQA.defaultProps = {

    className: ''

};

export { ListQA };
