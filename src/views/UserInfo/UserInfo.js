import { Col, Row } from "reactstrap";
import AddUser from "./AddUser"
import Feeds from "../../components/dashboard/Feeds";
import UserList from "./UserList";


const UserInfo = () => {
    return (
        <Row>
            <Col sm="6" lg="6" xl="5" xxl="4">
                <UserList />
            </Col>
            <Col sm="6" lg="6" xl="7" xxl="8">
                <AddUser/>
            </Col>
        </Row>
    )
}





export default UserInfo