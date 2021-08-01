import Card from '../../components/Card'
import './style.scss'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Dashboard = () =>{
    const todo = [1, 2, 3, 4, 5, 6]
    const backlog = [1, 2, 3, 4]
    const progress = [1, 2, 3]
    const done = [1, 2]
    return(
        <div className="dashboard" >
            <header>
                <div className="header-container">
                    <div className="logo">
                        <h1>LOGO</h1>
                    </div>
                    <div className="inputGroup">
                        <select name="cars" id="cars">
                            <option value="">Select Project</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
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
                        </div>
                        <div className="section todo">
                            <div className="section-title">To Do</div>
                            <Droppable droppableId ="droppable-2" index={2}>
                                {(provided, snapshot) => (
                                    <div className="section-content" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                        <Draggable draggableId="draggable-2" index={2}>
                                        {(provided, snapshot) => (
                                            <Card title="Card Title" innerRef={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} type="bug" />
                                        )}
                                        </Draggable>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <div className="section in-progress">
                            <div className="section-title">In Progress</div>
                            <Droppable droppableId ="droppable-3" index={3}>
                                {(provided, snapshot) => (
                                    <div className="section-content" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                        <Draggable draggableId="draggable-3" index={3}>
                                        {(provided, snapshot) => (
                                            
                                            <Card title="Card Title" innerRef={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} type="bug" />
                                        )}
                                        </Draggable>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <div className="section done">
                            <div className="section-title">Done</div>
                            <Droppable droppableId ="droppable-4" index={4}>
                                {(provided, snapshot) => (
                                    <div className="section-content" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                        <Draggable draggableId="draggable-4" index={4}>
                                        {(provided, snapshot) => (
                                           <Card title="Card Title" innerRef={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} type="bug" />
                                        )}
                                        </Draggable>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </DragDropContext>
                </div>
            </div>
        </div>
    )
}

export default Dashboard