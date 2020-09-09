import React,{Component} from 'react';
import {Form,Col,Button,Container,Alert} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import LoadingElement from '../Loader';

const cookies = new Cookies();
class AdvisoryProviderForm extends Component {
    constructor(props){
        super(props);
        this.state={
            org_name: "",
            legal_status:"",
            pan_card_no:"",
            gstno:"",
            name:"",
            phoneno:"",
            address:"",
            service:"",
            presence:"",
            photourl:"",
            file1:null,
            file2:null,
            userID: cookies.get("token"),
            validated:false,
            loader:false,
            alert:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    fileChange1 = event => {
        console.log(event);
        if(event.target.files[0].size>4194304)
        {
            alert("File Size is too big!!");
            this.setState({
                file1: null
            });
        }
        else{
            this.setState({
                file1: event.target.files[0]
            });
        }
    }
    fileChange2 = event => {
        if (event.target.files[0].size > 4194304) {
            alert("File Size is too big!!");
            this.setState({
                file2: null
            });
        } else {
            this.setState({
                file2: event.target.files[0]
            });
        }
    }
    handleLegalStatusChange = event =>{
        this.setState({
            legal_status:event.target.value
        });
    }
    handleOrgNameChange = event =>{
        this.setStatus({
            org_name:event.target.value
        })
    }
    handlePanCardNoChange = event =>{
        this.setState({
            pan_card_no:event.target.value
        });
    }
    handleGSTNoChange = event =>{
        this.setState({
            gstno:event.target.value
        });
    }
    handleNameChange = event =>{
        this.setState({
            name:event.target.value
        });
    }
    handlePhoneNoChange = event =>{
        this.setState({
            phoneno:event.target.value
        });
    }
    handleAddressChange = event =>{
        this.setState({
            address:event.target.value
        });
    }
    handleServiceChange = event =>{

        console.log(event.target.value);
        this.setState({
            service:event.target.value
        });
    }
    handlePresenceChange = event =>{
        this.setState({
            presence:event.target.value
        });
    }
    handlePhotoURLChange = event =>{
        this.setState({
            photourl:event.target.value
        });
    }
    setShow = event => {
        this.setState({
            alert: false
        })
    }
    handleSubmit(event){
        console.log(event);
        const form = event.currentTarget;
        console.log(form.checkValidity());

        const fd1 = new FormData();
        const fd2 = new FormData();

        if (this.state.file1 === null || this.state.file2 === null) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                alert: true
            });
        }

        else if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                validated: true
            })
        }
        else{
                event.preventDefault();
                this.setState({
                    loader:true
                })
                console.log("file name");
                console.log(this.state.file1.name);
                axios.get('https://api.resolabindia.com/core/get_presigned_url/', {
                    params: {
                        "file_name": cookies.get("token") +"ad1"+ this.state.file1.name
                    }
                }).then((response1)=>{
                    var awsurl1 = response1.data.url;
                    var awskey1 = response1.data.fields.key;
                    var awsurl2;
                    var awskey2;
                    fd1.append('key', response1.data.fields.key);
                    fd1.append(
                        'file',
                        this.state.file1,
                        this.state.file1.name
                    );
                    fd1.append('AWSAccessKeyId', response1.data.fields.AWSAccessKeyId);
                    fd1.append('policy', response1.data.fields.policy);
                    fd1.append('signature', response1.data.fields.signature);
                    axios.post(response1.data.url, fd1, {
                        headers: {
                            'Content-Type': undefined
                        }
                    }).then((res)=>{
                        axios.get('https://api.resolabindia.com/core/get_presigned_url/', {
                            params: {
                                "file_name": cookies.get("token") + "ad2" + this.state.file2.name
                            }
                        }).then((response2) => {
                            awsurl2 = response2.data.url;
                            awskey2 = response2.data.fields.key;
                            fd2.append('key', response2.data.fields.key);
                            fd2.append(
                                'file',
                                this.state.file2,
                                this.state.file2.name
                            );
                            fd2.append('AWSAccessKeyId', response2.data.fields.AWSAccessKeyId);
                            fd2.append('policy', response2.data.fields.policy);
                            fd2.append('signature', response2.data.fields.signature);
                            axios.post(response2.data.url, fd2, {
                                headers: {
                                    'Content-Type': undefined
                                }
                            })
                        }).then((res)=>{
                            const body = {
                                user: cookies.get("phone_number"),
                                job:this.state.service,
                                org_name:this.state.org_name,
                                legal_status:this.state.legal_status,
                                pan_card_no:this.state.pan_card_no,
                                gst_no:this.state.gstno,
                                contact_name:this.state.name,
                                contact_phone_no:"+91"+this.state.phoneno,
                                address:this.state.address,
                                geo_presence:this.state.presence,
                                pic_urls: awsurl1 + awskey1+","+ awsurl2 + awskey2,
                            };
                            axios.post('https://api.resolabindia.com/core/create_provider_adalserv/', body, {
                                    headers: {
                                        'Authorization': `Token ${cookies.get("token")}`
                                    },
                                })
                                .then((response) => {
                                    console.log(response);
                                    this.setState({
                                        user: true,
                                    })
                                    alert("Successful!!");
                                }, (error) => {
                                    this.setState({
                                        loader: false
                                    })
                                    alert(error + " Please Retry");
                                    console.log("Token " + cookies.get("token"));
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                            this.setState({
                                loader: false
                            })
                             alert(error + " Please Retry");
                        })
                    }
                    ).catch((error)=>{
                        this.setState({
                            loader: false
                        })
                         alert(error + " Please Retry");
                    })
                }).catch((error)=>{
                    console.log(error);
                    this.setState({
                        loader: false
                    })
                    alert(error + " Please Retry");
                })
            }
    }
    render(){
        if(this.state.user===true)
        {
            return(
                <h2>Go to <Link to="/">Home Page</Link></h2>
            );
        }
        else if(this.state.loader===true)
        {
            return(
                <LoadingElement/>
            );
        }
        else{
            return(
                <Container fluid>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <br />
                <h3>Resource Card</h3>
                <p>Enter your details.</p>
                    <Form.Group>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Organisation Name:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional 
                                type="text" 
                                placeholder="Organisation Name"
                                value={this.state.org_name}
                                onChange={this.handleOrgNameChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Organisation Name
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Legal Status:
                            </Form.Label>
                            <Col>
                            <Form.Control 
                            required
                            as="Select" 
                            placeholder="Legal Status"
                            value={this.state.legal_status}
                            onChange={this.handleLegalStatusChange}
                            >
                                <option selected value="">Select :</option>
                                <option>Propritorship</option>
                                <option>Partnership</option>
                                <option>LLP</option>
                                <option>Company</option>
                                <option>Others</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please choose correct status
                            </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />                      
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                PAN Details:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                type="text" 
                                placeholder="PAN Card Number"
                                value={this.state.pan_card_no}
                                onChange={this.handlePanCardNoChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Pan Card Number
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                GST Details:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional 
                                type="text" 
                                placeholder="GST Number"
                                value={this.state.gstno}
                                onChange={this.handleGSTNoChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct GST Number
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Contact Detail 1:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                type="text" 
                                placeholder="Contact Person Name"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Name
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Contact Detail 2:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                type="number" 
                                placeholder="Phone Number"
                                value={this.state.phoneno}
                                onChange={this.handlePhoneNoChange}
                                pattern="[0-9]{10}"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Phone Number
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Contact Detail 3:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                type="text" 
                                placeholder="Address"
                                value={this.state.address}
                                onChange={this.handleAddressChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Address
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Service Offered:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    as="Select"
                                    placeholder="Service"
                                    value={this.state.service}
                                    onChange={this.handleServiceChange}
                                    >
                                    <option selected value="">Select :</option>
                                    <option>Proposal Development</option>
                                    <option>Content provider</option>
                                    <option>Content Translator</option>
                                    <option value="Others in Advisory">Others</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Choose Correct Service
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Geopgraphical Presence:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    as="Select"
                                    placeholder="Geographical Presence"
                                    value={this.state.presence}
                                    onChange={this.handlePresenceChange}
                                    >
                                    <option selected value="">Select :</option>
                                    <option>Outreach</option>
                                    <option>Less than 5 States</option>
                                    <option>More Than 5 & less than 10 States</option>
                                    <option>Pan India</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Choose Correct Geographical Presence
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br/>
                        {this.state.alert?
                        <Alert variant="danger" onClose={() => this.setShow()} dismissible>
                            <Alert.Heading>Please add pictures</Alert.Heading>
                        </Alert>
                        :null}
                        <br/>
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Upload Photographs:
                            </Form.Label>
                            <Col>
                                <Form.File>
                                    <Form.File.Input
                                    required
                                    onChange={this.fileChange1}
                                    />
                                </Form.File>
                                <Form.File>
                                    <Form.File.Input 
                                    required
                                    onChange={this.fileChange2}
                                    />
                                </Form.File>
                                <Form.Control.Feedback type="invalid">
                                    Upload photos
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Container>
            );
        }    
    }
}
export default AdvisoryProviderForm;