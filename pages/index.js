
import dynamic from 'next/dynamic';
import styles from '/styles/Home.module.css'

const Shib = dynamic(() => import('../components/Mode'), {
    ssr: false,
});
const Brun = dynamic(() => import('../components/Bruno'), {
    ssr: false,
});
const House = dynamic(() => import('../components/House'), {
    ssr: false,
});
const Particals = dynamic(() => import('../components/Particals'), {
    ssr: false,
});
const Galaxy = dynamic(() => import('../components/Galaxy'), {
    ssr: false,
});
const Raycaster = dynamic(() => import('../components/Raycaster'), {
    ssr: false,
});

// <Shib />
// <div id='foxy' className={styles.fraq}>
//     <div>
//         22dfsdfsdf
//     </div>
// </div>
export default function Index(){
    return(
        <>
            <Shib />
            <canvas className='webgl'></canvas>
        </>
    )
}
