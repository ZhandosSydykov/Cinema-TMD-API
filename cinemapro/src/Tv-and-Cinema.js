import Home from "./Home";
import {useState} from "react";
import {Spinner} from 'react-bootstrap'

function TvAndCinema(props) {
    const [spin, setSpin] = useState(true)
    setTimeout(() => {
        setSpin(false)
    }, 2000)
    return (
        <>
            {spin ?
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div> :
                <>
                    <Home type={'popular'} name={props.name}/>
                    <Home type={'trend'}/>
                </>}

        </>
    )
}

export default TvAndCinema