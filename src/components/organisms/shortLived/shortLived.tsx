import { useState, useEffect } from 'react';

function ShortLived({ duration, children }: PropTypes) {
    const [isAlive, setIsAlive] = useState(true);

    useEffect(() => {
        if (isAlive) setTimeout(() => setIsAlive(false), duration);
    }, [isAlive]);

    if (isAlive) return <div className="short-lived">{children}</div>;

    return null;
}

type PropTypes = {
    duration: number;

    children: React.ReactNode;
};

export { ShortLived };
