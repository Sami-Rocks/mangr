/* eslint-disable no-useless-escape */
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
    email:string;
    password:string;
}

const LogIn = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const onSubmit =()=>{

    }


    return(
        <div className="register auth" onSubmit={handleSubmit(onSubmit)} >
            <h1>Welcome Back!</h1>
            <form>

                {error ? <p className="error alert">{errorMessage}</p> : '' }

                <div className={`inputGroup ${errors ? "error" : '' }`}>
                    <label>E-mail Address</label><br/>
                    <input type="text" placeholder="johndoe@gmail.com" {...register('email', {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})} />
                    {errors.email ? <p className='error'>Your email doesn't look right.</p> : ""}
                </div>
                <div className={`inputGroup ${errors ? "error" : '' }`}>
                    <label>Password</label><br/>
                    <input type="password" {...register('password', {required: true, minLength: 4})} />
                    {errors.password ? <p className='error'>Your password should be more than 4 characters.</p> : ""}
                </div>
                <button className="primary-button" >Log In</button>
            </form>
        </div>
    )
}

export default LogIn
