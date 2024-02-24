import React, {useEffect, useState} from 'react';
import {Button, Card, CardBody, CardTitle, ListGroup, ListGroupItem} from "reactstrap";
import { Modal } from 'react-bootstrap';



const UserList = ({setInfo, setUserInfo}) => {
    const [users, setUsers] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleDeleteConfirmation = (user) => {
        handleDeleteUser(user);
        handleCloseModal();
        window.location.reload()
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    const fetchUsers = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch("http://localhost:8080/user/userlist", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },

                mode: 'cors'
            });
            const data = await response.json();
            setUsers(data);
            console.log(users)
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    const fetchDeleteUser = async (userId) => {
        const token = localStorage.getItem('token')
        console.log(JSON.stringify({userId}))
        try {
            const response = await fetch("http://localhost:8080/user/delete", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({userId}),
                mode: 'cors'
            });
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    const fetchUserInfo = async (userId) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch("http://localhost:8080/user/info", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({userId}),
                mode: 'cors'
            });
            if (response.ok) {
                response.json().then(data => {
                    setUserInfo(data)
                    console.log(data)
                }).catch(error => {
                    console.error('JSON 파싱 오류:', error);
                });
            } else {
                console.error('가입 실패');
            }
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    const handleDeleteUser = (user) => {
        console.log(user)
        fetchDeleteUser(user)
    }

    const handleAddUser = () => {
        setInfo(false)
    }

    const handleShowUserInfo = (user) => {
        fetchUserInfo(user)
        setInfo(true)
    }

    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5" className="d-flex align-items-center justify-content-between p-3 border-0"
                >
                    유저목록
                    <Button className="danger" onClick={() => handleAddUser()}>유저추가</Button>
                </CardTitle>
                <ListGroup flush className="mt-4">
                    {users.map((user) => (
                            <ListGroupItem
                                key={user}

                                className="d-flex align-items-center justify-content-between p-3 border-0"
                            >
                                {user}
                                <Button variant="danger"  onClick={handleShowModal}>삭제</Button>
                                <Button variant="danger"  onClick={() => handleShowUserInfo(user)}>정보</Button>
                                <Modal show={showModal} onHide={handleCloseModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>삭제 확인</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        삭제하시겠습니까?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseModal}>
                                            취소
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteConfirmation(user)}>
                                            삭제
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </ListGroupItem>

                        ))}
                </ListGroup>
            </CardBody>
        </Card>
    );
}

export default UserList