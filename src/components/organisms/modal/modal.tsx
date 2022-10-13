import { useAppStore, useQuestionAnswerStore } from 'store/hooks';
import { ButtonIcon, FormQA } from 'components/molecules';
import './modal.scss';
import { QuestionAnswerType } from 'store/types';

function Modal({ className }: PropTypes) {

    const appServices = useAppStore();
    const qaServices = useQuestionAnswerStore();

    const close = () => {

        appServices.setModal('none', null);

    };

    const handleCreateSubmit = (item: QuestionAnswerType) => {

        qaServices.add(item);
        close();

    };

    const handleUpdateSubmit = (item: QuestionAnswerType) => {

        qaServices.update(item);
        close();

    };

    if (appServices.modal === 'none') return null;

    return (

        <div className={`modal ${className}`}>

            <div className="modal__wrapper">

                <ButtonIcon
                    className="modal__wrapper__close"
                    iconName="cross"
                    text="Close"
                    variant="tooltip"
                    onClick={close}
                />

                <div className="modal__wrapper__inner-wrapper">

                    {
                        appServices.modal === 'add' && (

                            <FormQA
                                variant="create"
                                questionAnswer={null}
                                onSubmit={handleCreateSubmit}
                            />

                        )
                    }

                    {
                        appServices.modal === 'update' && (

                            <FormQA
                                variant="update"
                                questionAnswer={appServices.qa}
                                onSubmit={handleUpdateSubmit}
                            />

                        )
                    }

                </div>

            </div>
        </div>

    );

}

type PropTypes = {

    className?: string

}

Modal.defaultProps = {

    className: ''

};

export { Modal };
