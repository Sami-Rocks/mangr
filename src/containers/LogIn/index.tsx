/* eslint-disable no-useless-escape */
import { useContext, useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { Redirect, useHistory } from "react-router-dom"
import Buttons from "../../components/Buttons"
import { AuthContext } from "../../helpers/Auth"
import app from "../../helpers/firebase"

type FormData = {
    email:string;
    password:string;
}

const LogIn = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const onSubmit = useCallback( async (data:any)=>{
        setLoading(true)
        setErrorMessage('')
        setError(false)
        
        try{
            await app.auth().signInWithEmailAndPassword(data.email, data.password)
            history.push('/dashboard')
            setLoading(false)
        }catch(error){
            setErrorMessage( JSON.stringify(error))
            setError(true)
            setLoading(false)
        }
    }, [history])

    const {currentUser} = useContext(AuthContext)

    if(currentUser){
        localStorage.setItem('user', currentUser)
        return(
            <Redirect to="/dashboard" />
        )
    }


    return(
        <div className="register auth" onSubmit={handleSubmit(onSubmit)} >
            <h1>Welcome Back!</h1>
            <form>

                {error ? <p className="error alert">{errorMessage}</p> : '' }

                <div className={`inputGroup ${errors.email ? "error" : '' }`}>
                    <label>E-mail Address</label><br/>
                    <input type="text" placeholder="johndoe@gmail.com" {...register('email', {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})} />
                    {errors.email ? <p className='error'>Your email doesn't look right.</p> : ""}
                </div>
                <div className={`inputGroup ${errors.password ? "error" : '' }`}>
                    <label>Password</label><br/>
                    <input type="password" {...register('password', {required: true, minLength: 4})} />
                    {errors.password ? <p className='error'>Your password should be more than 4 characters.</p> : ""}
                </div>
                <Buttons title="Log in" type="submit" loading={loading} buttonClass="primary-button" />
                <p className="_" >New User? <span className="link" onClick={()=>history.push('/')} >Sign Up</span> </p>
            </form>
        </div>
    )
}

export default LogIn
