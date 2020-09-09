import React,{Component} from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";
import {Jumbotron,Container,CardDeck,Form,Button,Row,Col,Card} from 'react-bootstrap';
 
import CardTemplateForProvider from './CardTemplateForProvider';
import CardTemplateForSeeker from './CardTemplateForSeeker';
import LoadingElement from './Loader';

class People extends Component{
    constructor(){
        super();
        this.state={
            seeker_result:null,
            total_seeker:null,
            provider_result:null,
            total_provider:null,
            pdata:false,
            sdata:false,
            error:false,
            searchTerm:'',
            select:"All",
            plan_id:""
        }
        this.dynamicSearch = this.dynamicSearch.bind(this)
        this.editSearchTerm = this.editSearchTerm.bind(this)
    }

    componentDidMount() {
        const cookies = new Cookies();
        axios.get(`https://api.resolabindia.com/core/get_user_profile/${cookies.get('id')}/`, {
            headers: {
                'Authorization': `Token ${cookies.get("token")}`
            }
        }).then((res) => {
            console.log(res);
            this.setState({
                is_subscribed: res.data.is_subscribed,
                plan_id:res.data.plan_id
            })
        }).catch((err) => {
            this.setState({
                loader: false,
                error: true
            })
        })
        axios.get("https://api.resolabindia.com/core/list_seekers_people/", {
            headers: {
                'Authorization': `Token ${cookies.get("token")}`
            }
        }).then((response) => {
            console.log(cookies.get("token"));
            console.log(response.data)
            this.setState({
                seeker_result:response.data,
                total_seeker:response.data,
                sdata:true
            })
        }, (error) => {
            console.log(cookies.get("token"));
            console.log(error);
            this.setState({
                sdata: false,
                error:true
            })
        });

        axios.get("https://api.resolabindia.com/core/list_providers_people/", {
            headers: {
                'Authorization': `Token ${cookies.get("token")}`
            }
        }).then((response) => {
            console.log(cookies.get("token"));
            console.log(response.data);
            this.setState({
                provider_result: response.data,
                total_provider: response.data,
                pdata:true
            })
        }, (error) => {
            console.log(cookies.get("token"));
            console.log(error);
            this.setState({
                pdata: false,
                error:true
            })
        });
    }
    editSearchTerm = (event) =>{
        this.setState({
            searchTerm:event.target.value
        })
    }
    selectOption = (event)=>{
       this.setState({
           select: event.target.value
       })
    }
    dynamicSearch = (event)=>{
        event.preventDefault();

        this.setState({
            seeker_result : this.state.total_seeker.filter(
            data => data.job.category.category_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) 
            || data.job.job_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            || data.job_location.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        )
        })
        this.setState({
            provider_result : this.state.total_provider.filter(
            data => data.current_work_state.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            || data.job.job_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            || data.user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        )
        })
    }
    render(){
        if(this.state.error===true){
            return(
            <>
            <br />
            <h1>There is an error!Please try to Signup and Login first.</h1>
            </>
            );
        }
        else if(this.state.pdata===true && this.state.sdata===true){
        const seeker_list = this.state.seeker_result.map((seeker)=>
            <CardTemplateForSeeker 
            key ={seeker.id}  
            cCategory={seeker.job.category.category_name} 
            cSubCategory={seeker.job.job_name} 
            cLoc={seeker.job_location} 
            cSalaryUpper={seeker.max_salary} 
            cSalaryLower={seeker.min_salary}
            cId={seeker.user.id}
            additional_req={seeker.additional_req}
            designation={seeker.designation}
            employee_id={seeker.employee_id}
            experience_details={seeker.experience_details}
            job_location={seeker.job_location}
            joining_requirement={seeker.joining_requirement}
            legal_status={seeker.legal_status}
            manager_contact_number={seeker.manager_contact_number}
            manager_designation={seeker.manager_designation}
            manager_email_id={seeker.manager_email_id}
            max_salary={seeker.max_salary}
            min_salary={seeker.min_salary}
            pia_tp_name={seeker.pia_tp_name}
            pref_qualification={seeker.pref_qualification}
            qualification={seeker.qualification}
            reporting_manager_name={seeker.reporting_manager_name}
            cImg={seeker.user.profile_pic_url}
            plan_id={this.state.plan_id}
            />
        );
        const provider_list = this.state.provider_result.map((provider)=>
            <CardTemplateForProvider 
            key ={provider.id} 
            cName={provider.user.name}
            cPosition={provider.job.job_name}
            cLoc={provider.current_work_state}
            cExp = {provider.exp_skill_industry}
            cId={provider.user.id}
            cSalary={provider.current_salary}
            eSalary={provider.expected_salary}
            aadhar_no={provider.aadhar_no}
            achievement={provider.achievement}
            current_work_district={provider.current_work_district}
            current_work_state={provider.current_work_state}
            educational_qualification={provider.educational_qualification}
            exp_skill_industry={provider.exp_skill_industry}
            exp_non_skill={provider.exp_non_skill}
            project_name={provider.project_name}
            designation_1={provider.designation_1}
            organization_1_name={provider.organization_1_name}
            total_tenure_1={provider.total_tenure_1}
            designation_2={provider.designation_2}
            organization_2_name={provider.organization_2_name}
            total_tenure_2={provider.total_tenure_2}
            designation_3={provider.designation_3}
            organization_3_name={provider.organization_3_name}
            total_tenure_3={provider.total_tenure_3}
            cImg={provider.user.profile_pic_url}
            plan_id={this.state.plan_id}
            />
        );
        return (
          <Jumbotron fluid style={{ margin: "0px" }}>
            <div>
            <Form onSubmit={this.dynamicSearch}>
                <Row style={{width:"90%",margin:"0px"}}>
                 <Col xs={2} style={{paddingRight:"0px"}}>
                <Form.Group>
                    <Form.Control 
                    as="Select"
                    value={this.state.select}
                    onChange={this.selectOption}
                    >
                    <option>All</option>
                    <option>Available Resources</option>
                    <option>Required Resources</option>
                    </Form.Control>
                </Form.Group>
                </Col>
                <Col xs={8} style={{paddingRight:"0px"}}>
                <Form.Group>
                    <Form.Control 
                    type="text" 
                    placeholder="Search by Name, Role or Location" 
                    value={this.state.searchTerm} 
                    onChange={this.editSearchTerm}
                    />
                </Form.Group>
                </Col>
                <Col xs={2} style={{paddingLeft:"5px",fontSize:"100%"}}>
                <Button variant="primary" type="submit">
                    Search
                </Button>
                </Col>
                </Row>
            </Form>
            </div>
            {(()=>{
                switch (this.state.select){
                    case "All":
                    return (
                    <Container>
                        <h1>Required Resources</h1>
                        <CardDeck>{this.state.seeker_result.length?seeker_list:
                        <Container>
                            <Card style={{ width: '18rem',margin:'auto' }}>
                                <h3>No data available</h3>
                            </Card>
                        </Container>
                        }</CardDeck>
                        <h1>Available Resources</h1>
                        <CardDeck>{this.state.provider_result.length?provider_list:
                        <Container>
                            <Card style={{ width: '18rem',margin:'auto' }}>
                                <h3>No data available</h3>
                            </Card>
                        </Container>
                        }</CardDeck>
                    </Container>);
                    case "Available Resources":
                    return(
                    <Container>
                        <h1>Available Resources</h1>
                        <CardDeck>{this.state.provider_result.length?provider_list:
                        <Container>
                            <Card style={{ width: '18rem',margin:'auto' }}>
                                <h3>No data available</h3>
                            </Card>
                        </Container>
                        }</CardDeck>
                    </Container>
                    );
                    case "Required Resources":
                    return(
                    <Container>
                        <h1>Required Resources</h1>
                        <CardDeck>{this.state.seeker_result.length?seeker_list:
                        <Container>
                            <Card style={{ width: '18rem',margin:'auto' }}>
                                <h3>No data available</h3>
                            </Card>
                        </Container>
                        }</CardDeck>
                    </Container>
                    );
                    default:
                    return null;
                }
            })()}
          </Jumbotron>
        );
        }

        else{
            return(<LoadingElement />);
        }
    }
}

export default People;