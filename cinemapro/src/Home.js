import {ButtonGroup, Button, Card} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Home(props) {
    const[per,setPer] = useState(false)
    const [mov,setMov] = useState([])
    useEffect(()=>{
       if (props.type === 'popular'){
           const a = axios.get(`https://api.themoviedb.org/3${per ? '/tv/popular':'/movie/popular'}?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru`)
           a.then(q=>{
               setMov(q.data.results)
               per ? props.name(false):props.name(true)
           })
       }else{
           const a = axios.get(`https://api.themoviedb.org/3${per ? '/trending/movie/day':'/trending/movie/week'}?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru`)
           a.then(q=>{
               setMov(q.data.results)
           })
       }
    }, [per])
    const clk = ()=>{
        setPer(true)
    }
    const clk2 = ()=>{
        setPer(false)
    }
    return(
        <>
            <div style={{display:'flex',justifyContent:'space-between',width:'100%',height:'7vh',alignItems:"center",padding:'2vw'}}>
                <h2>{props.type === 'popular' ? 'Что популярно':'В тренде'}</h2>
                <ButtonGroup size="lg">
                    <Button variant={per ? 'success': 'secondary'} onClick={clk}>{props.type === 'popular' ? 'По TV':'Сегодня'}</Button>
                    <Button variant={!per ? 'success': 'secondary'} onClick={clk2}>{props.type === 'popular' ? 'В кинотеатрах':'В этой неделе'}</Button>
                </ButtonGroup>
            </div>
            <div style={{width:'75vw',display:'flex',flexWrap:'wrap',justifyContent:'center'}}>

                {mov.slice(0,8).map(q=>{
                    return(
                        <Card style={{width: '15vw', margin: '15px'}} as={Link} to={props.name !== 'person' ? `/opis/${q.id}`: `/f/${q.id}`}>
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
        </>
    )
}
export default Home