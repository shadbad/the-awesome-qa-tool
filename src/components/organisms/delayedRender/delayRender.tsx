import { useLayoutEffect, useState } from 'react';

function DelayRender({ duration, children }: PropTypes) {

    const [canBeRendered, setCanBeRendered] = useState(false);

    useLayoutEffect(() => {

        setTimeout(() => {

            setCanBeRendered(true);

        }, duration);

    }, []);

    if (!canBeRendered) return null;

    return (

        <div>
            {children}
        </div>

    );

}

type PropTypes = {

    duration: number,
    children: React.ReactNode

}

export { DelayRender };
