import Tippy from "@tippyjs/react/headless";
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Wrapper as PopperWrapper } from '@/components/Popper';
import styles from './menu.module.scss'
import MenuItem from "./MenuItem";
import Header from "./Header";
import { useState } from "react";

const cx = classNames.bind(styles);
function Menu({ children, items = [], onChange, hideOnClick = false }) {

    const [history, setHistory] = useState([{ data: items }])

    const current = history[history.length - 1]


    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children

            return <MenuItem key={index} data={item} onClick={() => {
                if (isParent) {
                    setHistory(prev => [...prev, item.children]);
                } else {
                    onChange(item)
                }
            }} />
        })

    }

    const handleBack = () => {
        setHistory(prev => prev.slice(0, prev.length - 1))
    }

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex={-1} {...attrs}>
            <PopperWrapper >
                {history.length > 1 && <Header title={current.title}
                    onBack={handleBack}
                />}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>

        </div>
    )

    const handleResetMenu = () => {
        setHistory((prev) => prev.splice(0, 1))
    }

    return (
        <Tippy
            offset={[12, 10]}
            interactive
            delay={[0, 800]}
            placement="bottom-end"
            hideOnClick={hideOnClick}
            render={renderResult}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    onChange: PropTypes.bool,
    hideOnClick: PropTypes.func,
}

export default Menu;