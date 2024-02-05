import React, {useState, useEffect} from 'react';
import {Button, Card, CardBody, CardTitle, Table} from 'reactstrap';

const ProjectTables = () => {
    const [tableData, setTableData] = useState([]);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // 요청의 Content-Type 설정
        },
        mode: 'cors', // CORS 활성화
    };

    useEffect(() => {
        // API에서 노동자 정보 가져오기 (GET 방식)
        fetch(`https://port-0-spring-eu1k2llldpju8v.sel3.cloudtype.app/worker/wait`, requestOptions)
            .then(response => response.json())
            .then(data => {
                // 가져온 데이터로 tableData 상태 업데이트
                setTableData(data);
            })
            .catch(error => {
                console.error('노동자 정보를 가져오는 중 오류 발생:', error);
            });

    }, []);

    const handleApproval = (email) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        };

        // 노동자 승인 API 호출
        fetch(`https://port-0-spring-eu1k2llldpju8v.sel3.cloudtype.app/worker/approval?email=${email}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                // 승인 상태를 업데이트합니다.
                updateWorkerApprovalStatus(email, '승인됨');
            })
            .catch(error => {
                console.error('승인 요청 중 오류 발생:', error);
            });
    };
    const handleRejection = (email) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        };

        // 노동자 거부 API 호출
        fetch('https://port-0-spring-eu1k2llldpju8v.sel3.cloudtype.app/worker/rejection', requestOptions)
            .then(response => response.json())
            .then(data => {
                // 거부 상태를 업데이트합니다.
                updateWorkerApprovalStatus(email, '거부됨');
            })
            .catch(error => {
                console.error('거부 요청 중 오류 발생:', error);
            });
    };

    const updateWorkerApprovalStatus = (email, status) => {
        // 테이블 데이터에서 해당 노동자의 승인 상태를 업데이트합니다.
        const updatedTableData = tableData.map(worker => {
            if (worker.email === email) {
                return { ...worker, approvalStatus: status };
            }
            return worker;
        });
        setTableData(updatedTableData);
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">노동자 권한 설정</CardTitle>
                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                        <tr>
                            <th>노동자명</th>
                            <th>소속</th>
                            <th>생년월일</th>
                            <th>성별</th>
                            <th>연락처</th>
                            <th>주소</th>
                            <th>승인 여부</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData.map((tdata, index) => (
                            <tr key={index} className="border-top">
                                <td>{tdata.name}</td>
                                <td>{tdata.team}</td>
                                <td>{tdata.birth}</td>
                                <td>{tdata.gender}</td>
                                <td>{tdata.phone}</td>
                                <td>{tdata.address}</td>
                                <td>
                                    <Button
                                        style={{marginRight: '10px'}}
                                        color="btn btn btn-outline-primary"
                                        variant="contained"
                                        size="large"
                                        onClick={() => handleApproval(tdata.email)}
                                    >
                                        승인
                                    </Button>
                                    <Button
                                        padding="10px"
                                        color="btn btn btn-outline-danger"
                                        variant="contained"
                                        size="large"
                                        onClick={() => handleRejection(tdata.email)}
                                    >
                                        거부
                                    </Button>
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
