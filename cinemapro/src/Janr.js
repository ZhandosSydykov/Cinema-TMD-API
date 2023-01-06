import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Card, Spinner} from "react-bootstrap";


function Janr(props) {
    const {mod} = useParams()
    const [spin,setSpin] = useState(true)
    const [movie, setMovie] = useState([])
    useEffect(() => {
const a = axios.get(`https://api.themoviedb.org/3/discover/${props.name ? 'movie':'tv'}?with_genres=${mod}&api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru`)
        a.then(q => {
            setMovie(q.data.results)
            setSpin(true)
        })
    },[mod])
    setTimeout(()=>{
        setSpin(false)
    },500)
    return (
        <>
            {spin ?
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>:
            <>
                {movie.map(q => {
                    return (
                        <Card style={{width: '15vw', margin: '15px'}} as={Link} to={`/opis/${q.id}`}>
                            <img src={`https://image.tmdb.org/t/p/original${q.poster_path}`}
                                 width={'100%'}/>
                            <Card.Body>
                                <Card.Title>{q.title || q.name}</Card.Title>
                                <Card.Text>{q.title || q.name}</Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}
            </>}
        </>
    )
}

export default Janr