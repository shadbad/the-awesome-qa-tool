import { useQuestionAnswerStore, useAppStore } from 'store/hooks';
import { Layout, Intro, ShortLived, DelayRender } from 'components/organisms';
import { ListQA } from 'components/molecules';
import { QuestionAnswerType, SortOrderType } from 'store/types';

function Landing() {

    const INTRO_ANIMATION_DURATION = 6000;

    const qaServices = useQuestionAnswerStore();

    const appServices = useAppStore();

    const handleItemDeleteClick = (id: string) => {

        const qa = qaServices.find(id);

        if (qa) appServices.setModal('delete', qa);

    };

    return (

        <Layout animate animationDelay={2500}>

            <ShortLived duration={INTRO_ANIMATION_DURATION}>

                <Intro />

            </ShortLived>

            <DelayRender duration={INTRO_ANIMATION_DURATION}>

                <ListQA
                    items={qaServices.items}
                    selectedOption={qaServices.sortOrder}
                    onItemCreate={() => appServices.setModal('add', null)}
                    onItemDelete={handleItemDeleteClick}
                    onItemEdit={(item: QuestionAnswerType) => appServices.setModal('update', item)}
                    onDeleteAll={() => appServices.setModal('purge', null)}
                    onSortChange={(sortOrder: string) => qaServices.sort(sortOrder as SortOrderType)}
                />

            </DelayRender>

        </Layout>

    );

}

export { Landing };
