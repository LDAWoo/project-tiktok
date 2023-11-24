import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '@/config';
import { ActiveHomeIcon, ActiveLiveIcon, ActiveUserGroupIcon, HomeIcon, LiveIcon, UserGroupIcon } from '@/components/Icons';
import SuggestedAccounts from '@/components/SuggestedAccounts';
import { useCallback, useEffect, useState } from 'react';
import * as userServics from '@/services/userServices'
import Button from '@/components/Button/Button';

const cx = classNames.bind(styles);

const INIT_PAGE = 1
const PER_PAGE = 5

function Sidebar() {

    const [page, setPage] = useState(INIT_PAGE)

    const [suggestedUser, setSuggestedUser] = useState([])

    useEffect(() => {

        userServics.getSuggested({ page, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUser(data)
            })
            .catch((err) => {
                console.log(err);
            })

    }, [page])


    return (
        <aside className={cx('wrapper')}>
            <div className={cx('sidebar-body')}>
                <Menu>
                    <MenuItem title='For You' to={config.routes.home} icon={<HomeIcon />} activeIcon={<ActiveHomeIcon />} />
                    <MenuItem title='Following' to={config.routes.following} icon={<UserGroupIcon />} activeIcon={<ActiveUserGroupIcon />} />
                    <MenuItem title='LIVE' to={config.routes.live} icon={<LiveIcon />} activeIcon={<ActiveLiveIcon />} />
                </Menu>


                <div className={cx('line')}></div>
                <SuggestedAccounts data={suggestedUser} label='Suggested accounts' />

            </div>
        </aside>
    );
}

export default Sidebar;
