import clsx from 'clsx'
import { useState } from 'react';
import styles from './PageNumber.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

function PageNumber({postPerPage, totalPosts, paginate}) {
    const [clicked, setClicked] = useState(1)
    const pageNumbers = []

    for (let i=1; i<=Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={clsx(styles.wrapper)}>
            <FontAwesomeIcon 
                icon={faArrowLeftLong}
                onClick={() => {
                    if (clicked === 1) {
                        return
                    }
                    else {
                        setClicked(clicked - 1)
                        paginate(clicked - 1)
                    }
                        
                }}
            />
            {pageNumbers.map((page) => {
                return (
                    <button 
                        key={page}
                        className={clsx(styles.page)}
                        style={{background: (clicked===page)? 'rgba(0, 204, 144, 0.8)' : 'rgba(196, 197, 208, 1)'}}
                        onClick={() => {
                            setClicked(page)
                            paginate(page)
                        }}
                    >
                        {page}
                    </button>
                )
            })}
            <FontAwesomeIcon 
                icon={faArrowRightLong}
                onClick={() => {
                    if (clicked === pageNumbers.length) {
                        return
                    }
                    else {
                        setClicked(clicked + 1)
                        paginate(clicked + 1)
                    }
                        
                }}
            />
        </div>
    )
}

export default PageNumber