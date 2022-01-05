import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import classes from './Form.module.css';
// FORM AND VALIDATIONS
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// COMPONENTS
import CloudBackground from "../components/UI/Background/CloudBackgroud";
import ButtonPrimary from "../components/UI/Widgets/ButtonPrimary";
// REDUX ACTIONS
import { loginAction } from "../store/auth/authActions";

// FORM SCHEMA
const formSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'), 
    password: yup.string().min(8).max(32).required('Password is required')
}).required();

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: yupResolver(formSchema)
    });

    const loginSubmitHandler = (data) => {
        const loginUser = async (email,password) => {
            const res = await dispatch(loginAction(email, password));
            if(res.code === 400) return;
            reset();
            navigate("/messages", { replace: true });
        }
        loginUser(data.email, data.password);
    }

    return (
        <>
            <CloudBackground />
            <div className={classes['form-wrapper']}>
                <form className={classes['form-container']} onSubmit={handleSubmit(loginSubmitHandler)}>
                    <div className={classes['form-brand']}>
                        <div><span>Yudi Chat</span></div>
                    </div>

                    <div className={classes['form-title']}>
                        LOGIN
                    </div>

                    <div className={classes['form-group']}>
                        <input type="email" className={classes['form-input']} placeholder="Email" {...register('email')}/>
                        <p className={classes['form-validation-message']}>{errors.email?.message}</p>
                    </div>

                    <div className={classes['form-group']}>
                        <input type="password" className={classes['form-input']} placeholder="Password" {...register('password')}/>
                        <p className={classes['form-validation-message']}>{errors.password?.message}</p>
                    </div>

                    <div className={classes['form-links']}>
                        <div>
                            <input type="checkbox" />Remember me
                        </div>
                        <div>
                        </div>
                    </div>

                    <div className={classes['form-group']}>
                        <ButtonPrimary type="submit">Log in</ButtonPrimary>
                    </div>

                    <div className={classes['form-footer']}>
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;