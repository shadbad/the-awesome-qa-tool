import React, { useState, useRef } from 'react';
import './tooltip.scss';

function Tooltip({ className, tip, children }: PropTypes) {
    const [tipVisibility, setTipVisibility] = useState(false);

    const toolTipRef = useRef<HTMLSpanElement>(null);
    const toolTipTriangleRef = useRef<HTMLLIElement>(null);

    const handleMouseMove = (event: React.MouseEvent) => {
        const toolTipElement = toolTipRef.current;
        const toolTipTriangleElement = toolTipTriangleRef.current;

        if (!toolTipElement || !toolTipTriangleElement) return;

        const toolTipStyles = window.getComputedStyle(toolTipElement);

        const PADDING = 24;

        const { clientX, clientY } = event;

        const { innerWidth, innerHeight } = window;

        const width = parseInt(toolTipStyles.width, 10);
        const height = parseInt(toolTipStyles.height, 10);
        let left = parseInt(toolTipStyles.left, 10);
        let top = parseInt(toolTipStyles.top, 10);

        // fits below?
        if (height + PADDING < innerHeight - clientY) {
            top = clientY + PADDING;
            toolTipTriangleElement.style.left = `${clientX - PADDING / 2}px`;
            toolTipTriangleElement.style.top = `${clientY + PADDING + 1}px`;
            toolTipTriangleElement.style.transform = 'rotate(-45deg)';
        } else {
            top = clientY - height - PADDING;
            toolTipTriangleElement.style.left = `${clientX + PADDING / 2}px`;
            toolTipTriangleElement.style.top = `${clientY - PADDING - 1}px`;
            toolTipTriangleElement.style.transform = 'rotate(135deg)';
        }

        // fits right or left
        if (innerWidth - (clientX + width) > 0) left = clientX - PADDING;
        else left = clientX - width + PADDING;

        toolTipElement.style.left = `${left}px`;
        toolTipElement.style.top = `${top}px`;
        toolTipElement.style.width = `${width}px`;

        setTipVisibility(true);
    };

    const handleMouseLeave = () => setTipVisibility(false);

    return (
        <div className={`tooltip ${className}`}>
            <div className="tooltip__content" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                {children}
            </div>

            <span ref={toolTipRef} className={`tooltip__tip ${tipVisibility ? 'visible' : ''}`}>
                {tip}

                <i ref={toolTipTriangleRef} className="tooltip__tip__triangle" />
            </span>
        </div>
    );
}

type PropTypes = {
    className?: string;
    tip: string;
    children: React.ReactNode;
};

Tooltip.defaultProps = {
    className: ''
};

export { Tooltip };
