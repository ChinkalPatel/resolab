import React,{Component} from 'react';
import LoadingElement from './Loader';
import {Form,Col,Button,Container} from 'react-bootstrap';
import firebase from './firebase/firebase';
import DetailForm from './Details';

class SignUpForm extends Component{
    constructor(props){
        super(props);
        this.state={
            sendOTP:false,
            phone_number:"",
            currentUser:false,
            otp:"",
            isButtonDisabled:false,
            loader:false
        };
    }
    componentDidMount() {
        // this.countdown();
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "sign-in-button", {
                size: "invisible",
                callback: response => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    // ...
                    console.log(response)
                    // this.setState({
                    //     isButtonDisabled: false
                    // });
                },
                "expired-callback": response => {
                    // Response expired. Ask user to solve reCAPTCHA again.
                    // ...
                    // this.setState({
                    //     isButtonDisabled: true
                    // });
                    console.log(response);
                    alert("Recaptcha Expired, Please try again");
                }
            }
        );
        window.recaptchaVerifier.render().then(function (widgetId) {
            window.recaptchaWidgetId = widgetId;
        });
    }
    
    handlePhoneChange = event => {
        this.setState({
            phone_number: event.target.value
        });
    };
    handleOTPChange = event => {
        this.setState({
            otp: event.target.value
        });
    };
    handleLogin = () => {
        document.getElementById("wait").textContent = "Please wait for OTP.....";
        let appVerifier = window.recaptchaVerifier;
        console.log(appVerifier);
        firebase
        .auth()
        .signInWithPhoneNumber("+91"+this.state.phone_number, appVerifier)
        .then(confirmationResult => {
            this.setState({
                loader:false,
                sendOTP: true
            });

            window.confirmationResult = confirmationResult;
        })
        .catch(err => {
            this.setState({
                loader:false
            })
            console.log(err);
            alert(err.message);
        });
    };

    handleOTPCheck = () => {
        this.setState({
            loader:true
        })
        window.confirmationResult
            .confirm(this.state.otp)
            .then(result=>{
                // User signed in successfully.
                this.setState({
                    currentUser:true,
                    loader:false
                })
                console.log("Sign in Successful");

            })
            .catch(err => {
                this.setState({
                    loader:false
                })
                // User couldn't sign in (bad verification code?)
                console.log(err);
                alert("Enter correct OTP!");
            });
    };
    handleSubmit(event) {
        event.preventDefault();
    };

    render(){
    if(this.state.loader === true)
    {
        return (
            <LoadingElement />
        );
    }
    else if (this.state.currentUser===true)
    {
        return(
            <DetailForm phone_number={this.state.phone_number}/>
        );
    }
    else if (this.state.sendOTP === false){
        return(
            <Container fluid>
                <br />
                <h2><u>Sign Up Form</u></h2>
                <br />
                <h3>Enter your phone number</h3>
                <br />
                <p id="wait" style={{color:"blue",fontWeight:"bold"}}></p>
                {/* <Row>
                    <Col sm></Col>
                    <Col sm="auto">
                        <div id="recaptcha-container"></div>
                    </Col>
                    <Col sm></Col>
                </Row>  */}
                <Form noValidate onSubmit={this.handleSubmit}>
                    <br />
                    <Form.Group>
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Mobile Number : 
                            </Form.Label>
                            <Col>
                            <Form.Control
                            required
                            type="tel"
                            placeholder="Mobile Number"
                            value={this.state.phone_number}
                            onChange={this.handlePhoneChange}
                            pattern="[0-9]{10}"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please write correct phone number
                            </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                    </Form.Group>
                    <Button
                    id="sign-in-button" 
                    variant="primary"  
                    type="submit"
                    onClick={this.handleLogin.bind(this)}
                    disabled={this.state.isButtonDisabled}
                    >
                    Verify
                    </Button>
                    <p>
                         By tapping Verify, an SMS may be sent. Message &amp; data rates may apply.
                    </p>
                </Form>
            </Container>
        );
    }
    else {
         return(
            <Container fluid>
                <Form noValidate onSubmit={this.handleSubmit}>
                    <br />
                    <Form.Group>
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Enter OTP :
                            </Form.Label>
                            <Col>
                            <Form.Control
                            required
                            value={this.state.otp}
                            onChange={this.handleOTPChange}
                            type="number"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please write 6 digit number
                            </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                    </Form.Group>
                    <Button 
                    onClick={this.handleOTPCheck.bind(this)}
                    type="submit"
                    disabled={this.state.isButtonDisabled}
                    >
                        Continue
                    </Button>
                </Form>
            </Container>
        );
    }
    }

}

export default SignUpForm;