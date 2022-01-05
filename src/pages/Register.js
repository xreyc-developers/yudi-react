import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// FORM AND VALIDATION
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// STYLES
import classes from './Form.module.css';
// COMPONENTS
import CloudBackground from "../components/UI/Background/CloudBackgroud";
import ButtonPrimary from "../components/UI/Widgets/ButtonPrimary";
//ACTIONS
import { signupAction } from "../store/auth/authActions";

// FORM VALIDATION
const formSchema = yup.object().shape({
    fullname: yup.string().required('Fullname is required'), 
    email: yup.string().email().required('Email is required'), 
    password: yup.string().min(8).max(32).required('Password is required'),
    confirm_password: yup.string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password')], 'Password must match')
}).required();

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: yupResolver(formSchema)
    });

    const signupSubmitHandler = (data) => {
        const signupUser = async (email,password,fullname) => {
            const res = await dispatch(signupAction(email, password, fullname));
            if(res.code === 400) return;
            reset();
            navigate("/select_character", { replace: true });
        }
        signupUser(data.email, data.password, data.fullname);
    }

    return (
        <>
            <CloudBackground />

            <div className={classes['form-wrapper']}>
                <form className={classes['form-container']} onSubmit={handleSubmit(signupSubmitHandler)}>
                    <div className={classes['form-brand']}>
                        <div><span>Yudi Chat</span></div>
                    </div>

                    <div className={classes['form-title']}>
                        SIGNUP
                    </div>

                    <div className={classes['form-group']}>
                        <input type="text" className={classes['form-input']} placeholder="Fullname" {...register("fullname")}/>
                        <p className={classes['form-validation-message']}>{errors.fullname?.message}</p>
                    </div>

                    <div className={classes['form-group']}>
                        <input type="email" className={classes['form-input']} placeholder="Email" {...register("email")}/>
                        <p className={classes['form-validation-message']}>{errors.email?.message}</p>
                    </div>

                    <div className={classes['form-group']}>
                        <input type="password" className={classes['form-input']} placeholder="Password" {...register("password")}/>
                        <p className={classes['form-validation-message']}>{errors.password?.message}</p>
                    </div>

                    <div className={classes['form-group']}>
                        <input type="password" className={classes['form-input']} placeholder="Confirm Password" {...register("confirm_password")}/>
                        <p className={classes['form-validation-message']}>{errors.confirm_password?.message}</p>
                    </div>

                    <div className={classes['form-group']}>
                        <ButtonPrimary type="submit">Sign Up</ButtonPrimary>
                    </div>

                    <div className={classes['form-footer']}>
                        Already have an account? <Link to="/">Login</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register;