import classes from './CloudBackground.module.css';
import cloud1 from '../../../assets/images/cloud1.png';
import cloud2 from '../../../assets/images/cloud2.png';
import cloud3 from '../../../assets/images/cloud3.png';

const CloudBackground = () => {
    return (
        <div className={classes.sky}>
            <div className={classes.cloud1}><img src={cloud1} alt="Logo"/></div>
            <div className={classes.cloud2}><img src={cloud2} alt="Logo"/></div>
            <div className={classes.cloud3}><img src={cloud3} alt="Logo"/></div>
            <div className={classes.cloud4}><img src={cloud2} alt="Logo"/></div>
            <div className={classes.cloud5}><img src={cloud1} alt="Logo"/></div>
        </div>
    );
}

export default CloudBackground;