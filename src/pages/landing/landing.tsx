import { useQuestionAnswerStore, useAppStore } from 'store/hooks';
import { Layout, Intro } from 'components/organisms';
import { ShortLived, ListQA } from 'components/molecules';
import { QuestionAnswerType, SortOrderType } from 'store/types';

function Landing() {

    const INTRO_ANIMATION_DURATION = 6000;

    const qaServices = useQuestionAnswerStore();

    const appServices = useAppStore();

    const handleItemDeleteClick = (id: string) => {

        const qa = qaServices.find(id);

        if (qa) {

            appServices.setModal('delete', qa);

        }

    };

    const handleItemEditClick = (item: QuestionAnswerType) => {

        appServices.setModal('update', item);

    };

    const handleItemCreateClick = () => {

        appServices.setModal('add', null);

    };

    const handleDeleteAllClick = () => {

        appServices.setModal('purge', null);

    };

    const handleSortChange = (sortOrder: string) => {

        qaServices.sort(sortOrder as SortOrderType);

    };

    return (

        <Layout animate animationDelay={2500}>

            <ShortLived duration={INTRO_ANIMATION_DURATION}>

                <Intro />

            </ShortLived>

            <ListQA
                items={qaServices.items}
                selectedOption={qaServices.sortOrder}
                onItemCreate={handleItemCreateClick}
                onItemDelete={handleItemDeleteClick}
                onItemEdit={handleItemEditClick}
                onDeleteAll={handleDeleteAllClick}
                onSortChange={handleSortChange}
            />

        </Layout>

    );

}

export { Landing };
