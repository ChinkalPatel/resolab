import React,{Component} from 'react';
import {Form,Col,Button,Container} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import Switch from "react-switch";
const cookies = new Cookies();
class AdvisorySeekerForm extends Component {
    constructor(props){
        super(props);
        this.state={
            is_authorized:false,
            user:"",
            pia_tp_name: "",
            job:"",
            projectname:"",
            location: "",
            reporting_manager_name:"",
            manager_designation:"",
            manager_contact_number:"0000000000",
            manager_email_id:"",
            contact_person_name:"",
            contact_person_designation:"",
            contact_person_number:"0000000000",
            contact_person_email_id:"",
            isuser:false,
            validated:false,
            checked:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleIsAuthorizedChange = this.handleIsAuthorizedChange.bind(this)
    }
    handleIsAuthorizedChange = checked =>{
        this.setState({
            checked
        });
        console.log(checked);
    }
    handlePiaTpName=event=>{
        this.setState({
            pia_tp_name: event.target.value,
        });
    }
    handleJobChange = event => {
        this.setState({
            job: event.target.value
        })
    }
    handleProjectNameChange = event =>{
        this.setState({
            projectname:event.target.value
        })
    }
    handleLocationChange = event => {
        this.setState({
            location: event.target.value
        });
    }
    handleReportingManagerNameChange = event => {
        this.setState({
            reporting_manager_name: event.target.value
        });
    }
    handleManagerDesignationChange = event => {
        this.setState({
            manager_designation: event.target.value
        });
    }
    handleManagerContactNumberChange = event => {
        this.setState({
            manager_contact_number: event.target.value
        });
    }
    handleManagerEmailIdChange = event => {
        this.setState({
            manager_email_id: event.target.value
        });
    }
    handleContactPersonNameChange = event =>{
        this.setState({
            contact_person_name: event.target.value
        });
    }
    handleContactPersonDesignationChange = event =>{
        this.setState({
            contact_person_designation: event.target.value
        });
    }
    handleContactPersonNumberChange= event=>{
        this.setState({
            contact_person_number: event.target.value
        });
    }
    handleContactPersonEmailChange= event=>{
        this.setState({
            contact_person_email_id: event.target.value
        });
    }

    handleSubmit(event){
        console.log(event);
        const form = event.currentTarget;
        console.log(form.checkValidity());
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                validated: true
            })
        }
        else{
            event.preventDefault();
            axios.post('https://api.resolabindia.com/core/create_seeker_adalserv/', {
                user: cookies.get("phone_number"),
                job: this.state.job,
                pia_tp_name: this.state.pia_tp_name,
                project: this.state.projectname,
                project_location: this.state.location,
                contact_name: this.state.contact_person_name,
                contact_phone_no: "+91"+this.state.contact_person_number,
                contact_designation: this.state.contact_person_designation,
                contact_email: this.state.contact_person_email_id,
                reporting_manager_name: this.state.reporting_manager_name,
                manager_designation: this.state.manager_designation,
                manager_contact_number:"+91"+this.state.manager_contact_number,
                manager_email_id: this.state.manager_email_id
            },{
                headers:{
                    'Authorization': `Token ${cookies.get("token")}`
                }
            })
            .then((response) => {
                console.log(response);
                this.setState({
                    isuser:true,
                })
                alert("Successful!!");
            }, (error) => {
                console.log(`Token ${cookies.get("token")}`);
                console.log(error)
                alert(error+". Please Retry");
            });
        }
    }
    render(){
        if(this.state.isuser===true)
        {
            return(
                <h2>Go to <Link to='/'>Home Page</Link></h2>
            );
        }
        else{
            return (
              <>
                <br />
                <h3>Resource Card</h3>
                <p>Enter your details.</p>
                <div>
                  <label>
                    <span><h6>Are you authorized ?{" "}</h6></span>
                    <Switch
                      onChange={this.handleIsAuthorizedChange}
                      checked={this.state.checked}
                      uncheckedIcon={false}
                      checkedIcon={false}
                    />
                  </label>
                </div>
              { this.state.checked &&
              <Container fluid>
                <Form
                  noValidate
                  validated={this.state.validated}
                  onSubmit={this.handleSubmit}
                  checkedIcon={false}
                  uncheckedIcon={false}
                >
                  <Form.Group>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        PIA/TP Name:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="PIA/TP name"
                          value={this.state.pia_tp_name}
                          onChange={this.handlePiaTpName}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please write correct PIA/TP name
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Service Required:
                      </Form.Label>
                      <Col>
                        <Form.Control
                            required
                            as="Select"
                            placeholder="Job"
                            value={this.state.job}
                            onChange={this.handleJobChange}
                        >
                            <option selected value="">Select :</option>
                            <option>Proposal Development</option>
                            <option>Content provider</option>
                            <option>Content Translator</option>
                            <option value="Others in Advisory">Others</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Choose correct Service
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Project:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Project Name"
                          value={this.state.projectname}
                          onChange={this.handleProjectNameChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Project Name
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Project Location:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Location"
                          value={this.state.location}
                          onChange={this.handleLocationChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Location
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Contact Person Name:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Contact Person Name"
                          value={this.state.contact_person_name}
                          onChange={this.handleContactPersonNameChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Name
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Contact Person Designation:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Contact Person Designation"
                          value={this.state.contact_person_designation}
                          onChange={this.handleContactPersonDesignationChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Designation
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Contact Person Number:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="tel"
                          placeholder="Contact Person Phone Number"
                          value={this.state.contact_person_number}
                          onChange={this.handleContactPersonNumberChange}
                          pattern="[0-9]{10}"
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Contact Number
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                       Contact Person Email ID:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          optional
                          type="email"
                          placeholder="Contact Person Email ID"
                          value={this.state.contact_person_email_id}
                          onChange={this.handleContactPersonEmailChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Email ID
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Reporting Manager Name:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          optional
                          type="text"
                          placeholder="Reporting Manager Name"
                          value={this.state.reporting_manager_name}
                          onChange={this.handleReportingManagerNameChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Name
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Reporting Manager Designation:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          optional
                          type="text"
                          placeholder="Manager Designation"
                          value={this.state.manager_designation}
                          onChange={this.handleManagerDesignationChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Designation
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Reporting Manager Contact Number:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          optional
                          type="tel"
                          placeholder="Manager Contact Number"
                          value={this.state.manager_contact_number}
                          onChange={this.handleManagerContactNumberChange}
                          pattern="[0-9]{10}"
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Contact Number
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                       Reporting Manager Email ID:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          optional
                          type="email"
                          placeholder="Manager Email ID"
                          value={this.state.manager_email_id}
                          onChange={this.handleManagerEmailIdChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Email ID
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Container>}
              </>
            );
        }
        
    }
}
export default AdvisorySeekerForm;