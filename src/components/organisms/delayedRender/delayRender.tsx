import { useEffect, useState } from 'react';

function DelayRender({ duration, children }: PropTypes) {
    const [canBeRendered, setCanBeRendered] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setCanBeRendered(true);
        }, duration);
    }, []);

    if (!canBeRendered) return null;

    return <div>{children}</div>;
}

type PropTypes = {
    duration: number;
    children: React.ReactNode;
};

export { DelayRender };
