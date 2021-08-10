import firebase from "firebase"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Buttons from "../Buttons"

const CreateCard = (props:any) =>{

    type FormData = {
        cardName:string,
        category:string,
        projectID:string, 
    }
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = () =>{
        setLoading(!loading)

        let projectData = firebase.firestore().collection('tacks').doc()
        projectData.set([])
    }

    return(
        <div className="create-card">
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className={`inputGroup ${errors.cardName ? "error" : '' }`}>
                        <label>Project Name</label><br/>
                        <input type="text" placeholder="Awesome project" {...register('cardName', {required: true, minLength: 3})} />
                        {errors.cardName ? <p className='error'>Your full name should be more than 5 characters.</p> : ""}
                    </div>
                    <div className="inputGroup">
                            <select name="cars" id="cars">
                                <option value="">Select Project</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                        <div className="inputGroup">
                            <select name="cars" id="cars">
                                <option value="">Select Project</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                    
                    <br/>

                    <Buttons title="Create Project" type="submit" loading={loading} buttonClass="primary-button" />
                    <div className="" style={{ display:'flex', justifyContent:'center' }} >
                        <Buttons title='Cancel' type='button' buttonClass="delete-button" clickEvent={()=>props.handleModal()} />

                    </div>
            </form>
        </div>
    )
}

export default CreateCard