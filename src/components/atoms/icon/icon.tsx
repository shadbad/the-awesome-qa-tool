import { useEffect, useState } from 'react';
import { generateId } from 'utilities';
import './icon.scss';

const Icon = function ({ name, className = '' }: IconPropTypes) {

    const [state, setState] = useState({ height: 0, size: 0, paths: [''] });

    useEffect(() => {

        import('./selection.json')

            .then((data) => {

                const item = data.icons.find((x) => x.properties.name === name);

                setState({
                    height: data.height,
                    size: item?.icon.grid || 0,
                    paths: item?.icon.paths || ['']
                });

            })

            .catch(() => {

                setState({
                    height: 0,
                    size: 0,
                    paths: ['']
                });

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
        >

            {state.paths.map((p) => <path key={generateId()} className="icon__path" d={p} />)}

        </svg>
    );

};

type IconPropTypes = {
    name: string,
    className?: string
}

Icon.defaultProps = {
    className: ''
};

export { Icon };
