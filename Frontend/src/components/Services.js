import React,{Component} from 'react';
import { Container, Card, CardDeck,Row,Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Cookies from "universal-cookie";
import LoadingElement from "./Loader";
import InfraProviderCard from './ServiceCard/InfraProvider';
import AlliedProvider from './ServiceCard/AlliedProvider';
import InfraSeekerCard from './ServiceCard/InfraSeeker';
import AlliedSeekerCard from './ServiceCard/AlliedSeeker';
class ServicesPage extends Component{
    constructor(){
        super();
        this.state={
            tipdata:null,
            tapdata:null,
            tisdata:null,
            tasdata:null,
            error:false,
            loader:true,
            check_data1:false,
            check_data2:false,
            check_data3:false,
            check_data4:false,
            select:"All",
            searchTerm:"",
            ipdata:null,
            apdata:null,
            isdata:null,
            asdata:null,
            plan_id:""
        }
        this.dynamicSearch = this.dynamicSearch.bind(this);
    }
    componentDidMount(){
        const cookies = new Cookies();
        axios.get(`https://api.resolabindia.com/core/get_user_profile/${cookies.get('id')}/`, {
            headers: {
                'Authorization': `Token ${cookies.get("token")}`
            }
        }).then((res) => {
            console.log(res);
            this.setState({
                plan_id: res.data.plan_id
            })
        }).catch((err) => {
            this.setState({
                loader: false,
                error: true
            })
        })
        axios.get("https://api.resolabindia.com/core/list_providers_adalserv/", {
            headers: {
                'Authorization': `Token ${cookies.get("token")}`
            }
        }).then((response)=>{
            console.log(cookies.get("token"));
            console.log(response.data);
            this.setState({
                tapdata: response.data,
                apdata: response.data,
                check_data1:true
            })
        }).catch((error)=>{
            console.log(cookies.get("token"));
            console.log(error);
        });
        axios.get("https://api.resolabindia.com/core/list_providers_infraserv/", {
            headers: {
                'Authorization': `Token ${cookies.get("token")}`
            }
        }).then((response) => {
            console.log(cookies.get("token"));
            console.log(response.data);
            this.setState({
                tipdata:response.data,
                ipdata:response.data,
                check_data2:true
            })
        }).catch((error) => {
            console.log(cookies.get("token"));
            console.log(error);
        });
        axios.get("https://api.resolabindia.com/core/list_seekers_adalserv/", {
            headers: {
                'Authorization': `Token ${cookies.get("token")}`
            }
        }).then((response) => {
            console.log(cookies.get("token"));
            console.log(response.data);
            this.setState({
                tasdata: response.data,
                asdata: response.data,
                check_data3: true
            })
        }).catch((error) => {
            console.log(cookies.get("token"));
            console.log(error);
        });
        axios.get("https://api.resolabindia.com/core/list_seekers_infraserv/", {
            headers: {
                'Authorization': `Token ${cookies.get("token")}`
            }
        }).then((response) => {
            console.log(cookies.get("token"));
            console.log(response.data);
            this.setState({
                tisdata: response.data,
                isdata: response.data,
                check_data4: true
            })
        }).catch((error) => {
            console.log(cookies.get("token"));
            console.log(error);
            
        });
    }

    selectOption = (event)=>{
       this.setState({
           select: event.target.value
       })
    }

    editSearchTerm = (event) => {
        this.setState({
            searchTerm: event.target.value
        })
    }

    dynamicSearch = (event) => {
        event.preventDefault();

        console.log(this.state.tapdata);
        console.log(this.state.tipdata);
        this.setState({
            apdata: this.state.tapdata.filter(
                data => {
                    console.log(data);
                    return (data.job.category.category_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
                    || data.job.job_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
                    || data.user.registered_region.toLowerCase().includes(this.state.searchTerm.toLowerCase()));}
            )
        })
        this.setState({
            ipdata: this.state.tipdata.filter(
                data => data.job.category.category_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
                    || data.location_state.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            )
        })
        this.setState({
            asdata: this.state.tasdata.filter(
                data => {
                    console.log("as");
                    console.log(data);
                    return (data.job.category.category_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                        data.job.job_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                        data.project_location.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
                }
            )
        })
        this.setState({
            isdata: this.state.tisdata.filter(
                data => data.job.category.category_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                data.job.job_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                data.address.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            )
        })
    }

    render()
    {
        if(this.state.error===true)
        {
            return(
            <>
            <br />
            <h1>There is an error!Please try to login first.</h1>
            </>
            );
        }
        else if (this.state.check_data1 === true && this.state.check_data2 === true && this.state.check_data3 === true && this.state.check_data4 === true)
        {
            const tpi = this.state.ipdata.map((ip)=>
                  <InfraProviderCard
                    key={ip.id}
                    cCategory={ip.job.category.category_name}
                    cArea={ip.total_area}
                    cCapacity={ip.no_halls}
                    cLocation={ip.location_state}
                    cFacility={ip.basic_facility}
                    cImg={ip.pic_urls}
                    cObject={ip}
                    plan_id={this.state.plan_id}
                    />
            )
            const api = this.state.apdata.map((ap)=>
                <AlliedProvider
                    key={ap.id}
                    cCategory={ap.job.category.category_name}
                    cLocation={ap.user.registered_region}
                    cName={ap.contact_name}
                    cPresence={ap.geo_presence}
                    cJob={ap.job.job_name}
                    cImg={ap.pic_urls}
                    cObject={ap}
                    plan_id={this.state.plan_id}
                />
            )
            const tsi = this.state.isdata.map((is)=>
                <InfraSeekerCard
                    key={is.id}
                    cCategory={is.job.category.category_name}
                    cSubCategory = {is.job.job_name}
                    cLoc={is.project_location_state}
                    cArea={is.total_area}
                    cObject={is}
                    plan_id={this.state.plan_id}
                />
            )
            const tsa = this.state.asdata.map((as)=>
                <AlliedSeekerCard
                    key={as.id}
                    cCategory={as.job.category.category_name}
                    cSubCategory = {as.job.job_name}
                    cLoc={as.project_location}
                    cName={as.contact_name}
                    cObject={as}
                    plan_id={this.state.plan_id}
                />
            )
            return(
                <Container>
                <br/>
                    <div>
                    <Form onSubmit={this.dynamicSearch}>
                        <Row style={{width:"90%",margin:"0px"}}>
                        <Col xs={4} style={{paddingRight:"0px"}}>
                        <Form.Group>
                            <Form.Control 
                            as="Select"
                            value={this.state.select}
                            onChange={this.selectOption}
                            >
                            <option>All</option>
                            <option>Available Resources</option>
                            {/* <option>Infrastructure Resources</option>
                            <option>Allied and Advisory Resources</option> */}
                            <option>Required Resources</option>
                            {/* <option>Infrastructure Required</option>
                            <option>Allied and Advisory Required</option> */}
                            </Form.Control>
                        </Form.Group>
                        </Col>
                        <Col xs={6} style={{paddingRight:"0px"}}>
                        <Form.Group>
                            <Form.Control 
                            type="text" 
                            placeholder="Search by Category or Location" 
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
                    <br/>
                    <div>
                        {(() => {
                            switch (this.state.select) {
                                case "All":
                                    return(
                                        <>
                                        <h1>Available Resources</h1>
                                        <br/>
                                        <br/>
                                        <CardDeck>
                                        <br />
                                        {tpi}
                                        <br />
                                        </CardDeck>
                                            
                                        <CardDeck>
                                            <br />
                                            {api}
                                            <br />
                                        </CardDeck>
                                        <br/>
                                        <h1>Required Resources</h1>
                                        <br/>
                                        <CardDeck>
                                        <br />
                                        {tsi}
                                        <br />
                                        </CardDeck>
                                        <CardDeck>
                                            <br />
                                            {tsa}
                                            <br />
                                        </CardDeck>
                                        </>);
                                case "Available Resources":
                                    return (
                                        <>
                                        <h1>Available Resources</h1>
                                        <br/>
                                        <CardDeck>
                                        <br />
                                        {tpi}
                                        <br />
                                        </CardDeck>
                                        <CardDeck>
                                            <br />
                                            {api}
                                            <br />
                                        </CardDeck>
                                        </>);
                                case "Infrastructure Resources":
                                    return(
                                        <>
                                        <h1>Infrastructure Available</h1>
                                        <CardDeck>
                                            <br />
                                            {this.state.ipdata.length ? tpi :
                                                <Container>
                                                <br/>
                                                    <Card style={{ width: '18rem', margin: 'auto' }}>
                                                        <h3>No data available</h3>
                                                    </Card>
                                                </Container>}
                                            <br />
                                        </CardDeck>
                                        </>
                                    );
                                case "Allied and Advisory Resources":
                                    return(
                                        <>
                                        <h1>Advisory and Allied Services Available</h1>
                                        <CardDeck>
                                            <br />
                                            {this.state.apdata.length ? api :
                                                <Container>
                                                <br/>
                                                    <Card style={{ width: '18rem', margin: 'auto' }}>
                                                        <h3>No data available</h3>
                                                    </Card>
                                                </Container>}
                                            <br />
                                        </CardDeck>
                                        </>
                                    );
                                case "Required Resources":
                                    return (
                                        <>
                                        <h1>Required Resources</h1>
                                        <br/>
                                        <br/>
                                        <CardDeck>
                                        <br />
                                        {tsi}
                                        <br />
                                        </CardDeck>
                                        <CardDeck>
                                            <br />
                                            {tsa}
                                            <br />
                                        </CardDeck>
                                        </>);
                                case "Infrastructure Required":
                                    return(
                                        <>
                                            <h1>Infrastructure Required</h1>
                                            <CardDeck>
                                            <br />
                                            {this.state.isdata.length ? tsi :
                                            <Container>
                                                <Card style={{ width: '18rem', margin: 'auto' }}>
                                                    <h3>No data available</h3>
                                                </Card>
                                            </Container>}
                                            </CardDeck>
                                        </>
                                    );
                                case "Allied and Advisory Required":
                                    return(
                                        <>
                                            <h1>Advisory and Allied Services Required</h1>
                                            <CardDeck>
                                                <br />
                                                {this.state.asdata.length ? tsa :
                                                    <Container>
                                                        <Card style={{ width: '18rem', margin: 'auto' }}>
                                                            <h3>No data available</h3>
                                                        </Card>
                                                    </Container>}
                                                <br />
                                            </CardDeck>
                                        </>
                                    );
                                default:
                                    return null;
                            }
                        })()}
                    </div>
                    
                </Container>
            );
        }
        else
        {
            return <LoadingElement/>;
        }
    }
}

export default ServicesPage;