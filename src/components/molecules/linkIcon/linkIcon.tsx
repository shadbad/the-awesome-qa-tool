import React from 'react';
import { Icon } from 'components/atoms';
import './link-icon.scss';

const LinkIconComponent = function ({ className = '', href, iconName }: PropTypes) {
    return (
        <a className={`link-icon ${className}`} href={href} target="_blank" rel="noreferrer">
            <Icon className="link-icon__icon" name={iconName} />
        </a>
    );
};

type PropTypes = {
    className?: string;
    href: string;
    iconName: string;
};

LinkIconComponent.defaultProps = {
    className: ''
};

const LinkIcon = React.memo(LinkIconComponent, (p, n) => p.href === n.href && p.iconName === n.iconName);

export { LinkIcon };
