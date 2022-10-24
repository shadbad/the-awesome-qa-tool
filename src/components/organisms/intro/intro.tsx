import { useEffect, useState } from 'react';
import { Icon } from 'components/atoms';
import './intro.scss';

function Intro() {
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        setStartAnimation(true);
    }, []);

    return (
        <div className={`intro ${startAnimation ? 'animate' : ''}`}>
            <Icon className="intro__logo" name="logo" />

            <h1 className="intro__heading">The Awesome Q/A Tool</h1>

            <p className="intro__description">Hassle-free question bank management</p>
        </div>
    );
}

export { Intro };
