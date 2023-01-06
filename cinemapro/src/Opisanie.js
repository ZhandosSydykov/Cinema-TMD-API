import {useParams} from "react-router-dom";
import {Card, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import './App.css'

function Opisanie(props) {
    const {tea} = useParams()
    const [info, setInfo] = useState({})
    const [spin,setSpin] = useState(true)
    setTimeout(()=>{
        setSpin(false)
    }, 700)
    useEffect(()=>{
        const a = axios.get(`https://api.themoviedb.org/3/${props.name ? `movie/${tea}`:`tv/${tea}`}?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru`)
        a.then(q=>{
            setInfo(q.data)
        })
    }, {tea})
    return (
        <>
            {spin ?
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>:
                <>
                    <div style={{border: '1px solid grey'}}>
                        <div className={'box a'}
                             style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${info.backdrop_path})`}}>
                             <div className={'prod a'}
                                 style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${info.poster_path})`}}/>
                            <h2 className={'text'}>{info.title || info.name}</h2>
                        </div>
                        <div className={'over'}>
                            <Card.Title>{info.overview}</Card.Title>
                        </div>
                    </div>
                </>
            }


        </>
    )
}

export default Opisanie