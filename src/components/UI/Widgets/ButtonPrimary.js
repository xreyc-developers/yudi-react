import classes from './ButtonPrimary.module.css';

const ButtonPrimary = (props) => {
    return (
        <button 
            className={classes['form-button']} 
            onClick={props.onClick} 
            style={props.style}
            type={props.type}
        >
                {props.children}
        </button>
    )
}

export default ButtonPrimary;