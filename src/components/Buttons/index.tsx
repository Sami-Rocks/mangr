const Buttons = (props:any)=>{

    return(
        <button 
            className={props.buttonClass} 
            disabled={props.loading ? true : false } 
            onClick={props.clickEvent}
            type={props.type}
        >
            <span className="btn-content" >
                {props.title}
                {props.loading ? <span className="loading" > <span className="ball-1"></span> <span className="ball-2"></span> </span> : '' }
            </span>
        </button>
    )
} 

export default Buttons