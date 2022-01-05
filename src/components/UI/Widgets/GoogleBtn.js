import classes from './GoogleBtn.module.css';

const GoogleBtn = (props) => {
    return (
        <a {...props}>
            <div className={classes['google-btn']}>
                <div className={classes['google-icon-wrapper']}>
                    <img className={classes['google-icon']} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                </div>
                <div className={classes['btn-text']}>
                    Sign in with google
                </div>
            </div>
        </a>
    );
}

export default GoogleBtn;