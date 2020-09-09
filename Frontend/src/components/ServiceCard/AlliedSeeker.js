import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import '../../style/css/CardTemplateForSeeker.min.css';
let service = false;
/*It is required that image folder has the profile pic saved with same name as cUser, i.e., 'cUser.jpg'*/
function AlliedSeekerCard(props) {
	console.log(props.plan_id);
	if (props.plan_id === "plan_FK1LpTeMzTBOWv" || props.plan_id === "plan_FK1N2JDcWTBHaC") service=true
		var card=(
			<Card style={{width: '230px', height: '230px'}} className="seeker-card-template-deck mb-4">
			<Card.Body>
			{/* <Image src={require(`../images/${props.cImg.toLowerCase()}.jpg`)} className="seeker-pic mx-auto w-50" roundedCircle  /> */}
				<Card.Title> {props.cCategory} </Card.Title>
				<Card.Subtitle className="text-muted text-dark"> {props.cSubCategory} </Card.Subtitle>
				<Card.Text> Contact Name: {props.cName}<br/>Location: {props.cLoc}</Card.Text>
				<hr/>
				<Button type="button" variant="outline-success">
				<Link to={{pathname:'/asd',state:{cObject:props.cObject,service:service}}}>
					Details
				</Link>
				</Button>
			</Card.Body>
			</Card>
		);
	

	return(
		<div>

			{card}

		</div>
	);
}

export default AlliedSeekerCard;