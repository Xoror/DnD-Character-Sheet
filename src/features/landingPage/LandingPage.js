import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { IoReloadOutline } from "react-icons/io5"

import { updateTodos, updateNews } from './LandingPageSlice'

export const LandingPage = () => {
    const dispatch = useDispatch()
    const news = useSelector(state => state.landingPage.news)
    const newsUpdated = useSelector(state => state.landingPage.newsUpdated)
    const todos = useSelector(state => state.landingPage.todos)
    const todosUpdated = useSelector(state => state.landingPage.todosUpdated)
    const currentState = useSelector(state => state)
    const characterName = useSelector(state => state.charDetails.charName)

    useEffect(() => {
        dispatch(updateTodos())
        dispatch(updateNews())
    }, [dispatch])

    const refreshTodos = (event) => {
        dispatch(updateTodos())
    }
    const refreshNews = (event) => {
        dispatch(updateNews())
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event.target[0].value)
    }

    return (
		<Container fluid className="main-style">
			<Row style={{paddingTop: "1em", paddingBottom:"0.5em", paddingRight:"1.25em", paddingLeft:"0.75em"}}>
				<Col md>
					<Card className="landing-page-card">
                        <Card.Header as="h5" style={{backgroundColor:"var(--secondary-element-color)"}}>News & Updates</Card.Header>
						<Card.Body style={{overflow: "auto"}}>
                            {news.map((post,index) => 
                                <Card key={`post-titled-${post.title}`} className="secondary-element-card" style={{marginBottom:"0.5em"}}>
                                    <Card.Body>
                                        <Card.Title> {post.title} <span style={{float:"right", fontWeight:"300", fontSize:"1rem"}}>{post.posted}</span></Card.Title>
                                        <Card.Text>
                                            {post.post}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )}
						</Card.Body>
						<Card.Footer style={{backgroundColor:"var(--secondary-element-color)"}}>
							<small>Last updated: {newsUpdated}</small>
                            <button className="react-icons-button" style={{float:"right", borderRadius:"100%"}} onClick={(event) => refreshNews(event)} aria-label={`reload news list`}>
                                <IoReloadOutline className="reload-button"  size="2em"/>
                            </button>
                        </Card.Footer>
					</Card>
				</Col>
				<Col md>
					<Card className="landing-page-card">
                        <Card.Header as="h5" style={{backgroundColor:"var(--secondary-element-color)"}}>To-Do List</Card.Header>
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
                            <button className="react-icons-button" style={{float:"right", borderRadius:"100%"}} onClick={(event) => refreshTodos(event)} aria-label={`reload todos list`}>
                                <IoReloadOutline className="reload-button"  size="2em"/>
                            </button>
                        </Card.Footer>
					</Card>
				</Col>
			</Row>
            <Row style={{paddingBottom:"0.5em", paddingRight:"1.25em", paddingLeft:"0.75em"}}>
                <Col>
                    <Card className="landing-page-card">
                        <Card.Header as="h5" style={{backgroundColor:"var(--secondary-element-color)"}}>Quick-Start</Card.Header>
						<Card.Body>
                            <>
                                <p>
                                    Coming Soon!
                                </p>
                                <form onSubmit={handleSubmit}>
                                    <input></input>
                                    <button type="submit">Roll</button>
                                </form>
                            </>
						</Card.Body>
						{false ? <Card.Footer style={{backgroundColor:"var(--secondary-element-color)"}}>
							<small>Last updated: {todosUpdated}</small>
                            
                            <button className="react-icons-button" onClick={(event) => refreshTodos(event)} aria-label={`reload todo list`}>
                                <IoReloadOutline className="reload-button"  size="2em"/>
                            </button>
                        </Card.Footer> : null }
					</Card>
                </Col>
            </Row>
		</Container>
	)
}