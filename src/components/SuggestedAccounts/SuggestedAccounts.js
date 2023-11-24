import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './SuggestedAccounts.module.scss'
import AccountItem from './AccountItem';

const cx = classNames.bind(styles)

function SuggestedAccounts({ data = [], label }) {

    console.log(data);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {data.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}

            <p className={cx('more-btn')} >
                See all
            </p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    data: PropTypes.array,
    label: PropTypes.string.isRequired
}

export default SuggestedAccounts;