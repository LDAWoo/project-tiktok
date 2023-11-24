import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import classNames from 'classnames/bind';
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({ to, ref, primary, outline, text, rounded, small, large, disable, children, leftIcon, rightIcon, className, onClick, ...passProps }) {
    let Comp = 'button'
    const props = {
        onClick,
        ...passProps
    }

    if (disable) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof [key] === 'function') {
                delete props[key]
            }
        })
    }

    if (to) {
        props.to = to
        Comp = Link
    } else if (ref) {
        props.ref = ref
        Comp = 'a'
    }


    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        rounded,
        text,
        small,
        large,
        disable,
        leftIcon,
        rightIcon
    })

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    ref: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    rounded: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    disable: PropTypes.bool,
    children: PropTypes.node.isRequired,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
}


export default Button;