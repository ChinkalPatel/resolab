import React from 'react';
import {Button,Card,Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../style/css/CardTemplate.min.css';
let tp=false
/*It is required that image folder has the profile pic saved with same name as cUser, i.e., 'cUser.jpg'*/
function CardTemplateForProvider(props) {
	if (props.plan_id === "plan_FK1O3yI0IkPiIf" || props.plan_id === "plan_FK1PUBR5JunPde") tp=true
	//console.log(props.cId);
		var card=(
			<Card style={{ height:'350x',width: '230px'}} className="card-template-deck mb-4">
			<Card.Body>
			<Image src={props.cImg} className="profile-pic mx-auto w-50" roundedCircle style={{width:"100px",height:"100px"}}/>
				<Card.Title> {props.cName} </Card.Title>
				<Card.Subtitle className="text-muted text-dark"> {props.cPosition} </Card.Subtitle>
				<Card.Text>Experience:<br/> {props.cExp} Year<br/>Location: {props.cLoc}</Card.Text>
				<hr/>
				<Button type="button" variant="outline-success">
				<Link to={{pathname:'/providerdetails', 
				state:{
					cId:props.cId,
					aadhar_no: props.aadhar_no,
					achievement: props.achievement,
					current_work_district: props.current_work_district,
					current_work_state: props.current_work_state,
					educational_qualification: props.educational_qualification,
					exp_skill_industry: props.exp_skill_industry,
					exp_non_skill: props.exp_non_skill,
					project_name: props.project_name,
					designation_1: props.designation_1,
					organization_1_name: props.organization_1_name,
					total_tenure_1: props.total_tenure_1,
					designation_2: props.designation_2,
					organization_2_name: props.organization_2_name,
					total_tenure_2: props.total_tenure_2,
					designation_3: props.designation_3,
					organization_3_name: props.organization_3_name,
					total_tenure_3: props.total_tenure_3,
					cImg:props.cImg,
					cSalary:props.cSalary,
					eSalary:props.eSalary,
					tp:tp
				} }}>Details</Link></Button>

			</Card.Body>
			</Card>
		);
	

	return(
		<div>

			{card}

		</div>
	);
}

export default CardTemplateForProvider;