import React,{Component} from 'react';
import {Jumbotron,Card,Row,Col,ListGroup} from 'react-bootstrap';
import Cookies from "universal-cookie";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {Link} from 'react-router-dom';
class InfraSeekerDetails extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        // console.log(this.state.cId);
        // const cookies = new Cookies();
        // axios.get(`https://api.resolabindia.com/core/get_user_profile/${this.props.location.state.cId}/`, {
        //         headers: {
        //             'Authorization': `Token ${cookies.get("token")}`
        //         }
        // })
        // .then((response) => {
        //     console.log(response)
        //     this.setState({
        //         loader:false,
        //         date_of_birth:response.data.date_of_birth ,
        //         email: response.data.email,
        //         name: response.data.name,
        //         phone_number: response.data.phone_number,
        //         profile_pic_url: response.data.profile_pic_url,
        //         registered_region: response.data.registered_region,
        //     });
        // }, (error) => {
        //     console.log(error);
        //     this.setState({
        //         loader:false,
        //         error:true
        //     })
        // });
    }
    render(){
        const cookies = new Cookies();
        var object = this.props.location.state.cObject;
        console.log(object);
        if (this.props.location.state.service === true || object.user.id == cookies.get("id")) {
                return(
            <Jumbotron fluid style={{backgroundColor:"white"}}>
                <Row style={{ width: '100%' }}>
                    <Col lg={1}></Col>
                    <Col lg={3}>
                        <Card style={{ width: '100%' }}>
                        <LazyLoadImage 
                        variant="top" 
                        src={object.user.profile_pic_url} 
                        style={{ width: "100%", height: "auto" }}
                        effect="blur"
                        alt="Error image can't be loaded"
                        />
                        <Card.Body>
                            <Card.Header as="h4">{object.user.name}</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Phone Number: {object.user.phone_number}</ListGroup.Item>
                                <ListGroup.Item>Email: {object.user.email} </ListGroup.Item>
                                <ListGroup.Item>Date of Birth: {object.user.date_of_birth} </ListGroup.Item>
                                <ListGroup.Item>Registered Region: {object.user.registered_region} </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Header as="h4">Services Required</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Infra Category: {object.job.category.category_name}</ListGroup.Item>
                                <ListGroup.Item>Infra Name: {object.job.job_name}</ListGroup.Item>
                                <ListGroup.Item>PIA/TP Name: {object.pia_tp_name}</ListGroup.Item>
                                <ListGroup.Item>Total Area: {object.total_area}</ListGroup.Item>
                                <ListGroup.Item>Other Requirements: {object.oth_requirements}</ListGroup.Item>
                                <ListGroup.Item>Specific Requirements: {object.specific_facility}</ListGroup.Item>
                                <ListGroup.Item>Project: {object.project}</ListGroup.Item>
                                <ListGroup.Item>Project Location: {object.project_location_district}, {object.project_location_state}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3}>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Header as="h4">Contact Details</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Name: {object.contact_name}</ListGroup.Item>
                                <ListGroup.Item>Phone Number: {object.contact_phone_no}</ListGroup.Item>
                                <ListGroup.Item>EmailID: {object.contact_email}</ListGroup.Item>
                                <ListGroup.Item>Designation: {object.contact_designation}</ListGroup.Item>
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
export default InfraSeekerDetails;