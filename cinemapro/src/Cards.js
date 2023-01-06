import {Card, Row, Col, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

function Cards() {
    const {id} = useParams()
    const [card, setCard] = useState([])
    const [spin,setSpin] = useState(true)
    setTimeout(()=>{
        setSpin(false)
    }, 700)
    useEffect(() => {
        const a = axios.get(`https://api.themoviedb.org/3${id === 'movie' ? '/movie/popular' :id === 'series'? '/tv/popular':'/person/popular'}?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru`)
        a.then(q => {
            setCard(q.data.results)
            setSpin(true)
        })
    }, [id])
    return (
        <>
            {spin ?
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>:
            <>
                <h1 style={{marginLeft:'5vw'}}>{id === 'movie' ? 'Фильмы' : id === 'series' ? 'Сериалы' : 'Люди'}</h1>
                <div style={{width: '75vw', display: 'flex', flexWrap: 'wrap',justifyContent: 'center'}}>
                    {card.map(q => {
                        return (
                            <Card style={{width: '15vw', margin: '15px'}} as={Link} to={id !== 'person' ? `/opis/${q.id}`: `/f/${q.id}`}>
                                <img src={`https://image.tmdb.org/t/p/original${q.poster_path || q.profile_path}`}
                                     width={'100%'}/>
                                <Card.Body>
                                    <Card.Title>{q.title || q.name}</Card.Title>
                                    <Card.Text>{q.title || q.name}</Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </>}
        </>
    )
}

export default Cards