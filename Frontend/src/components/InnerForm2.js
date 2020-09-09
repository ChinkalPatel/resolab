import React,{Component} from 'react';
import {Col,Row} from 'react-bootstrap';
import {BsPeopleFill} from 'react-icons/bs';
import {FcServices} from 'react-icons/fc';
import {Link} from 'react-router-dom';

class Form2 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            provider: props.location.state.provider,
            seeker: props.location.state.seeker
        }
    }
    render(){
        if (this.props.location.state.provider === true || this.props.location.state.seeker===true)
        return(
            <>
            <br />
            <h6>Which type of Resource?</h6>
            <Row style={{width:"100%"}}>
            <Col sm style={{padding:"0px"}}>
                <Link to={{pathname:"/form3",state:{category:"people",provider:this.state.provider,seeker:this.state.seeker}}}>
                <h1><BsPeopleFill/></h1>
                People
                </Link>
                <br/>
            </Col>
            <Col sm style={{padding:"0px"}}>
                <Link to={{pathname:"/form3",state:{category:"services",provider:this.state.provider,seeker:this.state.seeker}}}>
                <h1><FcServices/></h1>
                Services
                </Link>
            </Col>
            </Row>
            </>
        );
        else
        {
            return(<h1>Error</h1>);
        }
    }
}

export default Form2;