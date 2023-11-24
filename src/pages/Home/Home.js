import { useState } from "react";
import classNames from "classnames/bind";
import styles from './Home.module.scss'
import HomeVideo from "./components/HomeVideo";
import { useEffect } from "react";
import * as videoServices from '@/services/videoServices'

const cx = classNames.bind(styles);


function Home() {
    const [video, setVideo] = useState([])
    useEffect(() => {
        videoServices.getVideosList({ type: 'for-you', page: 1 })
            .then((data) => {
                setVideo(data);
            })
            .catch((err) => { console.log(err); })

    }, [])

    return (
        <div className={cx('wrapper')}>
            {video.map((video) => (
                <HomeVideo key={video.id} data={video} />
            ))}


        </div>
    );
}

export default Home;