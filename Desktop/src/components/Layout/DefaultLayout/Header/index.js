import styles from './Header.module.scss';
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircleXmark, faGear, faMagnifyingGlass, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless'
import { useEffect, useState } from 'react';
import {Wrapper as PopperWrapper} from '../../../Popper'
import Account from '../../../Account/index'

function Header() {
    const [account, setAccount] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setAccount([])
        }, 0);
    })

    //const currentUser = true

    return (
        <header className={clsx(styles.wrapper)}>
            <div className={clsx(styles.name)}>UWC2.0</div>
            <Tippy
                interactive
                visible={account.length>0}
                render={(attrs) => (
                    <div className={clsx(styles.searchResult)} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={clsx(styles.searchTitle)}>Workers</h4>
                            <Account/>
                            <Account/>
                            <Account/>
                            <Account/>
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={clsx(styles.search)}>
                    <input placeholder='Search by ID or Name' spellCheck={false}
                    />
                    <button className={clsx(styles.clear)}>
                        <FontAwesomeIcon icon={faCircleXmark}/>
                    </button>
                    <FontAwesomeIcon className={clsx(styles.loading)} icon={faSpinner}/>
                    <button className={clsx(styles.searchButton)}>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </button>
                </div>
            </Tippy>
            <div className={clsx(styles.actions)}>
                <button className={clsx(styles.actionButton)}>
                    <FontAwesomeIcon icon={faBell}/>
                </button>   
                <button className={clsx(styles.actionButton)}>
                    <FontAwesomeIcon icon={faGear}/>
                </button>
                <button className={clsx(styles.actionButton)}>
                    <FontAwesomeIcon icon={faUser}/>
                </button>
            </div>
        </header>
    )
}

export default Header;