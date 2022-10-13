// import { useQuestionAnswerStore, useAppStore } from 'store/hooks';
import { Layout, Intro, Modal } from 'components/organisms';
import { ShortLived } from 'components/molecules';

function Landing() {

    const INTRO_ANIMATION_DURATION = 6000;

    return (

        <Layout animate animationDelay={2500}>

            <ShortLived duration={INTRO_ANIMATION_DURATION}>

                <Intro />

            </ShortLived>

            <Modal />

        </Layout>

    );

}

export { Landing };
