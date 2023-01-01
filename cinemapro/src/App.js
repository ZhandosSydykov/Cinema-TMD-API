import './App.css';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav, NavDropdown, Row, Col, ListGroup} from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios";
import CardList from "./CardList";
import Tv_or_Cin from "./Tv_or_Cin";
import Genremovie from "./Genremovie";
import Opis from "./Opis";
import Pers from "./Pers";


function App() {
    const [genre, setGenre] = useState([])
    const [bol,setBol] = useState(true)
    const [genlist,setGenlist] = useState([])
    useEffect(() => {
        const a = axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru`)
        a.then(q => {
            setGenlist(q.data.genres)
        })
    }, [])
    useEffect(() => {
        const a = axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru`)
        a.then(q => {
            setGenre(q.data.genres)
        })
    }, [])

    return (
        <>
            <BrowserRouter>
                <Navbar variant="dark" bg="dark" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="#home">
                            <img
                                src="https://cdn2.vectorstock.com/i/1000x1000/38/76/cinema-logo-movie-emblem-template-vector-19873876.jpg"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                                style={{width: '60px', height: '60px', borderRadius: '50%'}}
                            />
                        </Navbar.Brand>
                        <Navbar.Brand href="#">CINEMA-BOX</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll"/>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{maxHeight: '100px'}}
                                navbarScroll
                            >
                                <Nav.Link href="#action1" as={Link} to={`/`} onClick={()=> setBol(true)}>Главная</Nav.Link>
                                <Nav.Link href="#action2" as={Link} to={`/c/movie`} onClick={()=> setBol(true)}>Фильмы</Nav.Link>
                                <Nav.Link href="#action2" as={Link} to={`/c/series`} onClick={()=> setBol(false)}>Сериалы</Nav.Link>
                                <Nav.Link href="#action2" as={Link} to={`/c/person`} >Люди</Nav.Link>
                                <NavDropdown title="Жанры TV" id="navbarScrollingDropdown">
                                    {genre.map(q => {
                                        return <NavDropdown.Item href="#action3" as={Link} to={`/s/${q.id}`} onClick={()=> setBol(false)}>{q.name}</NavDropdown.Item>

                                    })}
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Row md={12}>

                    <div style={{
                        width: '75vw',
                        display: 'flex',
                        flexWrap: 'wrap',
                        marginTop: '7vh',
                        justifyContent: 'center',
                    }}><Routes>
                        <Route path="/" element={<Tv_or_Cin name={setBol}/>}/>
                        <Route path={`/c/:id`} element={<CardList/>}/>
                        <Route path={`/s/:mod`} element={<Genremovie name={bol}/>}/>
                        <Route path={`/opis/:tea`} element={<Opis name={bol}/>}/>
                        <Route path={`/f/:adam`} element={<Pers/>}/>
                    </Routes>
                    </div>


                    <Col style={{marginTop: '8vh', marginRight: '5vh', width: '25vw'}}>
                        <ListGroup>
                            {genlist.map(q => {
                                return  <ListGroup.Item as={Link} to={`/s/${q.id}`} onClick={()=> setBol(true)}>{q.name.slice(0,1).toUpperCase()+ q.name.slice(1).toLowerCase()}</ListGroup.Item>
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </BrowserRouter>
        </>

    )
}

export default App;
