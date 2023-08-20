import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'

import { IoReloadOutline } from "react-icons/io5"

import { updateTodos, updateNews } from './LandingPageSlice'

export const LandingPage = () => {
    const dispatch = useDispatch()
    const news = useSelector(state => state.landingPage.news)
    const newsUpdated = useSelector(state => state.landingPage.newsUpdated)
    const todos = useSelector(state => state.landingPage.todos)
    const todosUpdated = useSelector(state => state.landingPage.todosUpdated)

    useEffect(() => {
        dispatch(updateTodos())
        dispatch(updateNews())
    }, [])

    const refreshTodos = (event) => {
        dispatch(updateTodos())
    }
    const refreshNews = (event) => {
        dispatch(updateNews())
    }

	return (
		<Container fluid className="main-style">
			<Row style={{paddingBottom:"0.5em", paddingRight:"1.25em", paddingLeft:"0.75em"}}>
				<Col md>
					<Card className="landing-page-card">
                        <Card.Header style={{backgroundColor:"var(--secondary-element-color)"}}><h5>News & Updates</h5></Card.Header>
						<Card.Body style={{overflow: "auto"}}>
							<Card.Text>
								{news.map((post,index) => 
                                    <Card className="secondary-element-card" style={{marginBottom:"0.5em"}}>
                                        <Card.Body>
                                            <Card.Title> {post.title} <span style={{float:"right", fontWeight:"300", fontSize:"1rem"}}>{post.posted}</span></Card.Title>
                                            <Card.Text>
                                                {post.post}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                )}
							</Card.Text>
						</Card.Body>
						<Card.Footer style={{backgroundColor:"var(--secondary-element-color)"}}>
							<small>Last updated: {newsUpdated}</small>
                            <IoReloadOutline tabIndex="0" type="button" className="reload-button" onClick={(event) => refreshNews(event)} size="2em"/>
						</Card.Footer>
					</Card>
				</Col>
				<Col md>
					<Card className="landing-page-card">
                        <Card.Header style={{backgroundColor:"var(--secondary-element-color)"}}><h5>To-Do List</h5></Card.Header>
						<Card.Body style={{overflow: "auto"}}>
                            <label id="major-tasks">Major Tasks</label>
                            <ul aria-labelledby="major-tasks">
                                {todos.big.map((todo, index) => (
                                    <li key={`todo-big-${index}`}>{todo}</li>
                                ))}
                            </ul>
                            <label id="medium-tasks">Medium Tasks</label>
                            <ul aria-labelledby="medium-tasks">
                                {todos.medium.map((todo, index) => (
                                    <li key={`todo-medium-${index}`}>{todo}</li>
                                ))}
                            </ul>
                            <label id="minor-tasks">Minor Tasks</label>
                            <ul aria-labelledby="minor-tasks">
                                {todos.small.map((todo, index) => (
                                    <li key={`todo-minor-${index}`}>{todo}</li>
                                ))}
                            </ul>
						</Card.Body>
						<Card.Footer style={{backgroundColor:"var(--secondary-element-color)"}}>
							<small>Last updated: {todosUpdated}</small>
                            <IoReloadOutline tabIndex="0" type="button" className="reload-button" onClick={(event) => refreshTodos(event)} size="2em"/>
						</Card.Footer>
					</Card>
				</Col>
			</Row>

            <Row style={{paddingBottom:"0.5em", paddingRight:"1.25em", paddingLeft:"0.75em"}}>
                <Col>
                    <Card className="landing-page-card">
                        <Card.Header style={{backgroundColor:"var(--secondary-element-color)"}}><h5>Quick-Start</h5></Card.Header>
						<Card.Body>
                            {false ? <>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email address"
                                    
                                    style={{color:"black"}}
                                >
                                    <Form.Control type="email" placeholder="name@example.com" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control type="password" placeholder="Password" />
                                </FloatingLabel>
                            </> : <p>Coming soon!</p> }
						</Card.Body>
						{false ? <Card.Footer style={{backgroundColor:"var(--secondary-element-color)"}}>
							<small>Last updated: {todosUpdated}</small>
                            <IoReloadOutline tabIndex="0" type="button" className="reload-button" onClick={(event) => refreshTodos(event)} size="2em"/>
						</Card.Footer> : null }
					</Card>
                </Col>
            </Row>
		</Container>
	)
}