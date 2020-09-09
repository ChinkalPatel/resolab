import React,{Component} from 'react';
import {Form,Col,Button,Container} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie";


const cookies = new Cookies();
class ProviderForm extends Component{
    constructor(props){
        super(props);
        this.state={
            aadharnumber: "",
            work_state: "",
            district: "",
            educational_qualification: "",
            current_salary:0,
            expected_salary:0,
            skilledexp: 0,
            project_name: "",
            nonskillexp: 0,
            organisation1:"",
            designation1:"",
            tenure1:0,
            organisation2:"",
            designation2:"",
            tenure2:0,
            organisation3:"",
            designation3:"",
            tenure3:0,
            achievement:"",
            userno: "",
            job: "",
            userID: cookies.get("token"),
            validated:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleAadharNumber = event => {
        this.setState({
            aadharnumber:event.target.value,
        });
    }
    handleWorkStateChange = event => {
        this.setState({
            work_state: event.target.value
        });
    }
    handleDistrictChange = event =>{
        this.setState({
            district: event.target.value,
        })
    }
    handleEducationalQualification = event => {
        this.setState({
            educational_qualification: event.target.value,
        })
    }
    handleCsalaryChange = event =>{
        this.setState({
            current_salary:event.target.value
        })
    }
    handleEsalaryChange = event => {
        this.setState({
            expected_salary: event.target.value
        })
    }
    handleSkillExpChange = event => {
        this.setState({
            skilledexp: event.target.value
        });
    }
    handleProjectNameChange = event => {
        this.setState({
            project_name: event.target.value
        });
    }
    handleNonSkillExp = event => {
        this.setState({
            nonskillexp: event.target.value
        })
    }
    handleOrganisation1Change = event => {
        this.setState({
            organisation1: event.target.value
        })
    }
    handleDesignation1Change = event => {
        this.setState({
            designation1: event.target.value
        })
    }
    handleTenure1Change = event => {
        this.setState({
            tenure1: event.target.value
        })
    }
    handleOrganisation2Change = event => {
        this.setState({
            organisation2: event.target.value
        })
    }
    handleDesignation2Change = event => {
        this.setState({
            designation2: event.target.value
        })
    }
    handleTenure2Change = event => {
        this.setState({
            tenure2: event.target.value
        })
    }
    handleOrganisation3Change = event => {
        this.setState({
            organisation3: event.target.value
        })
    }
    handleDesignation3Change = event => {
        this.setState({
            designation3: event.target.value
        })
    }
    handleTenure3Change = event => {
        this.setState({
            tenure3: event.target.value
        })
    }
    handleAchievementChange = event =>{
        this.setState({
            achievement:event.target.value
        })
    }
    handleUserNoChange = event => {
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
                const body = {
                    user: "+91" + this.state.userno,
                    job: this.state.job,
                    aadhar_no: this.state.aadharnumber,
                    current_work_state: this.state.work_state,
                    current_work_district: this.state.district,
                    educational_qualification: this.state.educational_qualification,
                    current_salary:this.state.current_salary,
                    expected_salary:this.state.expected_salary,
                    exp_skill_industry: this.state.skilledexp,
                    project_name: this.state.project_name,
                    exp_non_skill: this.state.nonskillexp,
                    organization_1_name: this.state.organisation1,
                    designation_1: this.state.designation1,
                    total_tenure_1: this.state.tenure1,
                    organization_2_name: this.state.organisation2,
                    designation_2: this.state.designation2,
                    total_tenure_2: this.state.tenure2,
                    organization_3_name: this.state.organisation3,
                    designation_3: this.state.designation3,
                    total_tenure_3: this.state.tenure3,
                    achievement: this.state.achievement,
                    is_verifed:false,
                };
                axios.post('https://api.resolabindia.com/core/create_provider_people/', body, {
                    headers:{
                        'Authorization': `Token ${cookies.get("token")}`
                    }, 
                })
                .then((response) => {
                    console.log(response);
                    this.setState({
                        user:true,
                    })
                    alert("Successful!!");
                }, (error) => {
                    alert(error+" Please Retry");
                    console.log("Token " + cookies.get("token"));
                    console.log(this.state.aadharnumber);
                    console.log(this.state.work_state)
                    console.log(this.state.district)
                    console.log(this.state.educational_qualification)
                    console.log(this.state.skilledexp)
                    console.log(this.state.project_name)
                    console.log(this.state.nonskillexp)
                    console.log(this.state.organisation1)
                    console.log(this.state.designation1)
                    console.log(this.state.tenure1)
                    console.log(this.state.organisation2)
                    console.log(this.state.designation2)
                    console.log(this.state.tenure2)
                    console.log(this.state.organisation3)
                    console.log(this.state.designation3)
                    console.log(this.state.tenure3)
                    console.log(this.state.achievement)
                    console.log("+91"+this.state.userno)
                    console.log(this.state.job)
                });
            }
    }
    render(){
        if(this.state.user===true)
        {
            return(
                <h2>Go to <Link to="/">Home Page</Link></h2>
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
                                Aadhar Number:
                            </Form.Label>
                            <Col>
                            <Form.Control 
                            required
                            type="text" 
                            placeholder="Aadhar Number"
                            value={this.state.aadharnumber}
                            onChange={this.handleAadharNumber}
                            pattern="[0-9]{12}"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please write correct Aadhar Number
                            </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Current Work State:
                            </Form.Label>
                            <Col>
                            <Form.Control 
                            required
                            as="Select" 
                            placeholder="Current Work State"
                            value={this.state.work_state}
                            onChange={this.handleWorkStateChange}
                            >
                                <option selected value="">Select State:</option>
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
                                Please write correct state
                            </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                               Current Work District:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                type="text" 
                                placeholder="Current Work District"
                                value={this.state.district}
                                onChange={this.handleDistrictChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct District
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Educational Qualification:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                type="text" 
                                placeholder="Educational Qualification"
                                value={this.state.educational_qualification}
                                onChange={this.handleEducationalQualification}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Qualification
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Experience in Skilled Industry (Years):
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                type="number" 
                                placeholder="Experience"
                                value={this.state.skilledexp}
                                onChange={this.handleSkillExpChange}
                                pattern = "[0-9]{1,2}"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Experience (Years)
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Current Salary:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                type="number" 
                                placeholder="Current Salary"
                                value={this.state.current_salary}
                                onChange={this.handleCsalaryChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Salary
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Expected Salary:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                type="number" 
                                placeholder="Expected Salary"
                                value={this.state.expected_salary}
                                onChange={this.handleEsalaryChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Salary
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Project Name:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                as="Select" 
                                placeholder="Project Name"
                                value={this.state.project_name}
                                onChange={this.handleProjectNameChange}
                                >
                                    <option selected value="">Select Project:</option>
                                    <option>DDUGKY</option>
                                    <option>PMKVY</option>
                                    <option>PMKK</option>
                                    <option>Others</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Project Name
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Experience in non-skilled (Years):
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                type="number" 
                                placeholder="Non-skill experience"
                                value={this.state.nonskillexp}
                                onChange={this.handleNonSkillExp}
                                pattern = "[0-9]{1,2}"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Non skill Experience
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <p>Write Maximum of 3 previous experiences</p>
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Organisation 1:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional 
                                type="text" 
                                placeholder="Organisation"
                                value={this.state.organisation1}
                                onChange={this.handleOrganisation1Change}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct organisation
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Designation 1:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional 
                                type="text" 
                                placeholder="Deisgnation"
                                value={this.state.designation1}
                                onChange={this.handleDesignation1Change}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Designation
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Total Tenure 1:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional 
                                type="number" 
                                placeholder="Total Tenure"
                                value={this.state.tenure1}
                                onChange={this.handleTenure1Change}
                                pattern = "[0-9]{1,2}"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Tenure Period
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Organisation 2:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional 
                                type="text" 
                                placeholder = "Organisation"
                                value={this.state.organisation2}
                                onChange={this.handleOrganisation2Change}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Organisation
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Designation 2:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional 
                                type="text" 
                                placeholder="Designation"
                                value={this.state.designation2}
                                onChange={this.handleDesignation2Change}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Designation
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Total Tenure 2:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional 
                                type="number" 
                                placeholder="Total Tenure"
                                value={this.state.tenure2}
                                onChange={this.handleTenure2Change}
                                pattern = "[0-9]{1,2}"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Tenure Period
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Organisation 3:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional 
                                type="text" 
                                placeholder = "Organisation"
                                value={this.state.organisation3}
                                onChange={this.handleOrganisation3Change}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Organisation
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Designation 3:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional 
                                type="text" 
                                placeholder="Designation"
                                value={this.state.designation3}
                                onChange={this.handleDesignation3Change}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Designation
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Total Tenure 3:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional 
                                type="number" 
                                placeholder="Tenure"
                                value={this.state.tenure3}
                                onChange={this.handleTenure3Change}
                                pattern = "[0-9]{1,2}"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Tenure Period
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />                       
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Achievement:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional 
                                type="text" 
                                placeholder="Achievement"
                                value={this.state.achievement}
                                onChange={this.handleAchievementChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Achievement
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
                                type="number" 
                                placeholder="Phone Number"
                                value={this.state.userno}
                                onChange={this.handleUserNoChange}
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
                                Job Role:
                            </Form.Label>
                            <Col>
                                {(()=>{
                                switch(this.props.location.state.subcategory){
                                    case "trainer":
                                    return(
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
                                    return(
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
                                    return(
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
                                    return(
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
                                    return(
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
                                    return(
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
                                    return(
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
                </Container>
            );
        }    
    }
}
export default ProviderForm;