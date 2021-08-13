import { capitalize } from 'lodash'
import Buttons from '../Buttons'
import './style.scss'

const CardView = (props) =>{

    return(
        <div className="card-view" >
            <h1 className="card-title">{props.card.cardName}</h1>
            <p className="card-type" >{capitalize(props.card.category)} -  {capitalize(props.card.type )}  </p>
            
            <p className="card-desc" >{props.card.description}</p>
            <Buttons title='Close' type='button' buttonClass="delete-button" clickEvent={()=>props.handleModal()} />
        </div>
    )
}

export default CardView