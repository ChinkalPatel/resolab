import React,{Component} from 'react';
import {Form,Col,Button,Container,Alert} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import LoadingElement from '../Loader';

const cookies = new Cookies();
class InfraProviderForm extends Component {
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
            infra_available:"",
            infra_detail:"",
            area:0,
            no_of_halls:0,
            total_open_area:0,
            basic_facility:"",
            no_of_toilet:0,
            no_of_bathroom:0,
            state:"",
            district:"",
            file1:null,
            file2: null,
            file3: null,
            file4: null,
            userID: cookies.get("token"),
            validated:false,
            alert:false,
            loader:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    fileChange1 = event => {
        this.setState({
            file1: event.target.files[0]
        });
    }
    fileChange2 = event => {
        this.setState({
            file2: event.target.files[0]
        });
    }
    fileChange3 = event => {
        this.setState({
            file3: event.target.files[0]
        });
    }
    fileChange4 = event => {
        this.setState({
            file4: event.target.files[0]
        });
    }
    handleLegalStatusChange = event =>{
        this.setState({
            legal_status:event.target.value
        });
    }
    handleOrgNameChange = event =>{
        this.setState({
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
    handleInfraAvailabilityChange = event =>{
        this.setState({
            infra_available: event.target.value
        })
    }
    handleInfraDetailChange = event =>{
        this.setState({
            infra_detail:event.target.value
        })
    }
    handleAreaChange = event =>{
        this.setState({
            area:event.target.value
        })
    }
    handleHallsChange = event =>{
        this.setState({
            no_of_halls:event.target.value
        })
    }
    handleBasicFacilityChange = event =>{
        this.setState({
            basic_facility:event.target.value
        })
    }
    handleToiletChange = event =>{
        this.setState({
            no_of_toilet:event.target.value
        })
    }
    handleBathroomChange = event =>{
        this.setState({
            no_of_bathroom:event.target.value
        })
    }
    handleStateChange = event =>{
        this.setState({
            state:event.target.value
        })
    }
    handleDistrictChange = event =>{
        this.setState({
            district:event.target.value
        })
    }
    handleOpenAreaChange = event =>{
        this.setState({
            total_open_area:event.target.value
        })
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
        const fd3 = new FormData();
        const fd4 = new FormData();
        if (this.state.file1 === null || this.state.file2 === null || this.state.file3 === null || this.state.file4 === null) {
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
                axios.get('https://api.resolabindia.com/core/get_presigned_url', {
                    params: {
                        "file_name": cookies.get("token") + "i1" + this.state.file1.name
                    }
                }).then((response1)=>{
                    var awsurl1 = response1.data.url;
                    var awskey1 = response1.data.fields.key;
                    var awsurl2;
                    var awskey2;
                    var awsurl3;
                    var awskey3;
                    var awsurl4;
                    var awskey4;
                    fd1.append('key', response1.data.fields.key);
                    fd1.append(
                        'file',
                        this.state.file1,
                        this.state.file1.name
                    );
                    fd1.append('AWSAccessKeyId', response1.data.fields.AWSAccessKeyId);
                    fd1.append('policy', response1.data.fields.policy);
                    fd1.append('signature', response1.data.fields.signature);
                    console.log("1");
                    axios.post(response1.data.url, fd1, {
                        headers: {
                            'Content-Type': undefined
                        }
                    }).then((res)=>{
                        axios.get('https://api.resolabindia.com/core/get_presigned_url', {
                            params: {
                                "file_name": cookies.get("token") + "i2" + this.state.file2.name
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
                            console.log("2");
                            axios.post(response2.data.url, fd2, {
                                headers: {
                                    'Content-Type': undefined
                                }
                            })
                        }).then((res)=>{
                            axios.get('https://api.resolabindia.com/core/get_presigned_url', {
                            params: {
                                "file_name": cookies.get("token") + "i3" + this.state.file3.name
                            }
                        }).then((response3) => {
                            awsurl3 = response3.data.url;
                            awskey3 = response3.data.fields.key;
                            fd3.append('key', response3.data.fields.key);
                            fd3.append(
                                'file',
                                this.state.file3,
                                this.state.file3.name
                            );
                            fd3.append('AWSAccessKeyId', response3.data.fields.AWSAccessKeyId);
                            fd3.append('policy', response3.data.fields.policy);
                            fd3.append('signature', response3.data.fields.signature);
                            console.log("3");
                            axios.post(response3.data.url, fd3, {
                                headers: {
                                    'Content-Type': undefined
                                }
                            }).then((res)=>{
                                    axios.get('https://api.resolabindia.com/core/get_presigned_url', {
                                        params: {
                                            "file_name": cookies.get("token") + "i4" + this.state.file4.name
                                        }
                                    }).then((response4) => {
                                            awsurl4 = response4.data.url;
                                            awskey4 = response4.data.fields.key;
                                            fd4.append('key', response4.data.fields.key);
                                            fd4.append(
                                                'file',
                                                this.state.file4,
                                                this.state.file4.name
                                            );
                                            fd4.append('AWSAccessKeyId', response4.data.fields.AWSAccessKeyId);
                                            fd4.append('policy', response4.data.fields.policy);
                                            fd4.append('signature', response4.data.fields.signature);
                                            console.log("4");
                                            axios.post(response4.data.url, fd4, {
                                                headers: {
                                                    'Content-Type': undefined
                                                }
                                            }).then((res)=>{
                                                const body = {
                                                    user: cookies.get("phone_number"),
                                                    job: this.state.infra_available,
                                                    org_name: this.state.org_name,
                                                    legal_status: this.state.legal_status,
                                                    pan_card_no: this.state.pan_card_no,
                                                    gst_no: this.state.gstno,
                                                    contact_name: this.state.name,
                                                    contact_phone_no: "+91"+this.state.phoneno,
                                                    address: this.state.address,
                                                    detail:this.state.infra_detail,
                                                    total_area:this.state.area,
                                                    no_halls:this.state.no_of_halls,
                                                    total_open_area:this.state.total_open_area,
                                                    basic_facility:this.state.basic_facility,
                                                    no_toilets:this.state.no_of_toilet,
                                                    no_bathrooms:this.state.no_of_bathroom,
                                                    location_state:this.state.state,
                                                    location_district:this.state.district,
                                                    pic_urls: awsurl1 + awskey1 + "," + awsurl2 + awskey2 + "," +awsurl3+awskey3+ ","+ awsurl4+awskey4,
                                                };
                                                axios.post('https://api.resolabindia.com/core/create_provider_infraserv/', body, {
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
                                            }).catch((error)=>{
                                                console.log(error);
                                                this.setState({
                                                    loader: false
                                                })
                                                alert(error + " Please Retry");
                                            })
                                .catch((error)=>{
                                    console.log(error);
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
                        })
                        .catch((error) => {
                            console.log(error);
                            this.setState({
                                loader: false
                            })
                             alert(error + " Please Retry");
                        })
                    }).catch((error)=>{
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
                }).catch((error)=>{
                    console.log(error);
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
                <>
                <LoadingElement/>
                <p>This may take few minutes. Please Wait!!</p>
                </>
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
                                    required
                                    type="text"
                                    placeholder="Organisation Name"
                                    value={this.state.org_name}
                                    onChange={this.handleOrgNameChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct details
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
                                Infrastruture Availability:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    as="Select"
                                    placeholder="Infrastructure Availability"
                                    value={this.state.infra_available}
                                    onChange={this.handleInfraAvailabilityChange}
                                    >
                                    <option selected value="">Select:</option>
                                    <option>Training Centre</option>
                                    <option>Hostel</option>
                                    <option value="Others in Infra">Others</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Choose Correct infrastructure
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Infrastructure Detail:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Infrastructure Detail"
                                    value={this.state.infra_detail}
                                    onChange={this.handleInfraDetailChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct details
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Total Area(Sq.Ft.):
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
                                    Write correct area
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Number of Halls:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Number of Halls"
                                    value={this.state.no_of_halls}
                                    onChange={this.handleHallsChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct number of halls
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Total Open Area (Sq.Ft.):
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Total Open Area"
                                    value={this.state.total_open_area}
                                    onChange={this.handleOpenAreaChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct open area
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Basic Facility Available:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    as="Select"
                                    placeholder="Facility"
                                    value={this.state.basic_facility}
                                    onChange={this.handleBasicFacilityChange}
                                    >
                                    <option selected value="">Select:</option>
                                    <option>Electricity</option>
                                    <option>Water</option>
                                    <option>Power BackUp</option>
                                    <option>Electricity and Water</option>
                                    <option>Electricity and Power Backup</option>
                                    <option>All</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Choose correct faclity
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Number of Toilet:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Number of Toilet"
                                    value={this.state.no_of_toilet}
                                    onChange={this.handleToiletChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct number of Toilets
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                Number of Bathrooms:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Bathrooms"
                                    value={this.state.no_of_bathroom}
                                    onChange={this.handleBathroomChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct number of Bathrooms
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                State:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required 
                                as="Select" 
                                placeholder="State"
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
                        <br/>
                        <Form.Row>
                            <Form.Label column="lg" lg={2}>
                                District:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="District"
                                    value={this.state.district}
                                    onChange={this.handleDistrictChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct District
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
                                <Form.File>
                                    <Form.File.Input 
                                    required
                                    onChange={this.fileChange3}
                                    />
                                </Form.File>
                                <Form.File>
                                    <Form.File.Input 
                                    required
                                    onChange={this.fileChange4}
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
export default InfraProviderForm;