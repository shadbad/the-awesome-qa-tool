/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import './icon.scss';

const IconComponent = function ({ name, className }: PropTypes) {

    const [state, setState] = useState<IconDataType>({ height: 0, size: 0, paths: [''] });

    useEffect(() => {

        IconComponent.getIconData(name).then((data) => {

            setState(data);

        });

    }, [name]);

    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={state.size}
            height={state.size}
            viewBox={`0 0 ${state.height} ${state.height}`}
            className={`icon ${name} ${className}`}
            data-testid={`icon-${name}`}
        >

            {state.paths.map((p, index) => <path key={`${name}-${index}`} className="icon__path" d={p} />)}

        </svg>
    );

};

type PropTypes = {
    name: string,
    className?: string
}

type IconDataType = {
    height: number,
    size: number,
    paths: string[]
}

IconComponent.defaultProps = {
    className: ''
};

IconComponent.getIconData = function (name: string): Promise<IconDataType> {

    return import('./selection.json')

        .then((data) => {

            const item = data.icons.find((x) => x.properties.name === name);

            return {
                height: data.height,
                size: item?.icon.grid || 0,
                paths: item?.icon.paths || ['']
            };

        })

        .catch(() => (

            {
                height: 0,
                size: 0,
                paths: ['']
            }

        ));

};

const Icon = React.memo(IconComponent, (p, n) => p.name === n.name);

export { Icon };
