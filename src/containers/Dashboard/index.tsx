import Card from '../../components/Card'
import './style.scss'

const Dashboard = () =>{
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
                    <div className="section backlog">
                        <div className="section-title">Backlog</div>
                        <div className="section-content">
                            <Card type="" />
                        </div>
                    </div>
                    <div className="section todo">
                        <div className="section-title">To Do</div>
                        <div className="section-content">
                            <Card type="bug" />
                        </div>
                    </div>
                    <div className="section in-progress">
                        <div className="section-title">In Progress</div>
                        <div className="section-content">
                            <Card type="feature" />
                        </div>
                    </div>
                    <div className="section done">
                        <div className="section-title">Done</div>
                        <div className="section-content">
                            <Card type="task" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard