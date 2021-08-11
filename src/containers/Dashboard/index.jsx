import Card from '../../components/Card'
import './style.scss'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Buttons from '../../components/Buttons'
import app from '../../helpers/firebase'
import CreateProject from '../../components/CreateProject'
import { useState } from 'react'
import CreateCard from '../../components/CreateCard'
import { useEffect } from 'react'
import { truncate } from 'lodash'
const Dashboard = () =>{

    const [modal, toggleModal] = useState(false)
    const [whichModal, setWhichModal] = useState('')

    const [currentProject, setCurrentProject] = useState({})
    const [projects, setProjects] = useState([])

    const handleModal= (which='')=>{
        setWhichModal(which)
        toggleModal(!modal)
    }
    const handleOptions = (e) =>{
        setCurrentProject(projects[e.target.value])
    }

    const logout = () =>{
        app.auth().signOut()
    }

    const desc = () => {
        return truncate(currentProject.description ? currentProject.description : 'Friends, Romans, countrymen, lend me your ears: I come to bury Caesar, not to praise him. All the world’s a stage, and all the men and women merely players. They have their exits and their entrances; And one man in his time plays many parts. There are more things in heaven and earth, Horatio, than are dreamt of in your philosophy. To be, or not to be: that is the question', {'length': 175} )
    }

    useEffect(()=>{
        const fetchData = async()=>{
            const db = app.firestore()
            const data = await db.collection("projects").get()
            const pros = data.docs.map(item =>item.data()) 
            setProjects(pros)
            setCurrentProject(pros[pros.length - 1])
        }
        fetchData()

        console.log(projects)
    },[])
    
    return(
        <div className="dashboard" >
            {modal && 
                (
                    <div className="modal-container">
                        <div className="modal">
                            {whichModal === 'create' ? 
                                <CreateProject handleModal={handleModal} /> :
                                <CreateCard project={currentProject} handleModal={handleModal} />
                            }
                        </div>
                    </div>
                )
            }
            <header>
                <div className="header-container">
                    <div className="logo">
                        <h1>LOGO</h1>
                    </div>
                    <div className="projects">
                        <div className="inputGroup">
                            <select name="projects" id="projects" onChange={(e) =>handleOptions(e)} >
                                <option value="">Select Project</option>
                                {projects.map((pro, idx) =>{
                                    return(<option key={idx} value={idx}>{pro.projectName}</option>)
                                })}
                            </select>
                        </div>
                        <Buttons title="Create Project" type="button" buttonClass="delete-button" clickEvent={()=>handleModal('create')} />
                    </div>
                    <div className="logout">
                    <Buttons title="Logout" type="" buttonClass="secondary-button logout" clickEvent={logout} />
                    </div>
                </div>
            </header>
            <div className="top-board">
                <div className="top-board-container">
                    <h1 className="project-title">
                        {currentProject.projectName ? currentProject.projectName : 'Please create a project' }
                    </h1>
                    <p className="project-description">{desc()}</p>
                </div>
            </div>
            <div className="project-collaborators"></div>
            <div className="board">
                <div className="board-container">
                    <DragDropContext>
                        <div className="section backlog">
                            <div className="section-title">Backlog</div>
                            <Droppable droppableId ="droppable-0" index={0}>
                                {(provided, snapshot) => (
                                    <div className="section-content" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                        <Draggable draggableId="draggable-1" index={1}>
                                        {(provided, snapshot) => (
                                            <Card title="Card Title" innerRef={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} type="bug" />
                                        )}
                                        </Draggable>
                                    </div>
                                )}
                            </Droppable>
                            <Buttons title="Add +" type="button" buttonClass="blue add-button logout" clickEvent={()=>handleModal('card')} />
                        </div>
                        <div className="section todo">
                            <div className="section-title">To Do</div>
                            <Droppable droppableId ="droppable-2" index={2}>
                                {(provided, snapshot) => (
                                    <div className="section-content" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                        <Draggable draggableId="draggable-2" index={2}>
                                        {(provided, snapshot) => (
                                            <Card title="Card Title" innerRef={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} type="task" />
                                        )}
                                        </Draggable>
                                    </div>
                                )}
                            </Droppable>
                            <Buttons title="Add +" type="button" buttonClass="purple add-button logout" clickEvent={()=>handleModal('card')} />
                        </div>
                        <div className="section in-progress">
                            <div className="section-title">In Progress</div>
                            <Droppable droppableId ="droppable-3" index={3}>
                                {(provided, snapshot) => (
                                    <div className="section-content" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                        <Draggable draggableId="draggable-3" index={3}>
                                        {(provided, snapshot) => (
                                            
                                            <Card title="Card Title" innerRef={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} type="feature" />
                                        )}
                                        </Draggable>
                                    </div>
                                )}
                            </Droppable>
                            <Buttons title="Add +" type="button" buttonClass="yellow add-button logout" clickEvent={()=>handleModal('card')} />
                        </div>
                        <div className="section done">
                            <div className="section-title">Done</div>
                            <Droppable droppableId ="droppable-4" index={4}>
                                {(provided, snapshot) => (
                                    <div className="section-content" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                        <Draggable draggableId="draggable-4" index={4}>
                                        {(provided, snapshot) => (
                                           <Card title="Card Title" innerRef={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} type="" />
                                        )}
                                        </Draggable>
                                    </div>
                                )}
                            </Droppable>
                            <Buttons title="Add +" type="button" buttonClass="green add-button logout" clickEvent={()=>handleModal('card')} />
                        </div>
                    </DragDropContext>
                </div>
            </div>
        </div>
    )
}

export default Dashboard