import { useState } from 'react';
import './tooltip.scss';

function Tooltip({ tip, children }: PropTypes) {

    const [tipVisibility, setTipVisibility] = useState(false);

    const handleMouseIn = () => setTipVisibility(true);

    const handleMouseLeave = () => setTipVisibility(false);

    return (

        <div className="tooltip" onMouseEnter={handleMouseIn} onMouseLeave={handleMouseLeave}>

            {children}

            {tipVisibility && <span className="tooltip__tip">{tip}</span>}

        </div>

    );

}

type PropTypes = {

    tip: string,
    children: React.ReactNode

};

export { Tooltip };
