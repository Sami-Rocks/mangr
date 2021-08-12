import firebase from "firebase"
import { isEmpty } from "lodash"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Buttons from "../Buttons"

type FormData = {
    projectName:string;
    owner:string;
    description:string;
    collaborators:Array<string>;
}

const CreateProject = (props:any) =>{

    const user:any = localStorage.getItem('user')

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)


    const [collaborators, setCollaborators] = useState([''])

    const onSubmit = (data:any) =>{
        collaborators.forEach(item => {
            if(!isEmpty(item)){
                data.collaborators.push(item)
            }
        })
        data.collaborators.push((JSON.parse(user)).email)
        data.owner = (JSON.parse(user)).email
        setLoading(!loading)

        let projectData = firebase.firestore().collection('projects').doc()
        data.id = projectData.id
        data.createdAt = new Date();
        projectData.set(data).then((res)=>{
            setLoading(!loading)
            props.handleModal()
        }).catch(err=>{
            setLoading(!loading)
            setErrorMessage('Failed. Try again!!')
        })
    }
    const addField = () =>{
        setCollaborators([...collaborators , ''])
    }
    const removeField = (idx:any)=>{
        let newCollaborators = [...collaborators]
        newCollaborators.splice(idx, 1)
        setCollaborators(newCollaborators)
    }

    const updatateCol = (idx:any, e:any) =>{
        let newCollaborators = [...collaborators]
        newCollaborators[idx] = e.target.value
        setCollaborators(newCollaborators)
    }

    return(
        <div className="create-project">
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit(onSubmit)} > 
                <div className={`inputGroup ${errors.projectName ? "error" : '' }`}>
                        <label>Project Name</label><br/>
                        <input type="text" placeholder="Awesome project" {...register('projectName', {required: true, minLength: 3})} />
                        {errors.projectName ? <p className='error'>Your full name should be more than 5 characters.</p> : ""}
                    </div>
                    <div className={`inputGroup ${errors.description ? "error" : '' }`}>
                        <label>Project Decription</label><br/>
                        <textarea placeholder="Please enter project decription" {...register('description', {required: false})} />
                        {errors.description ? <p className='error'>Your project decription doesn't look right.</p> : ""}
                    </div>
                    {collaborators.map((col, idx)=>{
                        return(
                        <div className={`inputGroup ${errors.collaborators ? "error" : '' }`}>
                            <label>Collaborator</label><br/>
                            <input type='text' name='collaborator' placeholder="johndoe@gmail.com" onChange={(e)=>updatateCol(idx, e)} />
                            <Buttons title='Delete' type='button' buttonClass="delete-button" clickEvent={()=>removeField(idx)} />
                        </div>
                        )
                    })}
                    <div className="" style={{width: 'fit-content', float: 'right'}}>
                        <Buttons title='Add Collaborator'  type='button' buttonClass="secondary-button" clickEvent={()=>addField()} />
                    </div>
                    <br/>
                    <br/>
                    <br/>

                    <Buttons title="Create Project" type="submit" loading={loading} buttonClass="primary-button" />
                    <div className="" style={{ display:'flex', justifyContent:'center' }} >
                        <Buttons title='Cancel' type='button' buttonClass="delete-button" clickEvent={()=>props.handleModal()} />

                    </div>
            </form>
        </div>
    )
}

export default CreateProject