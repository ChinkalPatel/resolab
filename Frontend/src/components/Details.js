import React,{Component} from 'react';
import {Form,Col,Button,Container,Alert} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import LoadingElement from './Loader';
import firebase from './firebase/firebase';
class DetailForm extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            email_id:"",
            password:"",
            picture_url:"",
            pictures:null,
            dob:"",
            region: "",
            phone_number:props.phone_number,
            userID:"",
            isuser:false,
            loader:false,
            validated:false,
            alert:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange=event=>{
        this.setState({
            name: event.target.value,
            phone_number: this.props.phone_number
        });
    }
    handlefileChange = event => {
        console.log(event);
        if (event.target.files[0].size > 4194304) {
            alert("File Size is too big!!");
            this.setState({
                pictures: null
            });
        } else {
            this.setState({
                pictures: event.target.files[0]
            });
        }
    }
    handleDobChange = event => {
        this.setState({
            dob: event.target.value
        });
    }
    handleRegionChange = event =>{
        console.log(this.state.region);
        this.setState({
            region: event.target.value
        });
        console.log(event.target.value);
    }
    handleEmailChange = event =>{
        this.setState({
            email_id:event.target.value
        })
    }
    handlePasswordChange = event =>{
        this.setState({
            password: event.target.value
        })
    }
    setShow=event=>{
        this.setState({
            alert:false
        })
    }
    handleSubmit(event){
        //console.log(event);
        const form = event.currentTarget;
        //console.log(form.checkValidity());
        const fd = new FormData();
        
        console.log(fd);
        if (this.state.pictures===null)
        {
           event.preventDefault();
           event.stopPropagation();
           this.setState({
              alert:true
           });
        }
        //console.log(this.state.pictures[0]);
        if (form.checkValidity() === false) {
            console.log(this.state.pictures);
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                validated:true
            })
        }
        else{
            event.preventDefault();
            this.setState({
                loader: true
            })
            firebase.auth().createUserWithEmailAndPassword(this.state.email_id,this.state.password)
            .then(user=>{
                console.log(user.user.uid);
                this.setState({
                    userID: user.user.uid,
                });
                axios.get('https://api.resolabindia.com/core/get_presigned_url',
                {
                    params:{
                        "file_name": this.state.phone_number +this.state.pictures.name
                    }
                }).then((response)=>{
                    // console.log(response.data);
                    // console.log(this.state.pictures[0].name);
                    const awsurl = response.data.url;
                    const awskey = response.data.fields.key;
                    fd.append('key', response.data.fields.key);
                    fd.append(
                        'file',
                        this.state.pictures,
                        this.state.pictures.name
                    );
                    fd.append('AWSAccessKeyId', response.data.fields.AWSAccessKeyId);
                    fd.append('policy', response.data.fields.policy);
                    fd.append('signature', response.data.fields.signature);
                    axios.post(response.data.url,fd,{
                        headers:{
                            'Content-Type':undefined
                        }
                    })
                    .then(response=>{
                        console.log(response);
                             axios.post('https://api.resolabindia.com/core/register/', {
                            uid: this.state.userID,
                            name: this.state.name,
                            email: this.state.email_id,
                            profile_pic_url: awsurl+awskey,
                            registered_region: this.state.region,
                            phone_number: "+91" + this.state.phone_number,
                            date_of_birth: this.state.dob,
                            is_verified: false,
                            is_subscribed: false
                        })
                        .then((response) => {
                            console.log(response);
                            this.setState({
                                loader: false,
                                isuser: true,
                            });
                            alert("Sign up Successful!!")
                        }, (error) => {
                            this.setState({
                                loader: false
                            })
                            console.log(this.state.userID)
                            console.log(this.state.name)
                            console.log(this.state.email_id)
                            console.log("+91" + this.props.phone_number)
                            console.log(awsurl + awskey)
                            console.log(this.state.dob)
                            console.log(this.state.region)
                            console.log(error.response)
                            alert(error.response.data.non_field_errors[0] + ". Please Retry With different EmailID or Contact Team");
                        });
                    })
                    .catch((error)=>{
                        
                        this.setState({
                            loader: false
                        });
                        alert(error);
                    })
                }).catch((error)=>{
                    console.log(error);
                    
                    this.setState({
                        loader: false
                    });
                    alert(error);
                });
            })
            .catch((error)=>{
                
                this.setState({
                    loader: false
                });
                alert(error);
            });
        }
        
    }
    render(){
        if(this.state.loader===true)
        {
            return <LoadingElement/>
        }
        else if(this.state.isuser===true)
        {
            return(
                <h2>Please Click on <Link to='/login'>Login</Link> to continue</h2>
            );
        }
        else{
            return(
                <Container fluid>
                <br/>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <br />
                <h3>Hello {this.props.phone_number}!</h3>
                <p>Enter your other details.</p>
                    <Form.Group>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Full Name:
                            </Form.Label>
                            <Col>
                            <Form.Control 
                            required
                            type="text" 
                            placeholder="Full Name"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please write correct name
                            </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Email:
                            </Form.Label>
                            <Col>
                            <Form.Control 
                            required
                            type="email" 
                            placeholder="Email ID"
                            value={this.state.email_id}
                            onChange={this.handleEmailChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please write correct Email address
                            </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                         <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Password:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                type="password" 
                                placeholder="*********"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Password
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Upload Your Profile Picture:
                            </Form.Label>
                            <Form.File>
                                <Form.File.Input
                                required
                                onChange={this.handlefileChange}
                                />
                            </Form.File>
                        </Form.Row>\
                        <br/>
                        {this.state.alert?
                        <Alert variant="danger" onClose={() => this.setShow()} dismissible>
                            <Alert.Heading>Please add your profile picture</Alert.Heading>
                        </Alert>
                        :null}
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Date of Birth:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                type="date" 
                                placeholder="DD/MM/YYYY"
                                value={this.state.dob}
                                onChange={this.handleDobChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Date of Birth
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                State:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                as="Select" 
                                placeholder="Region"
                                value={this.state.region}
                                onChange={this.handleRegionChange}
                                >
                                <option selected value="">Select :</option>
                                <option>Andaman and Nicobar Islands</option>
                                <option>Andhra Pradesh</option>
                                <option>Arunachal Pradesh</option>
                                <option>Assam</option>
                                <option>Bihar</option>
                                <option>Chandigarh</option>
                                <option>Chhattisgarh</option>
                                <option>Dadra and Nagar Haveli</option>
                                <option>Daman and Diu</option>
                                <option>Delhi</option>
                                <option>Goa</option>
                                <option>Gujarat</option>
                                <option>Haryana</option>
                                <option>Himachal Pradesh</option>
                                <option>Jammu and Kashmir</option>
                                <option>Jharkhand</option>
                                <option>Karnataka</option>
                                <option>Kerala</option>
                                <option>Ladakh</option>
                                <option>Lakshadweep</option>
                                <option>Madhya Pradesh</option>
                                <option>Maharashtra</option>
                                <option>Manipur</option>
                                <option>Meghalaya</option>
                                <option>Mizoram</option>
                                <option>Nagaland</option>
                                <option>Odisha</option>
                                <option>Puducherry</option>
                                <option>Punjab</option>
                                <option>Rajasthan</option>
                                <option>Sikkim</option>
                                <option>Tamil Nadu</option>
                                <option>Telangana</option>
                                <option>Tripura</option>
                                <option>Uttar Pradesh</option>
                                <option>Uttarakhand</option>
                                <option>West Bengal</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Choose Correct State
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <br />
                </Container>
    );
        }
        
    }
}
export default DetailForm;