import { useState, useLayoutEffect } from 'react';
import { Layout, Intro } from 'components/organisms';
import './landing-template.scss';

function LandingTemplate() {

    const INTRO_ANIMATION_DURATION = 6000;

    const [showIntro, setShowIntro] = useState(true);

    useLayoutEffect(() => {

        if (showIntro) setTimeout(() => setShowIntro(false), INTRO_ANIMATION_DURATION);

    }, [showIntro]);

    return (

        <Layout animate animationDelay={2500}>

            {showIntro && <Intro />}

        </Layout>

    );

}

export { LandingTemplate };
