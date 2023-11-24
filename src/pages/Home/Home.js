import { useState } from "react";
import classNames from "classnames/bind";
import styles from './Home.module.scss'
import HomeVideo from "./components/HomeVideo";
import { useEffect } from "react";
import * as videoServices from '@/services/videoServices'

const cx = classNames.bind(styles);


function Home() {
    const [video, setVideo] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        videoServices.getVideosList({ type: 'for-you', page: 1 })
            .then((data) => {
                setVideo(data);
            })
            .catch((err) => { console.log(err); })
            .finally(() => { setLoading(false) })

    }, [])

    return (
        <div className={cx('wrapper')}>
            <>
                {loading ? <div>Loading</div> :
                    <>
                        {video && video.map((video) => (
                            <HomeVideo key={video.id} data={video} />
                        ))}
                    </>

                }
            </>

        </div>
    );
}

export default Home;