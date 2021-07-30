/* eslint-disable no-useless-escape */
import { useState } from "react"
import { useForm } from "react-hook-form"
import Buttons from './../../components/Buttons'
import './style.scss'
type FormData = {
    fullName:string;
    email:string;
    password:string;
}

const Register = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit =()=>{
        setLoading(true)
        console.log('on submit')
    }


    return(
        <div className="register auth" onSubmit={handleSubmit(onSubmit)} >
            <form>
                
                {error ? <p className="error alert">{errorMessage}</p> : '' }

                <div className="inputGroup">
                    <label>Full Name</label><br/>
                    <input type="text" placeholder="John Doe" {...register('fullName', {required: true, minLength: 5})} />
                    {errors.fullName ? <p className='error'>Your full name should be more than 5 characters.</p> : ""}
                </div>
                <div className="inputGroup">
                    <label>E-mail Address</label><br/>
                    <input type="text" placeholder="johndoe@gmail.com" {...register('email', {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})} />
                    {errors.email ? <p className='error'>Your email doesn't look right.</p> : ""}
                </div>
                <div className="inputGroup">
                    <label>Password</label><br/>
                    <input type="password" {...register('password', {required: true, minLength: 4})} />
                    {errors.password ? <p className='error'>Your password should be more than 4 characters.</p> : ""}
                </div>
                <Buttons title="Register" loading={loading} type="submit" buttonClass="primary-button" clickEvent={onSubmit} />
            </form>
        </div>
    )
}

export default Register
