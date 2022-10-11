import { useState } from 'react';
import './tooltip.scss';

function Tooltip({ tip, children }: PropTypes) {

    const [tipVisibility, setTipVisibility] = useState(false);

    const handleMouseIn = () => setTipVisibility(true);

    const handleMouseLeave = () => setTipVisibility(false);

    return (

        <div className="tooltip">

            <div className="tooltip__content" onMouseEnter={handleMouseIn} onMouseLeave={handleMouseLeave}>

                {children}

            </div>

            {tipVisibility && <span className="tooltip__tip">{tip}</span>}

        </div>

    );

}

type PropTypes = {

    tip: string,
    children: React.ReactNode

};

export { Tooltip };
