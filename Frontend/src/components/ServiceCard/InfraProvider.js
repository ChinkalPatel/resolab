import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../../style/css/CardTemplateForSeeker.min.css';

let tp = false;
/*It is required that image folder has the profile pic saved with same name as cUser, i.e., 'cUser.jpg'*/
function InfraProviderCard(props) {
        if (props.plan_id === "plan_FK1O3yI0IkPiIf" || props.plan_id === "plan_FK1PUBR5JunPde") tp = true;
        let link = props.cImg;
        let linkarray = link.split(',');
		var card=(
			
			<Card className="seeker-card-template-deck mb-4">
                <Row style={{padding:"0", maxWidth:"500px",width:"100%"}}>
                    <Col md={3} xs={6} className="seeker-card-resetter">
                        <Row style={{height: '125px',}}>
                            <Col className="seeker-fill seeker-card-resetter">
                                <Image src={linkarray[0]} className="mx-auto seeker-card-img" style={{width:"100%",height:"60%",maxWidth:"150px"}}/>
                            </Col>
                        </Row>
                        <Row style={{height: '125px',}}>
                            <Col className="seeker-fill seeker-card-resetter">
                                <Image src={linkarray[1]} className="mx-auto seeker-card-img" style={{width:"100%",height:"60%",maxWidth:"150px"}}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={3} className="seeker-card-resetter d-none d-sm-block">
                        <Row style={{height: '125px',}}>
                            <Col className="seeker-fill seeker-card-resetter">
                                <Image src={linkarray[2]} className="mx-auto seeker-card-img" style={{width:"100%",height:"60%",maxWidth:"150px"}}/>
                            </Col>
                        </Row>
                        <Row style={{height: '125px',}}>
                            <Col className="seeker-fill seeker-card-resetter">
                                <Image src={linkarray[3]} className="mx-auto seeker-card-img" style={{width:"100%",height:"60%",maxWidth:"150px"}}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} className="seeker-card-resetter">
                    <Card.Body as="div" className="seeker-info">
                        <strong><Card.Title style={{fontSize:"1em"}}> Infra_Training Centre: </Card.Title></strong>
                        <Card.Text style={{fontSize:"1em"}}> Total Area: {props.cArea} (Sq.Ft.)<br/>
                                    Facility: {props.cFacility==="All"?("All Facility are available"):props.cFacility}<br/>
                                    State: {props.cLocation}<br/>
                            </Card.Text>
                        <br/>
                        <Button type="button" variant="outline-success" href="#" style={{fontSize:"1em"}}>
                        <Link to={{pathname:'/ipd',state:{cObject:props.cObject,tp:tp,link1:linkarray[0],link2:linkarray[1],link3:linkarray[2],link4:linkarray[3]}}}>Details</Link>
                        </Button>
                    </Card.Body>
                    </Col>
                </Row>
			</Card>
			
		);
	

	return(
		<div>

			{card}

		</div>
	);
}

export default InfraProviderCard;