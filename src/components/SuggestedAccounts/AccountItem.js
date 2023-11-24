import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './SuggestedAccounts.module.scss'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import TippyHeadless from '@tippyjs/react/headless';
import { Wrapper } from '../Popper';
import AccountPreview from './AccountPreview/AccountPreview';

const cx = classNames.bind(styles)



function AccountItem({ data }) {

    const renderReview = () => (

        <div tabIndex="-1" >
            <Wrapper>
                <AccountPreview data={data} />
            </Wrapper>
        </div>

    )

    return (
        <div>
            <TippyHeadless
                delay={[800, 0]}
                interactive
                placement='bottom'
                render={renderReview}
            >
                <div className={cx('account-item')}>
                    <img className={cx('avatar')}
                        src={data.avatar}
                        alt={data.nickname}
                    />

                    <div className={cx('item-info')}>
                        <h4 className={cx('nick-name')}>{data.nickname}
                            {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
                        </h4>

                        <p className={cx('name')}>{data.first_name} {data.last_name}</p>
                    </div>
                </div>

            </TippyHeadless>
        </div>
    );
}

export default AccountItem
