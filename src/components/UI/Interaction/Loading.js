import classes from './Loading.module.css';
import loadingImg from '../../../assets/images/loading.gif';

const Loading = () => {
    return <div className={classes['loading-container']}><img src={loadingImg}/></div>
}

export default Loading;