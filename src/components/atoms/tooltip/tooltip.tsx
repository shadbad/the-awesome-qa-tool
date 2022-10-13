import { useState } from 'react';
import './tooltip.scss';

function Tooltip({ className, tip, children }: PropTypes) {

    const [tipVisibility, setTipVisibility] = useState(false);

    const handleMouseIn = () => setTipVisibility(true);

    const handleMouseLeave = () => setTipVisibility(false);

    return (

        <div className={`tooltip ${className}`}>

            <div className="tooltip__content" onMouseEnter={handleMouseIn} onMouseLeave={handleMouseLeave}>

                {children}

            </div>

            {tipVisibility && <span className="tooltip__tip">{tip}</span>}

        </div>

    );

}

type PropTypes = {

    className?: string,
    tip: string,
    children: React.ReactNode

};

Tooltip.defaultProps = {

    className: ''

};

export { Tooltip };
