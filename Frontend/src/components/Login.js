import React,{Component} from 'react';
import LoadingElement from './Loader';
import {Form,Col,Button,Container} from 'react-bootstrap';
import firebase from './firebase/firebase';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import Form1 from "./InnerForm1";

class Loginform extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            userID:null,
            token:'',
            loader:false
        };
    }
    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        });
    };
    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        });
    };
    handleLogin = () => {
        this.setState({
            loader:true
        })
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((response)=>{
            console.log(response);
            firebase.auth().currentUser.getIdToken().then((data) => {
                this.setState({
                    // currentUser: true,
                    userID: data,
                });
                console.log("token");
                console.log(data);
                // alert("Login Successful " + this.state.userID);
                axios.post('https://api.resolabindia.com/core/login/', {
                        id_token: data,
                    })
                    .then((response) => {
                        this.setState({
                            currentUser: true,
                            token: response.data.token,
                            loader: false
                        })
                        const cookies = new Cookies();
                        console.log(response.data);
                        console.log(response.data.token);
                        cookies.set("token", response.data.token, {
                            path: "/",
                        });
                        cookies.set("name", response.data.user_profile.name, {
                            path: "/",
                        });
                        cookies.set("phone_number", response.data.user_profile.phone_number, {
                            path: "/",
                        });
                        cookies.set("picture", response.data.user_profile.profile_pic_url, {
                            path: "/",
                        });
                        cookies.set("email", response.data.user_profile.email, {
                            path: "/",
                        });
                        cookies.set("is_subscribed", response.data.user_profile.is_subscribed, {
                            path: "/",
                        });
                        cookies.set("is_verified", response.data.user_profile.is_verified, {
                            path: "/",
                        });
                        cookies.set("id", response.data.user_profile.id, {
                            path: "/",
                        });
                        // console.log("Cookie is " + cookies.get("token"));
                        // console.log("Cookie is " + cookies.get("name"));
                        window.location.replace('/form1');
                        // console.log(response);
                        // alert("Success");
                    }, (error) => {
                        this.setState({
                            loader: false
                        })
                        console.log(error.response+". Contact Team if you have already registered!!");
                        alert(error.response.data.non_field_errors[0]);
                    });
            });
        })
        .catch(error => {
            console.log(error);
            this.setState({
                loader: false
            })
            alert(error.message);
        });
    };
    handleSubmit(event) {
        event.preventDefault();
    };

    render(){
    if (this.state.loader === true) {
      return (
        <LoadingElement />
      );
    }
    else if (this.state.currentUser === true)
    {
        return(
          <Form1 />  
        );
    }
    else {
        return(
            <Container fluid>
                <br />
                <h2><u>Login Form</u></h2>
                <br />
                <br />
                <Form noValidate onSubmit={this.handleSubmit}>
                    <br />
                    <Form.Group>
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Email ID : 
                            </Form.Label>
                            <Col>
                            <Form.Control
                            required
                            type="email"
                            placeholder="Email ID"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please write correct Email
                            </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Password : 
                            </Form.Label>
                            <Col>
                            <Form.Control
                            required
                            type="password"
                            placeholder="********"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please write correct Password
                            </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                    </Form.Group>
                    <Button 
                    variant="primary"  
                    type="submit"
                    onClick={this.handleLogin.bind(this)}
                    >
                    Login
                    </Button>
                </Form>
                <p><Link to="/rpassword">Forget Password?</Link></p>
            </Container>
        );
    }
    }

}

export default Loginform;