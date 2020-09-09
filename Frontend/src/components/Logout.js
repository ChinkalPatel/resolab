import React,{Component} from 'react';
import { Jumbotron,Button,Row,Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie";

const cookies = new Cookies();
class LogOut extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect:false
        }
    }
    handleLogout(event){
        event.preventDefault();
        cookies.remove('token', { path: '/' });
        //alert("You are logged out!");
        this.setState({
            redirect:true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            window.location.replace('/');
        }
    }
    render(){
        return(
        <>
            {this.renderRedirect()}
            <Jumbotron fluid className="bg-white">
                <h1>Are you sure you want to Logout?</h1>
                <br />
                <Row style={{width:"100%"}}>
                    <Col>
                        <Link to="/"><Button variant="primary">No</Button></Link>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={this.handleLogout.bind(this)}>
                        Yes
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
        </>
    );
    }
}

export default LogOut;