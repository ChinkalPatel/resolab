import React,{Component} from 'react';
import {Form,Col,Button,Container} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import Switch from "react-switch";
const cookies = new Cookies();
class InfraSeekerForm extends Component {
    constructor(props){
        super(props);
        this.state={
            is_authorized:false,
            user:"",
            pia_tp_name: "",
            job:"",
            area:0,
            other_requirements:"",
            projectname:"",
            city: "",
            state:"",
            contact_person_name:"",
            contact_person_designation:"",
            contact_person_number:"0000000000",
            contact_person_email_id:"",
            specific_facility:"",
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
    handleUserNo = event => {
      this.setState({
        user: event.target.value,
      });
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
    handleAreaChange=event=>{
      this.setState({
          area: event.target.value
      })
    }
    handleOtherRequirementsChange=event=>{
      this.setState({
          other_requirements:event.target.value
      })
    }
    handleProjectNameChange = event =>{
        this.setState({
            projectname:event.target.value
        })
    }
    handleStateChange = event =>{
      this.setState({
          state:event.target.value
      })
    }
    handleCityChange = event => {
        this.setState({
            city: event.target.value
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
    handleSpecificFacilityChange=event=>{
      this.setState({
          specific_facility:event.target.value
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
            axios.post('https://api.resolabindia.com/core/create_seeker_infraserv/', {
                user: cookies.get("phone_number"),
                job: this.state.job,
                pia_tp_name: this.state.pia_tp_name,
                total_area:this.state.area,
                oth_requirements:this.state.other_requirements,
                project: this.state.projectname,
                project_location_state: this.state.state,
                project_location_district:this.state.city,
                contact_name: this.state.contact_person_name,
                contact_phone_no: "+91"+this.state.contact_person_number,
                contact_designation: this.state.contact_person_designation,
                contact_email: this.state.contact_person_email_id,
                specific_facility:this.state.specific_facility
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
                        Required Infrastructure:
                      </Form.Label>
                      <Col>
                        <Form.Control
                            required
                            as="Select"
                            placeholder="Job"
                            value={this.state.job}
                            onChange={this.handleJobChange}
                        >
                            <option selected value="">Select:</option>
                            <option>Training Centre</option>
                            <option>Hostel</option>
                            <option value="Others in Infra">Others</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Choose correct Infrastructure
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Total Area:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Total Area"
                          value={this.state.area}
                          onChange={this.handleAreaChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Area
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        Other Requirements:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Other Requirements"
                          value={this.state.other_requirements}
                          onChange={this.handleOtherRequirementsChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Other Requirements
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
                                Proposed Location:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                as="Select" 
                                placeholder="Region"
                                value={this.state.state}
                                onChange={this.handleStateChange}
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
                    <br />
                    <Form.Row>
                      <Form.Label column="lg" lg={2}>
                        District/Block:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="City"
                          value={this.state.city}
                          onChange={this.handleCityChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Location
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
                        Contact Detail 2:
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
                        Contact Detail 3:
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
                       Contact Detail 4:
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
                        Any specific facility required:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Any Specific Facility Required"
                          value={this.state.specific_facility}
                          onChange={this.handleSpecificFacilityChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Specific Facility required or write none
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
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
export default InfraSeekerForm;