import { useState, useEffect } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { ButtonIcon } from 'components/molecules';
import './paginator.scss';

const Paginator = function ({ className, size, children }: PropTypes) {
    const totalPages = children.length <= size ? 1 : Math.ceil(children.length / size);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [totalPages]);

    const handelNextButtonClick = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        else setCurrentPage(1);
    };

    const handelPrevButtonClick = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        else setCurrentPage(totalPages);
    };

    const handelPageLinkClick = (pageNumber: number) => setCurrentPage(() => pageNumber);

    return (
        <div className={`paginator ${className}`}>
            <div className="paginator__wrapper">
                {children.slice((currentPage - 1) * size, (currentPage - 1) * size + size)}
            </div>

            {totalPages > 1 && (
                <div className="paginator__controls">
                    <ButtonIcon
                        className="paginator__prev-page-button"
                        iconName="chevron-left"
                        variant="tooltip"
                        text="Previous page"
                        onClick={handelPrevButtonClick}
                    />

                    <ul className="paginator__page-links">
                        {[...Array(totalPages)].map((item, index) => (
                            <button
                                className={`paginator__page-link ${index + 1 === currentPage ? 'mark' : ''}`}
                                type="button"
                                key={nanoid()}
                                onClick={() => handelPageLinkClick(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </ul>

                    <ButtonIcon
                        className="paginator__next-page-button"
                        iconName="chevron-right"
                        variant="tooltip"
                        text="Next page"
                        onClick={handelNextButtonClick}
                    />
                </div>
            )}
        </div>
    );
};

type PropTypes = {
    className?: string;
    size: number;
    children: React.ReactNode[];
};

Paginator.defaultProps = {
    className: ''
};

export { Paginator };
