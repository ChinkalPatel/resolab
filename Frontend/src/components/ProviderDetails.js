import React,{Component} from 'react';
import {Jumbotron,Card,Row,Col,ListGroup,Container} from 'react-bootstrap';
import axios from 'axios';
import Cookies from "universal-cookie";
import LoadingElement from './Loader';
import {Link} from 'react-router-dom'
import { LazyLoadImage } from "react-lazy-load-image-component";
class ProviderDetails extends Component{
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
    componentDidMount(){
        console.log(this.props.location.state.cId);
        const cookies = new Cookies();
        axios.get(`https://api.resolabindia.com/core/get_user_profile/${this.props.location.state.cId}/`, {
                headers: {
                    'Authorization': `Token ${cookies.get("token")}`
                }
        })
        .then((response) => {
            console.log(response)
            this.setState({
                loader:false,
                date_of_birth:response.data.date_of_birth ,
                email: response.data.email,
                name: response.data.name,
                phone_number: response.data.phone_number,
                profile_pic_url: response.data.profile_pic_url,
                registered_region: response.data.registered_region,
            });
        }, (error) => {
            console.log(error);
            this.setState({
                loader:false,
                error:true
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
        else if (this.props.location.state.cId==cookies.get("id")){
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
                                <ListGroup.Item>Aadhar Number: {this.props.location.state.aadhar_no}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Header as="h4">Achievements and Experiences</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Achievements: {this.props.location.state.achievement?this.props.location.state.achievement:"None"}</ListGroup.Item>
                                <ListGroup.Item>Previous Experience: {this.props.location.state.exp_skill_industry} Years</ListGroup.Item>
                                <ListGroup.Item>Project Name: {this.props.location.state.project_name}</ListGroup.Item>
                                <ListGroup.Item>Non-Skill Experience: {this.props.location.state.exp_non_skill} Years</ListGroup.Item>
                                <ListGroup.Item>
                                    Designation 1: {this.props.location.state.designation_1}
                                <br/>
                                    Organization 1: {this.props.location.state.organization_1_name}
                                <br/>
                                    Total Tenure 1: {this.props.location.state.total_tenure_1} Years
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Designation 2: {this.props.location.state.designation_2}
                                <br/>
                                    Organization 2: {this.props.location.state.organization_2_name}
                                <br/>
                                    Total Tenure 2: {this.props.location.state.total_tenure_2} Years
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Designation 3: {this.props.location.state.designation_3}
                                <br/>
                                    Organization 3: {this.props.location.state.organization_3_name}
                                <br/>
                                    Total Tenure 3: {this.props.location.state.total_tenure_3} Years
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3}>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Header as="h4">Resource Details</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Working District: {this.props.location.state.current_work_district}</ListGroup.Item>
                                <ListGroup.Item>Working State: {this.props.location.state.current_work_state}</ListGroup.Item>
                                <ListGroup.Item>Project Name: {this.props.location.state.project_name}</ListGroup.Item>
                                <ListGroup.Item>Educational Qualification: {this.props.location.state.educational_qualification}</ListGroup.Item>
                                <ListGroup.Item>Current Salary: {this.props.location.state.cSalary}</ListGroup.Item>
                                <ListGroup.Item>Expected Salary: {this.props.location.state.eSalary}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={1}></Col>
                </Row>
            </Jumbotron>
        );
        }
        else if (this.props.location.state.tp) {
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
                                <ListGroup.Item>Aadhar Number: {this.props.location.state.aadhar_no}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Header as="h4">Achievements and Experiences</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Achievements: {this.props.location.state.achievement?this.props.location.state.achievement:"None"}</ListGroup.Item>
                                <ListGroup.Item>Previous Experience: {this.props.location.state.exp_skill_industry} Years</ListGroup.Item>
                                <ListGroup.Item>Project Name: {this.props.location.state.project_name}</ListGroup.Item>
                                <ListGroup.Item>Non-Skill Experience: {this.props.location.state.exp_non_skill} Years</ListGroup.Item>
                                <ListGroup.Item>
                                    Designation 1: {this.props.location.state.designation_1}
                                <br/>
                                    Organization 1: {this.props.location.state.organization_1_name}
                                <br/>
                                    Total Tenure 1: {this.props.location.state.total_tenure_1} Years
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Designation 2: {this.props.location.state.designation_2}
                                <br/>
                                    Organization 2: {this.props.location.state.organization_2_name}
                                <br/>
                                    Total Tenure 2: {this.props.location.state.total_tenure_2} Years
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Designation 3: {this.props.location.state.designation_3}
                                <br/>
                                    Organization 3: {this.props.location.state.organization_3_name}
                                <br/>
                                    Total Tenure 3: {this.props.location.state.total_tenure_3} Years
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3}>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Header as="h4">Resource Details</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Working District: {this.props.location.state.current_work_district}</ListGroup.Item>
                                <ListGroup.Item>Working State: {this.props.location.state.current_work_state}</ListGroup.Item>
                                <ListGroup.Item>Project Name: {this.props.location.state.project_name}</ListGroup.Item>
                                <ListGroup.Item>Educational Qualification: {this.props.location.state.educational_qualification}</ListGroup.Item>
                                <ListGroup.Item>Current Salary: {this.props.location.state.cSalary}</ListGroup.Item>
                                <ListGroup.Item>Expected Salary: {this.props.location.state.eSalary}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={1}></Col>
                </Row>
            </Jumbotron>
        );
        }
        else
        {
            return (<>
                        <h1>You are not allowed to view details.<br/>Go to <Link to="/payment">payment</Link> Page.</h1>
                    </>);
        }
    }
    
}
export default ProviderDetails;