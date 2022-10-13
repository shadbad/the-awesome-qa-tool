import { QuestionAnswerType } from 'store/types';
import { Tooltip } from 'components/atoms';
import { ViewQA, Paginator, ButtonIcon } from 'components/molecules';
import './list-qa.scss';

function ListQA({ className, items, onItemCreate, onItemEdit, onItemDelete, onDeleteAll }: PropTypes) {

    const ITEMS_PER_PAGE = 10;

    return (

        <div className={`list-qa ${className}`}>

            <aside className="list-qa__sidebar">

                <p className="list-qa__sidebar__info">
                    Here you can find
                    {` ${items.length === 0 ? 'no ' : items.length} `}
                    question
                    {`${items.length === 1 ? '' : 's'}`}
                    . Feel free to create your own questions.
                </p>

                <div className="list-qa__sidebar__tools">

                    <ButtonIcon
                        iconName="plus"
                        text="Create new question"
                        variant="regular"
                        onClick={() => onItemCreate()}
                    />

                    <ButtonIcon
                        iconName="trash"
                        text="Delete all"
                        variant="regular"
                        onClick={() => onDeleteAll()}
                    />

                </div>

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
                        <Paginator className="list-qa__list__paginator" size={ITEMS_PER_PAGE}>

                            {
                                items.map((item) => (

                                    <ViewQA
                                        className="list-qa__list__paginator__item"
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
    onItemCreate: () => void,
    onItemEdit: (item: QuestionAnswerType) => void,
    onItemDelete: (itemId: string) => void,
    onDeleteAll: () => void
}

ListQA.defaultProps = {

    className: ''

};

export { ListQA };
