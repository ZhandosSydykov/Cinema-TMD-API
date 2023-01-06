import './App.css';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav, NavDropdown, Row, Col, ListGroup} from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios";
import Cards from "./Cards";
import TvAndCinema from "./Tv-and-Cinema";
import Janr from "./Janr";
import Opisanie from "./Opisanie";
import Person from "./Person";


function App() {
    const [genre, setGenre] = useState([])
    const [box,setBox] = useState(true)
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
                                <Nav.Link href="#a1" as={Link} to={`/`} onClick={()=> setBox(true)}>Главная</Nav.Link>
                                <Nav.Link href="#a2" as={Link} to={`/c/movie`} onClick={()=> setBox(true)}>Фильмы</Nav.Link>
                                <Nav.Link href="#a2" as={Link} to={`/c/series`} onClick={()=> setBox(false)}>Сериалы</Nav.Link>
                                <Nav.Link href="#a2" as={Link} to={`/c/person`} >Люди</Nav.Link>
                                <NavDropdown title="Жанры TV" id="navbarScrollingDropdown">
                                    {genre.map(q => {
                                        return <NavDropdown.Item href="#action3" as={Link} to={`/s/${q.id}`} onClick={()=> setBox(false)}>{q.name}</NavDropdown.Item>

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
                        <Route path="/" element={<TvAndCinema name={setBox}/>}/>
                        <Route path={`/c/:id`} element={<Cards/>}/>
                        <Route path={`/s/:mod`} element={<Janr name={box}/>}/>
                        <Route path={`/opis/:tea`} element={<Opisanie name={box}/>}/>
                        <Route path={`/f/:adam`} element={<Person/>}/>
                    </Routes>
                    </div>


                    <Col style={{marginTop: '8vh', marginRight: '5vh', width: '25vw'}}>
                        <ListGroup>
                            {genlist.map(q => {
                                return  <ListGroup.Item as={Link} to={`/s/${q.id}`} onClick={()=> setBox(true)}>{q.name.slice(0,1).toUpperCase()+ q.name.slice(1).toLowerCase()}</ListGroup.Item>
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </BrowserRouter>
        </>

    )
}

export default App;
