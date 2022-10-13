import { QuestionAnswerType } from 'store/types';
import { Tooltip } from 'components/atoms';
import { ViewQA, Paginator } from 'components/molecules';
import './list-qa.scss';

function ListQA({ className, items, onItemEdit, onItemDelete }: PropTypes) {

    return (

        <div className={`list-qa ${className}`}>

            <aside className="list-qa__sidebar">
                <p>
                    Here you can find
                    {` ${items.length === 0 ? 'no questions' : items.length} `}
                    question
                    {`${items.length === 1 ? '' : 's'}`}
                    . Feel free to create your own questions.
                </p>
            </aside>

            <div className="list-qa__list">

                <Tooltip
                    className="list-qa__list__tooltip"
                    tip="Here you can find created questions and their answers."
                >

                    <h2 className="list-qa__list__heading">Created questions</h2>

                </Tooltip>

                {
                    items.length === 0 && <p className="list-qa__list__empty">No questions yet :-(</p>
                }

                {
                    items.length > 0 && (
                        <Paginator className="list-qa__list__paginator" size={items.length}>

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
                    )
                }

            </div>
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
