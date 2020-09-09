import React from 'react';
import { Jumbotron,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

function ErrorPage(){
    return(
        <Jumbotron fluid className="bg-white">
            <h1>Page Not Found</h1>
            <p>We can't find the page you're looking for.</p>
            <p>You can either return to the previous page, visit our homepage or contact our support team.</p>
            <p>
                <Link to="/"><Button variant="primary">Home Page</Button></Link> {' '}
                <Link to="/contact"><Button variant="primary">Contact Us</Button></Link>
            </p>
        </Jumbotron>
    );
}

export default ErrorPage;