import Mode from "../components/Mode";
import dynamic from 'next/dynamic';
import styles from '/styles/Home.module.css'

const Shib = dynamic(() => import('../components/Mode'), {
    ssr: false,
});

export default function Index(){
    return(
        <>
            <Shib />
            <div id='foxy' className={styles.fraq}>
                <div>
                    22dfsdfsdf
                </div>
            </div>
        </>
    )
}
