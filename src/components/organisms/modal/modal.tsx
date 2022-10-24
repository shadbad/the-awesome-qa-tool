import { useAppStore, useQuestionAnswerStore } from 'store/hooks';
import { FormQA, ConfirmBox } from 'components/molecules';
import { QuestionAnswerType } from 'store/types';
import { clip } from 'utilities';
import './modal.scss';

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

    const handleDeleteConfirm = () => {
        const { qa } = appServices;

        if (qa) {
            qaServices.delete(qa.id);
        }

        close();
    };

    const handlePurgeConfirm = () => {
        qaServices.purge();

        close();
    };

    if (appServices.modal === 'none') return null;

    return (
        <div className={`modal ${className}`}>
            <div className="modal__wrapper__inner-wrapper">
                {appServices.modal === 'add' && (
                    <FormQA variant="create" questionAnswer={null} onSubmit={handleCreateSubmit} onCancel={close} />
                )}

                {appServices.modal === 'update' && (
                    <FormQA
                        variant="update"
                        questionAnswer={appServices.qa}
                        onSubmit={handleUpdateSubmit}
                        onCancel={close}
                    />
                )}

                {appServices.modal === 'delete' && appServices.qa && (
                    <ConfirmBox
                        message={`Are you sure you want to delete '${clip(appServices.qa.question, 10)}'?`}
                        onCancel={close}
                        onConfirm={handleDeleteConfirm}
                    />
                )}

                {appServices.modal === 'purge' && (
                    <ConfirmBox
                        message="Are you sure you want to delete all questions?"
                        onCancel={close}
                        onConfirm={handlePurgeConfirm}
                    />
                )}
            </div>
        </div>
    );
}

type PropTypes = {
    className?: string;
};

Modal.defaultProps = {
    className: ''
};

export { Modal };
