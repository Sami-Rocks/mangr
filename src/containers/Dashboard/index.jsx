import Card from '../../components/Card'
import './style.scss'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Buttons from '../../components/Buttons'
import app from '../../helpers/firebase'
import CreateProject from '../../components/CreateProject'
import { useState } from 'react'
import CreateCard from '../../components/CreateCard'
import { useEffect } from 'react'
import { indexOf, truncate } from 'lodash'
const Dashboard = () =>{

    const [modal, toggleModal] = useState(false)
    const [whichModal, setWhichModal] = useState('')

    const [currentProject, setCurrentProject] = useState({})
    const [projects, setProjects] = useState([])
    const [cards, setCards] = useState([])

    const [todo, setTodo] = useState([])
    const [backlog, setBacklog] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [done, setDone] = useState([])


    const [cardProp, setCardProp] = useState()
    const db = app.firestore()

    const handleModal= (which='',cardCat = '')=>{
        if(cardCat.length > 1){
            setCardProp(cardCat)
        }
        setWhichModal(which)
        toggleModal(!modal)
        fetchData()
    }
    const handleOptions = (e) =>{
        if(e.target.value !== ''){
            setCurrentProject(projects[e.target.value])
            fetchCards(currentProject.id)
        }
        
    }

    const logout = () =>{
        app.auth().signOut()
    }

    const desc = () => {
        return truncate(currentProject.description ? currentProject.description : 'Friends, Romans, countrymen, lend me your ears: I come to bury Caesar, not to praise him. All the world’s a stage, and all the men and women merely players. They have their exits and their entrances; And one man in his time plays many parts. There are more things in heaven and earth, Horatio, than are dreamt of in your philosophy. To be, or not to be: that is the question', {'length': 175} )
    }

    const fetchData = async()=>{
        const data = await db.collection("projects").orderBy('createdAt', 'asc').get()
        // .then( (res)=>{
        //     const data = res
            const pros = data.docs.map(item =>item.data()) 
            const currentPros = pros[pros.length - 1]
            setProjects(pros)

            setCurrentProject(currentPros)
            await fetchCards(currentPros.id)
        // } )
    }

    const addOrUpdate = (card, collection) => {
        const index = indexOf(collection.map((doc) => doc.id),card.id)
        if (index !== -1) {
            collection.splice(index,1,card);
        } else {
            collection.push(card);
        }
    }

    const fetchCards = async(id) =>{

            const data = await db.collection("tasks").where('projectId', '==', id).get()
            const categorizedCards = {
                todo: [...todo],
                backlog: [...backlog],
                inprogress: [...inProgress],
                done: [...done] 
            }

            for (const doc of data.docs) {
                const card = doc.data();
                addOrUpdate(card, categorizedCards[card.category])
            }

            setTodo(categorizedCards.todo)
            setBacklog(categorizedCards.backlog)
            setInProgress(categorizedCards.inprogress)
            setDone(categorizedCards.done)


            // const temp_cards = data.docs.map(item =>item.data()) 



            // setCards(temp_cards)
            // console.log(temp_cards)
            
            // temp_cards.forEach(card =>{
            //     if(card.category === 'todo'){
            //         setTodo([...todo, card])
            //     }else if(card.category === 'backlog'){
            //         setBacklog([...backlog, card])
            //     }else if(card.category === 'inprogress'){
            //         setInProgress([...inProgress, card])
            //     }else{
            //         setDone([...done, card])

            //     }
            // })
            // console.table(done)
            // console.table(backlog)
            // console.table(inProgress)
            // console.table(todo)
    
    }

    useEffect(()=>{
        fetchData()
    },[])
    
    return(
        <div className="dashboard" >
            {modal && 
                (
                    <div className="modal-container">
                        <div className="modal">
                            {whichModal === 'create' ? 
                                <CreateProject handleModal={handleModal} /> :
                                <CreateCard category={cardProp} project={currentProject} handleModal={handleModal} />
                            }
                        </div>
                    </div>
                )
            }
            <header>
                <div className="header-container">
                    {/* <div className="logo">
                        <h1>MANGR</h1>
                    </div> */}
                    <div className="projects">
                        <div className="inputGroup">
                            <select name="projects" id="projects" value={projects.indexOf(currentProject)}  onChange={(e) =>handleOptions(e)} >
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

                                        {backlog.map((card, index)=>{
                                            return(
                                                <Draggable key={index} draggableId={card.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                        <Card title={card.cardName} description={card.description}  assignedTo={card.assignedTo} type={card.type} />
                                                    </li>
                                                    )}
                                                </Draggable>
                                            )
                                        })}

                                    </div>
                                )}
                            </Droppable>
                            <Buttons title="Add +" type="button" buttonClass="blue add-button logout" clickEvent={()=>handleModal('card', 'backlog')} />
                        </div>
                        <div className="section todo">
                            <div className="section-title">To Do</div>
                            <Droppable droppableId ="droppable-2" index={2}>
                                {(provided, snapshot) => (
                                    <div className="section-content" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                        {todo.map((card, index)=>{
                                            return(
                                                <Draggable key={index} draggableId={card.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                        <Card title={card.cardName} description={card.description}  assignedTo={card.assignedTo} type={card.type} />
                                                    </li>
                                                    )}
                                                </Draggable>
                                            )
                                        })}
                                    </div>
                                )}
                            </Droppable>
                            <Buttons title="Add +" type="button" buttonClass="purple add-button logout" clickEvent={()=>handleModal('card', 'todo')} />
                        </div>
                        <div className="section in-progress">
                            <div className="section-title">In Progress</div>
                            <Droppable droppableId ="droppable-3" index={3}>
                                {(provided, snapshot) => (
                                    <div className="section-content" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                        {inProgress.map((card, index)=>{
                                            return(
                                                <Draggable key={index} draggableId={card.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                        <Card title={card.cardName} description={card.description}  assignedTo={card.assignedTo} type={card.type} />
                                                    </li>
                                                    )}
                                                </Draggable>
                                            )
                                        })}
                                    </div>
                                )}
                            </Droppable>
                            <Buttons title="Add +" type="button" buttonClass="yellow add-button logout" clickEvent={()=>handleModal('card', 'inprogress')} />
                        </div>
                        <div className="section done">
                            <div className="section-title">Done</div>
                            <Droppable droppableId ="droppable-4" index={4}>
                                {(provided, snapshot) => (
                                    <div className="section-content" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                        {done.map((card, index)=>{
                                            return(
                                                <Draggable key={index} draggableId={card.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                        <Card title={card.cardName} description={card.description}  assignedTo={card.assignedTo} type={card.type} />
                                                    </li>
                                                    )}
                                                </Draggable>
                                            )
                                        })}
                                    </div>
                                )}
                            </Droppable>
                            <Buttons title="Add +" type="button" buttonClass="green add-button logout" clickEvent={()=>handleModal('card', 'done')} />
                        </div>
                    </DragDropContext>
                </div>
            </div>
        </div>
    )
}

export default Dashboard