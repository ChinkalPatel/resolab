import React,{Component} from 'react';
import {Jumbotron,Card,Row,Col,ListGroup} from 'react-bootstrap';
import axios from 'axios';
import Cookies from "universal-cookie";
import LoadingElement from './Loader';
import { LazyLoadImage } from "react-lazy-load-image-component";
import {Link} from 'react-router-dom';
class SeekerDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            date_of_birth: "",
            email:"",
            name:"",
            phone_number:"",
            profile_pic_url:"",
            registered_region:"",
            loader:true,
            error:false
        }
    }
    componentDidMount() {
        const cookies = new Cookies();
        axios.get(`https://api.resolabindia.com/core/get_user_profile/${this.props.location.state.cId}/`, {
            headers: {
                'Authorization': `Token ${cookies.get("token")}`
            }
        })
        .then((response) => {
            console.log(response);
            this.setState({
                loader:false,
                date_of_birth: response.data.date_of_birth,
                email: response.data.email,
                name: response.data.name,
                phone_number: response.data.phone_number,
                profile_pic_url: response.data.profile_pic_url,
                registered_region: response.data.registered_region,
            });
        }, (error) => {
            console.log(error);
            this.setState({
                error:true,
                loader:false
            })
        });
    }
    render(){
        const cookies = new Cookies();
        if(this.state.loader === true)
        return <LoadingElement/>
        if(this.state.error===true)
        return(
            <>
            <br/>
            <h1>There is an error</h1>
            </>
        )
        else if (this.props.location.state.trainer && this.props.location.state.cCategory==="Trainer")
        {
            return(
            <Jumbotron fluid style={{backgroundColor:"white"}}>
                <Row style={{ width: '100%' }}>
                <Col lg={1}></Col>
                    <Col lg={3}>
                        <Card style={{ width: '100%' }}>
                        <LazyLoadImage 
                        variant="top" 
                        src={this.state.profile_pic_url} 
                        style={{ width: "100%", height: "auto" }}
                        effect="blur"
                        alt="Error image can't be loaded"
                        />
                        <Card.Body>
                            <Card.Header as="h4">{this.state.name}</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Phone Number: {this.state.phone_number}</ListGroup.Item>
                                <ListGroup.Item>Email: {this.state.email} </ListGroup.Item>
                                <ListGroup.Item>Date of Birth: {this.state.date_of_birth} </ListGroup.Item>
                                <ListGroup.Item>Registered Region: {this.state.registered_region} </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Header as="h4">Post: {this.props.location.state.designation}</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Qualification Required: {this.props.location.state.qualification}</ListGroup.Item>
                                <ListGroup.Item>Preffered Qualification: {this.props.location.state.pref_qualification}</ListGroup.Item>
                                <ListGroup.Item>Additional Requirements: {this.props.location.state.additional_req} </ListGroup.Item>
                                <ListGroup.Item>Experience Required: {this.props.location.state.experience_details} Years</ListGroup.Item>
                                <ListGroup.Item>Joining Requirements: {this.props.location.state.joining_requirement} </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3}>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Header as="h4">Legal Status: {this.props.location.state.legal_status}</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>PIA/TP Name: {this.props.location.state.pia_tp_name}</ListGroup.Item>
                                <ListGroup.Item>Employee ID: {this.props.location.state.employee_id}</ListGroup.Item>
                                <ListGroup.Item>Job Location: {this.props.location.state.job_location}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={1}></Col>
                </Row>
            </Jumbotron>
        );
        }
        else if (this.props.location.state.cId==cookies.get("id"))
        {
            return(
            <Jumbotron fluid style={{backgroundColor:"white"}}>
                <Row style={{ width: '100%' }}>
                <Col lg={1}></Col>
                    <Col lg={3}>
                        <Card style={{ width: '100%' }}>
                        <LazyLoadImage 
                        variant="top" 
                        src={this.state.profile_pic_url} 
                        style={{ width: "100%", height: "auto" }}
                        effect="blur"
                        alt="Error image can't be loaded"
                        />
                        <Card.Body>
                            <Card.Header as="h4">{this.state.name}</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Phone Number: {this.state.phone_number}</ListGroup.Item>
                                <ListGroup.Item>Email: {this.state.email} </ListGroup.Item>
                                <ListGroup.Item>Date of Birth: {this.state.date_of_birth} </ListGroup.Item>
                                <ListGroup.Item>Registered Region: {this.state.registered_region} </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Header as="h4">Post: {this.props.location.state.cSub}</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Qualification Required: {this.props.location.state.qualification}</ListGroup.Item>
                                <ListGroup.Item>Preffered Qualification: {this.props.location.state.pref_qualification}</ListGroup.Item>
                                <ListGroup.Item>Additional Requirements: {this.props.location.state.additional_req} </ListGroup.Item>
                                <ListGroup.Item>Experience Required: {this.props.location.state.experience_details} Years</ListGroup.Item>
                                <ListGroup.Item>Joining Requirements: {this.props.location.state.joining_requirement} </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3}>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Header as="h4">Legal Status: {this.props.location.state.legal_status}</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>PIA/TP Name: {this.props.location.state.pia_tp_name}</ListGroup.Item>
                                <ListGroup.Item>Employee ID: {this.props.location.state.employee_id}</ListGroup.Item>
                                <ListGroup.Item>Job Location: {this.props.location.state.job_location}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={1}></Col>
                </Row>
            </Jumbotron>
        );
        }
        else if (this.props.location.state.operation && (this.props.location.state.cCategory === "Operation" || this.props.location.state.cCategory === "Finance" || this.props.location.state.cCategory === "Quality")) {
            return(
            <Jumbotron fluid style={{backgroundColor:"white"}}>
                <Row style={{ width: '100%' }}>
                <Col lg={1}></Col>
                    <Col lg={3}>
                        <Card style={{ width: '100%' }}>
                        <LazyLoadImage 
                        variant="top" 
                        src={this.state.profile_pic_url} 
                        style={{ width: "100%", height: "auto" }}
                        effect="blur"
                        alt="Error image can't be loaded"
                        />
                        <Card.Body>
                            <Card.Header as="h4">{this.state.name}</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Phone Number: {this.state.phone_number}</ListGroup.Item>
                                <ListGroup.Item>Email: {this.state.email} </ListGroup.Item>
                                <ListGroup.Item>Date of Birth: {this.state.date_of_birth} </ListGroup.Item>
                                <ListGroup.Item>Registered Region: {this.state.registered_region} </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Header as="h4">Post: {this.props.location.state.cSub}</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Qualification Required: {this.props.location.state.qualification}</ListGroup.Item>
                                <ListGroup.Item>Preffered Qualification: {this.props.location.state.pref_qualification}</ListGroup.Item>
                                <ListGroup.Item>Additional Requirements: {this.props.location.state.additional_req} </ListGroup.Item>
                                <ListGroup.Item>Experience Required: {this.props.location.state.experience_details} Years</ListGroup.Item>
                                <ListGroup.Item>Joining Requirements: {this.props.location.state.joining_requirement} </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3}>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Header as="h4">Legal Status: {this.props.location.state.legal_status}</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>PIA/TP Name: {this.props.location.state.pia_tp_name}</ListGroup.Item>
                                <ListGroup.Item>Employee ID: {this.props.location.state.employee_id}</ListGroup.Item>
                                <ListGroup.Item>Job Location: {this.props.location.state.job_location}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={1}></Col>
                </Row>
            </Jumbotron>
        );
        }
        else{
            return (<>
                        <h1>You are not allowed to view details.<br/>Go to <Link to="/payment">payment</Link> Page.</h1>
                    </>);
        }
    }
    
}
export default SeekerDetails;