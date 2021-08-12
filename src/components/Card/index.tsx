import './style.scss'
import { capitalize,truncate } from 'lodash'


const Card = (props:any) =>{
    return(
        <div  className={`card ${props.type}`}>
            <p className="card-type">{capitalize(props.type)}</p>
            <h3 className="card-title">{truncate(capitalize(props.title), {'length': 20})}</h3>
            <div className="desc">
                {truncate( props.description , {'length': 150})}
                
            </div>
            <div className="card-to" >
                <div className="user" title={props.assignedTo} >
                    {truncate(props.assignedTo, {'length': 22})}
                </div>
            </div>
        </div>
    )
}

export default Card