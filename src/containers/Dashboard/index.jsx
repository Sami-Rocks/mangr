import Card from '../../components/Card'
import './style.scss'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Buttons from '../../components/Buttons'
import app from '../../helpers/firebase'
import CreateProject from '../../components/CreateProject'
import { useState } from 'react'
import CreateCard from '../../components/CreateCard'

const Dashboard = () =>{

    const [modal, toggleModal] = useState(false)
    const [whichModal, setWhichModal] = useState('')

    const handleModal= (which='')=>{
        setWhichModal(which)
        toggleModal(!modal)
    }

    const logout = () =>{
        app.auth().signOut()
    }
    return(
        <div className="dashboard" >
            {modal && 
                (
                    <div className="modal-container">
                        <div className="modal">
                            {whichModal === 'create' ? 
                                <CreateProject handleModal={handleModal} /> :
                                <CreateCard handleModal={handleModal} />
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
                            <select name="cars" id="cars">
                                <option value="">Select Project</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
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
                        Project Title
                    </h1>
                    <p className="project-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et facilis iure porro ipsa sequi iusto culpa praesentium dolor quo, atque reprehenderit at temporibus omnis fuga eligendi, suscipit dolorem? Quae, ipsa!</p>
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