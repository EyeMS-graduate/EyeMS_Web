import { Col, Row } from "reactstrap";
import AddUser from "./AddUser"
import Feeds from "../../components/dashboard/Feeds";
import UserList from "./UserList";
import React, {useState} from 'react';
import UserModify from "./UserModify";


const UserInfo = () => {
    const [info, setInfo] = useState(false)
    const [userInfo, setUserInfo] = useState({
        userId : "",
        password : "",
        name : "",
        birth : "2000-01-01",
        phone : "",
        email : "",
        address : "",
        glasses : "",
        gender : ""
    })


    return (
        <Row>
            <Col sm="6" lg="6" xl="5" xxl="4">
                <UserList setInfo={setInfo} setUserInfo={setUserInfo}/>
            </Col>
            <Col sm="6" lg="6" xl="7" xxl="8">
                {info ? <UserModify userInfo={userInfo}/> : <AddUser/>}
            </Col>
        </Row>
    )
}





export default UserInfo