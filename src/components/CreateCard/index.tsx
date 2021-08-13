import firebase from "firebase"
import { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Buttons from "../Buttons"

const CreateCard = (props:any) =>{

    type FormData = {
        cardName:string,
        category:string,
        projectID:string, 
        description:string
    }
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const [type, setType] = useState('')
    const [colla, setColla] = useState()
    const [category, setCategory] = useState()

    const onSubmit = (data:any) =>{
        setLoading(!loading)
        data.projectId = props.project.id
        data.assignedTo = colla
        data.type = type
        data.category = category
        let projectData = firebase.firestore().collection('tasks').doc()
        data.id = projectData.id

        projectData.set(data).then(
            (res)=>{
                setLoading(!loading)
                props.handleModal()
                props.fetchData()
            }
        ).catch(err=>{
            console.log(err)
        })
    }

    const handletype = (e:any)=>{
        setType(e.target.value)
    }
    const handleColla = (e:any)=>{
        setColla(e.target.value)
    }
    const handleCategory = (e:any)=>{
        setCategory(e.target.value)
    }
    useEffect(()=>{
        setType('task')
        setCategory(props.category)
        setColla(props.project.collaborators[0])
    },[])

    return(
        <div className="create-card">
            <h1>Create Card</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className={`inputGroup ${errors.cardName ? "error" : '' }`}>
                        <label>Card's Title</label><br/>
                        <input type="text" placeholder="Card Name" {...register('cardName', {required: true, minLength: 3})} />
                        {errors.cardName ? <p className='error'>Your card's title should be more than 3 characters.</p> : ""}
                    </div>
                    <div className={`inputGroup ${errors.description ? "error" : '' }`}>
                        <label>Project Decription</label><br/>
                        <textarea placeholder="Please enter project decription" {...register('description', {required: false})} />
                        {errors.description ? <p className='error'>Your project decription doesn't look right.</p> : ""}
                    </div>
                    <div className="inputGroup">
                        <label>Card Type</label>
                            <select name="type" id="type" onChange={(e)=>handletype(e)} >
                                <option value="task">Task</option>
                                <option value="bug">Bug</option>
                                <option value="feature">Feature</option>
                            </select>
                        </div>
                        <div className="inputGroup">
                            <label>Category</label>
                            <select name="cars" id="cars" value={category} onChange={(e)=>handleCategory(e)}>
                                <option value="backlog">Backlog</option>
                                <option value="todo">To do</option>
                                <option value="inprogress">In progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div className="inputGroup">
                            <label>Assign To</label>
                            <select name="cars" id="cars" onChange={(e)=>handleColla(e)}>
                                {props.project.collaborators.map((pro:any, idx:number) =>{
                                    return(<option key={idx} value={pro}>{pro}</option>)
                                })}
                            </select>
                        </div>
                    
                    <br/>

                    <Buttons title="Create Card" type="submit" loading={loading} buttonClass="primary-button" />
                    <div className="" style={{ display:'flex', justifyContent:'center' }} >
                        <Buttons title='Cancel' type='button' buttonClass="delete-button" clickEvent={()=>props.handleModal()} />

                    </div>
            </form>
        </div>
    )
}

export default CreateCard