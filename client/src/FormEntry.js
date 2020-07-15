import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';


const FormEntry = (props) => {
    return(
        <label>
            <Container>
                <Row>
                    <Col xs="5"><b>{props.title}</b></Col>
                    <Col xs="6">
                        <input
                        className={props.error ? "error" : "success"}
                        type = {props.type}
                        value={props.value}
                        onChange={props.function}
                        />
                        <div>
                            {props.error ? <p className="errorMessage">*invalid entry</p> : <p></p>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </label>
    );
}

export default FormEntry;