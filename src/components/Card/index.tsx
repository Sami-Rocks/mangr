import './style.scss'

const Card = (props:any) =>{
    return(
        <div className={`card ${props.type}`}>
            <p className="card-type">Card Type</p>
            <h3 className="card-title">Card Title</h3>
            <div className="card-to" >
                <div className="user">D</div>
                <div className="user">G</div>
            </div>
            <div className="desc">4 Comments</div>
        </div>
    )
}

export default Card