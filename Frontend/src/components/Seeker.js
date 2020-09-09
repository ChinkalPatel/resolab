import React,{Component} from 'react';
import {Form,Col,Button,Container} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import Switch from "react-switch";
const cookies = new Cookies();
class SeekerForm extends Component{
    constructor(props){
        super(props);
        this.state={
            pia_tp_name: "",
            legal_status: "",
            is_authorized:false,
            designation: "",
            employee_id:"",
            location: "",
            reporting_manager_name:"",
            manager_designation:"",
            manager_contact_number:"0000000000",
            manager_email_id:"",
            qualification: "",
            pref_qualification: "",
            additional_req: "",
            is_exp_required: false,
            experience_details: "",
            min_salary:0,
            max_salary:0,
            joining_requirements:"",
            job_location:"",
            userno:"",
            job:"",
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
    handleLegalStatusChange = event => {
        this.setState({
            legal_status: event.target.value
        });
    }
    handleDesignationChange = event => {
        this.setState({
            designation: event.target.value
        });
    }
    handleEmployeeIdChange = event =>{
        this.setState({
            employee_id:event.target.value
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
    handleQualificationChange = event => {
        this.setState({
            qualification: event.target.value
        })
    }
    handlePrefQuaificationChange = event => {
        this.setState({
            pref_qualification: event.target.value
        })
    }
    handleAdditionalReqChange = event => {
        this.setState({
            additional_req: event.target.value
        })
    }
    handleIsExperienceReqChange = event => {
        this.setState({
            is_exp_required: event.target.value
        })
    }
    handleExperienceDetailsChange = event => {
        this.setState({
            experience_details: event.target.value
        })
    }
    handleMinSalaryChange = event => {
        this.setState({
            min_salary: event.target.value
        })
    }
    handleMaxSalaryChange = event => {
        this.setState({
            max_salary: event.target.value
        })
    }
    handleJoiningRequirementChange = event => {
        this.setState({
            joining_requirements: event.target.value
        })
    }
    handleAdditionalReqChange = event => {
        this.setState({
            additional_req: event.target.value
        })
    }
    handleJobLocChange = event => {
        this.setState({
            job_location: event.target.value
        })
    }
    handleUserChange = event => {
        this.setState({
            userno: event.target.value
        })
    }
    handleJobChange = event => {
        this.setState({
            job: event.target.value
        })
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
            axios.post('https://api.resolabindia.com/core/create_seeker_people/', {
                user: "+91"+this.state.userno,
                job: this.state.job,
                pia_tp_name: this.state.pia_tp_name,
                legal_status: this.state.legal_status,
                is_authorized:true,
                designation: this.state.designation,
                employee_id: this.state.employee_id,
                location: this.state.location,
                reporting_manager_name:this.state.reporting_manager_name,
                manager_designation:this.state.manager_designation,
                manager_contact_number:"+91"+this.state.manager_contact_number,
                manager_email_id:this.state.manager_email_id,
                qualification: this.state.qualification,
                pref_qualification: this.state.pref_qualification,
                additional_req: this.state.additional_req,
                is_exp_required:this.state.is_exp_required,
                experience_details: this.state.experience_details,
                min_salary: Number(this.state.min_salary),
                max_salary: Number(this.state.max_salary),
                joining_requirement: this.state.joining_requirements,
                job_location: this.state.job_location,
                is_verified:false
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
                alert(response);
            }, (error) => {
                console.log("+91"+this.state.userno);
                console.log(this.state.job)
                console.log(this.state.pia_tp_name);
                console.log(this.state.legal_status)
                console.log(this.state.is_authorized)
                console.log(this.state.designation)
                console.log(this.state.employee_id)
                console.log(this.state.location)
                console.log(this.state.reporting_manager_name)
                console.log(this.state.manager_designation)
                console.log("+91"+this.state.manager_contact_number)
                console.log(this.state.manager_email_id)
                console.log(this.state.qualification)
                console.log(this.state.pref_qualification)
                console.log(this.state.additional_req)
                console.log(this.state.is_exp_required)
                console.log( this.state.experience_details)
                console.log(this.state.min_salary)
                console.log(this.state.max_salary)
                console.log(this.state.joining_requirements)
                console.log(this.state.job_location)
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
                        Legal Status:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Legal Status"
                          value={this.state.legal_status}
                          onChange={this.handleLegalStatusChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please write correct legal status
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Designation:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Designation"
                          value={this.state.designation}
                          onChange={this.handleDesignationChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Designation
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Employee ID:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          optional
                          type="text"
                          placeholder="Employee ID"
                          value={this.state.employee_id}
                          onChange={this.handleEmployeeIdChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Employee ID
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Location:
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
                        Manager Contact Number:
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
                        Manager Email ID:
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
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Qualification Required:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Qualification"
                          value={this.state.qualification}
                          onChange={this.handleQualificationChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Qualification
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Preffered Qualification Required:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Preffered Qualification"
                          value={this.state.pref_qualification}
                          onChange={this.handlePrefQuaificationChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Qualification
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Additional Requirement:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Additional Qualification"
                          value={this.state.additional_req}
                          onChange={this.handleAdditionalReqChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Requirements
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Is Experience Required:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          as="Select"
                          placeholder="Is Experience Required"
                          value={this.state.is_exp_required}
                          onChange={this.handleIsExperienceReqChange}
                        >
                          <option>true</option>
                          <option>false</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Write Correct Value
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Experience Details:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Experience Details"
                          value={this.state.experience_details}
                          onChange={this.handleExperienceDetailsChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Requirements
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Minnimum Salary:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Minnimum Salary"
                          value={this.state.min_salary}
                          onChange={this.handleMinSalaryChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Salary
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Maximum Salary:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Maximum Salary"
                          value={this.state.max_salary}
                          onChange={this.handleMaxSalaryChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Salary
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Joining Requirements:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Joining Requirements"
                          value={this.state.joining_requirements}
                          onChange={this.handleJoiningRequirementChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Requirements
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Job Location:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Job Location"
                          value={this.state.job_location}
                          onChange={this.handleJobLocChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Job Location
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Phone Number:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="tel"
                          placeholder="Phone Number"
                          value={this.state.userno}
                          onChange={this.handleUserChange}
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
                        Job Role Required:
                      </Form.Label>
                      <Col>
                        {(() => {
                          switch (this.props.location.state.subcategory) {
                            case "trainer":
                              return (
                                <Form.Control
                                  required
                                  as="Select"
                                  placeholder="Job"
                                  value={this.state.job}
                                  onChange={this.handleJobChange}
                                >

                                  <option selected value="">Select Role:</option>
                                  <option>Domain Trainer</option>
                                  <option>English Soft Skill Trainer</option>
                                  <option>IT Trainer</option>
                                  <option>Other</option>
                                </Form.Control>
                              );
                            case "operation":
                              return (
                                <Form.Control
                                  required
                                  as="Select"
                                  placeholder="Job"
                                  value={this.state.job}
                                  onChange={this.handleJobChange}
                                >
                                  <option selected value="">Select Role:</option>
                                  <option>Centre Manager</option>
                                  <option>Mobilization Executive</option>
                                  <option>Counsellor</option>
                                  <option>Centre MIS</option>
                                  <option>MIS Executive</option>
                                  <option>State MIS</option>
                                  <option>MIS HEAD</option>
                                  <option>Mobilization Head</option>
                                  <option>State Head</option>
                                  <option>Project Manager</option>
                                  <option>Regional Head</option>
                                  <option>National Head</option>
                                  <option>Others</option>
                                </Form.Control>
                              );
                            case "quality":
                              return (
                                <Form.Control
                                  required
                                  as="Select"
                                  placeholder="Job"
                                  value={this.state.job}
                                  onChange={this.handleJobChange}
                                >
                                  <option selected value="">Select Role:</option>
                                  <option>Quality executive</option>
                                  <option>State Quality Head</option>
                                  <option>Quality Head</option>
                                  <option>Others in Quality</option>
                                </Form.Control>
                              );
                            case "finance":
                              return (
                                <Form.Control
                                  required
                                  as="Select"
                                  placeholder="Job"
                                  value={this.state.job}
                                  onChange={this.handleJobChange}
                                >
                                  <option selected value="">Select Role:</option>
                                  <option>Accountant</option>
                                  <option>Finance Executive</option>
                                  <option>Finance Head</option>
                                  <option>Others in Finance</option>
                                </Form.Control>
                              );
                            case "advisory":
                              return (
                                <Form.Control
                                  required
                                  as="Select"
                                  placeholder="Job"
                                  value={this.state.job}
                                  onChange={this.handleJobChange}
                                >
                                  <option selected value="">Select Role:</option>
                                  <option>Proposal Development</option>
                                  <option>Content provider</option>
                                  <option>Content Translator</option>
                                  <option>Others in Advisory</option>
                                </Form.Control>
                              );
                            case "infrastructure":
                              return (
                                <Form.Control
                                  required
                                  as="Select"
                                  placeholder="Job"
                                  value={this.state.job}
                                  onChange={this.handleJobChange}
                                >
                                  <option selected value="">Select Role:</option>
                                  <option>Premises for Training Centre & Hostels</option>
                                </Form.Control>
                              );
                            case "allied":
                              return (
                                <Form.Control
                                  required
                                  as="Select"
                                  placeholder="Job"
                                  value={this.state.job}
                                  onChange={this.handleJobChange}
                                >
                                  <option selected value="">Select Role:</option>
                                  <option>Catering Services</option>
                                  <option>Classroom & Hostel Furniture</option>
                                  <option>IT services</option>
                                  <option>Printing & Branding</option>
                                  <option>Others in Allied Services</option>
                                </Form.Control>
                              );
                            default:
                              return null;
                          }
                        })()}
                        <Form.Control.Feedback type="invalid">
                          Write Correct Job
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
export default SeekerForm;