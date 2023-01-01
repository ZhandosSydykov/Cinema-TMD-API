import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Card} from "react-bootstrap";

function Pers() {
    const {adam} = useParams()
    const [info, setInfo] = useState({})
    useEffect(()=>{
        const a = axios.get(`https://api.themoviedb.org/3/person/${adam}?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru`)
        a.then(q=>{
            setInfo(q.data)
        })
    }, {adam})
    return (
        <>
            <div style={{border:'1px solid grey'}}>
                <div className={'box a'} style={{backgroundColor:'gray'}}>
                    <div className={'prod a'} style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${info.profile_path})`}}/>
                    <h2 className={'text'}>{info.name}</h2>
                </div>
                <div className={'over'}>
                    <Card.Title>{info.biography}</Card.Title>
                </div>
            </div>

        </>
    )

}
export default Pers