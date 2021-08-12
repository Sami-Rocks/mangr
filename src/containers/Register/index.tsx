/* eslint-disable no-useless-escape */
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import Buttons from './../../components/Buttons'
import './style.scss'
import app from './../../helpers/firebase'
import { Redirect, useHistory } from "react-router-dom"
import { useCallback } from "react"
import { pick } from "lodash"
import firebase from 'firebase'
import { AuthContext } from "../../helpers/Auth"
type FormData = {
    displayName:string;
    email:string;
    password:string;
}

const Register = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    
    const history = useHistory()
    
    const onSubmit = useCallback(async (data:any)=>{
        setLoading(true)
        setErrorMessage('')
        setError(false)
        try{
            await app.auth().createUserWithEmailAndPassword(data.email, data.password).then(
                (res)=>{
                    return res.user?.updateProfile({
                        displayName: data.displayName
                    }).then(()=>{
                        const data:any = app.auth().currentUser
                        const userFields = ['email', 'displayName', 'uid', 'apiKey']
                        
                        const user = pick(data, userFields)
                        let userData = firebase.firestore().collection('users').doc(user?.uid)
                        userData.set(user)
                        history.push('/dashboard')
                        setLoading(false)
                    })
                }
            )
        }catch(error){
            setErrorMessage(error)
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
            <form>
                
                {error ? <p className="error alert">{errorMessage}</p> : '' }

                <div className={`inputGroup ${errors.displayName ? "error" : '' }`}>
                    <label>Full Name</label><br/>
                    <input type="text" placeholder="John Doe" {...register('displayName', {required: true, minLength: 5})} />
                    {errors.displayName ? <p className='error'>Your full name should be more than 5 characters.</p> : ""}
                </div>
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
                <Buttons title="Register" type="submit" loading={loading} buttonClass="primary-button" />
            </form>
        </div>
    )
}

export default Register
