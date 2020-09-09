import React,{Component} from 'react';
import {Col,Row,Card,Button,Badge} from 'react-bootstrap';
import {FaSuitcase} from 'react-icons/fa';
import {FcSearch} from 'react-icons/fc';
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import axios from 'axios';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import LoadingElement from './Loader'
const cookies = new Cookies();

class Form1 extends Component{
    constructor(props){
        super(props);
        this.state={
          name: cookies.get("name"),
          img: cookies.get("picture"),
          email: cookies.get("email"),
          phone: cookies.get("phone_number"),
          is_verified: cookies.get("is_verified"),
          is_subscribed: cookies.get("is_subscribed"),
          loader:true,
          error:false
        }
    }
    componentDidMount(){
      axios.get(`https://api.resolabindia.com/core/get_user_profile/${cookies.get('id')}/`, {
                headers: {
                    'Authorization': `Token ${cookies.get("token")}`
                }
        }).then((res)=>{
          console.log(res);
            this.setState({
                loader:false,
                name:res.data.name,
                img:res.data.profile_pic_url,
                email: res.data.email,
                phone: res.data.phone_number,
                is_verified: res.data.is_verified,
                is_subscribed: res.data.is_subscribed
            })
        }).catch((err)=>{
            this.setState({
              loader:false,
              error:true
            })
        })
    }
    //cancel subscription
    cancelSubs = event =>{
      this.setState({
        loader:true
      })
      axios.post('https://api.resolabindia.com/core/unsubscribe/',{},{
          headers: {
            'Authorization': `Token ${cookies.get("token")}`
          }
      }).then((res)=>{
        console.log(res);
        this.setState({
          loader:false
        })
        window.location.replace('/form1');
      }).catch((err)=>{
          alert("Cancelling Failed!");
          this.setState({
            loader: false
          })
      })
    }
    render(){
      if(this.state.loader===true)
      {
          return <LoadingElement/>
      }
      else if(this.state.error===true)
      {
        return(<h1>Error!! Please SignUp first.</h1>)
      }
      else{
           return (
          <>
            <br />
            <div style={{ width: "100%"}}>
            <h4>Profile</h4>
            <br/>
              <Card
                  style={{ width: "90%",maxWidth:"350px",border:"solid 3px #d9c9a0",backgroundColor:"#fff2cf"}}
                  className="mx-auto"
                >
                  <LazyLoadImage
                    variant="top"
                    src={this.state.img}
                    style={{ width: "100%", height: "auto" }}
                    effect="blur"
                    alt="Error image can't be loaded"
                  />
                  <Card.Body>
                    <Card.Title>{this.state.name}</Card.Title>
                    <Card.Text>
                      <strong>Email:</strong> {this.state.email}
                      <br />
                      <strong>Phone Number:</strong>{" "}
                      {this.state.phone}<br/>
                      <Row>
                        <Col><h5>{this.state.is_verified?<Badge variant="primary">Verified</Badge>:<Badge variant="danger">Not Verified</Badge>}</h5></Col>
                        
                        <Col><h5>{this.state.is_subscribed?<Badge variant="primary">Subscribed</Badge>:<Badge variant="danger">Not Subscribed</Badge>}</h5></Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
            </div>
                <br />
                <br />
                <h4>Are you a Resource Provider or a Resource Seeker?</h4>
                <br/>
                <Row style={{ width: "100%" }}>
                  <Col sm style={{ padding: "0px" }}>
                    <Link
                      to={{ pathname: "/form2", state: { provider: true } }}
                    >
                    <Card
                    style={{width:"200px",border:"2px solid #d9c9a0",backgroundColor:"#fff2cf"}}
                    className="mx-auto">
                      <h1>
                        <FaSuitcase />
                      </h1>
                      Resource Provider
                    </Card>
                    </Link>
                    <br />
                  </Col>
                  <Col sm style={{ padding: "0px",paddingBottom:"20px" }}>
                    <Link to={{ pathname: "/form2", state: { seeker: true } }}>
                    <Card
                    style={{width:"200px",border:"2px solid #d9c9a0",backgroundColor:"#fff2cf"}}
                    className="mx-auto">
                      <h1>
                        <FcSearch />
                      </h1>
                      Resource Seeker
                    </Card>
                    </Link>
                  </Col>
                </Row>
                <br/>
                {/* <Row style={{width:"100%"}}>
                  <Col><Link to="/payment"><Button>Go to Pricing Page</Button></Link></Col>
                  {this.state.is_subscribed?<Col><Button onClick={this.cancelSubs.bind(this)} variant="danger">Cancel Subscription</Button></Col>:null}
                </Row> */}
                <br/>
          </>
        );
      }
    }
}

export default Form1;