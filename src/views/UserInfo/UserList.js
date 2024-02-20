import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardTitle, ListGroup, ListGroupItem} from "reactstrap";
import {Link} from "react-router-dom";




const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);


    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:8080/user/");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">공지사항</CardTitle>
                <ListGroup flush className="mt-4">
                    {users.map((feed, index) => (
                        (index < 7 &&
                            <Link to={`/Notice/${feed.id}`} className="Buttons-link" style={{ textDecoration: 'none' }}>
                                <ListGroupItem
                                    key={index}
                                    action
                                    href="/"
                                    tag="a"
                                    className="d-flex align-items-center p-3 border-0"
                                >
                                    {feed.title}
                                    <small className="ms-auto text-muted text-small">
                                        {feed.write_date}
                                    </small>
                                </ListGroupItem>
                            </Link>)
                    ))}
                </ListGroup>
            </CardBody>
        </Card>
    );
}

export default UserList