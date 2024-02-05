import {Card, CardBody, CardTitle, Table,Button} from "reactstrap";
import React, {useState, useEffect} from 'react';
import SalesChart from './SalesChart'
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";

const UserInfo = ({selectedUser}) => {

    if (!selectedUser) {
        return null;
    }

    return (
        <div className="user-info">
            <img src={selectedUser.avatar} alt="User Avatar" />
            <h2>{selectedUser.name}</h2>
            <p>email : {selectedUser.email}</p>
            <p>전화번호 :{selectedUser.phone}</p>
            <p>생일 : {parseInt(selectedUser.birth.substring(0,2))+2000}년 {selectedUser.birth.substring(2,4).padStart(2, "0")}월 
                {selectedUser.birth.substring(4,6).padStart(2, "0")}일</p>
            <p>성별 : {selectedUser.gender}</p>
            <p>주소 : {selectedUser.address}</p>
            {/* 그 외에 사용자 정보를 표시하는 코드를 추가할 수 있습니다. */}
        </div>
    );
};


const ProjectTables = (props) => {
    const [open, setOpen] = useState([]);
    const [send, setSend] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [userData, setUserData] = useState([]);
    const [Data, setData] = useState([]);

    const handleSearch = () => {
        fetchUserData(searchText);
    };
    const addElement = () => {
        setOpen((prevArray) => [...prevArray, false]);
    };
    const toggleElement = (index) => {
        setOpen((prevArray) => {
            const newArray = [...prevArray];
            newArray[index] = !newArray[index]; // 특정 인덱스의 값을 토글
            return newArray;
        });
    };


    const fetchUserData = async () => {
        try {
            const params = new URLSearchParams();
            params.append('teamName', searchText);
            const response = await fetch(`https://port-0-spring-eu1k2llldpju8v.sel3.cloudtype.app/worker/team?teamName=${searchText}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            

            if (!response.ok) {
                throw new Error('Request failed');
            } else {
                setOpen([]);
                const data = await response.json();
                for (let i = 0; i < data.length; i++) {
                    data[i].avatar = user1;
                    addElement();
                }
                setUserData(data);

            }

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    

    const fetchData = async (searchText) => {
        try {
            const params = new URLSearchParams();
            params.append('email', searchText);
            const response = await fetch(`https://port-0-spring-eu1k2llldpju8v.sel3.cloudtype.app/worker/info?email=${searchText}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });


            if (!response.ok) {
                throw new Error('Request failed');
            } else {
                const data = await response.json();
                data.avatar = user2;
                setSelectedUser(data);
                console.log(data);
            }

        } catch (error) {
            console.error('Error fetching user data:', error);
        }

    };

    const fetchUserInfoData = async (searchText) => {
        try {
            const params = new URLSearchParams();
            params.append('email', searchText);
            const response = await fetch(`https://port-0-spring-eu1k2llldpju8v.sel3.cloudtype.app/worker/score?email=${searchText}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });


            if (!response.ok) {
                throw new Error('Request failed');
            } else {
                const data = await response.json();
                setData(data);
                props.setSend(data);
                setSend(data);
            }

        } catch (error) {
            console.error('Error fetching user data:', error);
        }

    };
    const handleUserInfo = (searchText, index) => {
        if(open[index]){
            toggleElement(index);
            return null;
        }
        fetchData(searchText);
        fetchUserInfoData(searchText)
        toggleElement(index);
    };

    useEffect(() => {
        
    }, []); // Fetch user data when the component mounts


    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">노동자 관리</CardTitle>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                        <tr>
                            <th>노동자명</th>
                            <th>검사결과</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userData.map((tdata, index) => (
                            <tr key={index} className="border-top">
                                <td>
                                    <div className="d-flex align-items-center p-2">
                                        <img
                                            src={tdata.avatar}
                                            className="rounded-circle"
                                            alt="avatar"
                                            width="45"
                                            height="45"
                                        />
                                        <div className="ms-3">
                                            <h6 className="mb-0">
                                                <Button className="btn" outline color="info"  onClick={() => handleUserInfo(tdata.email, index)}>{tdata.name}</Button>
                                            </h6>
                                            <span className="text-muted">{tdata.email}</span>
                                        </div>
                                    </div>
                                    <div className="user-info-container">
                                        {/* UserInfo 컴포넌트에 selectedUser 상태 전달 */}
                                        {open[index] && <UserInfo selectedUser={selectedUser} />}
                                    </div>
                                    <div className="user chart">
                                        {open[index] && <SalesChart send={send}/>}
                                    </div>
                                </td>
                                <td>
                                    {tdata.status === "pending" ? (
                                        <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                                    ) : tdata.status === "holt" ? (
                                        <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                                    ) : (
                                        <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    );

};

export default ProjectTables;