import { Layout, Intro } from 'components/organisms';
import { ShortLived } from 'components/molecules';
import './landing-template.scss';

function LandingTemplate() {

    const INTRO_ANIMATION_DURATION = 6000;

    return (

        <Layout animate animationDelay={2500}>

            <ShortLived duration={INTRO_ANIMATION_DURATION}>

                <Intro />

            </ShortLived>

        </Layout>

    );

}

export { LandingTemplate };
