import React, {useEffect, useState} from "react";
import {Box, Button, Card, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {CardBody} from "reactstrap";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";



const AgencyInfo = () => {
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');
    const [agencyId, setAgencyId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [agencyName, setAgencyName] = useState('');




    useEffect(() => {
        runTask()

    }, []);



    const handlePhone1Change = (event) => {
        const { value } = event.target;
        if (/^\d{0,3}$/.test(value)) {
            setPhone1(value);
        }
    };

    const handlePhone2Change = (event) => {
        const { value } = event.target;
        if (/^\d{0,4}$/.test(value)) {
            setPhone2(value);
        }
    };

    const handlePhone3Change = (event) => {
        const { value } = event.target;
        if (/^\d{0,4}$/.test(value)) {
            setPhone3(value);
        }
    };

    const handleAgencyIdChange = (event) =>{
        setAgencyId(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };



    const getData = () =>{
        return new Promise((resolve, reject) =>{
            const data = fetchAgencyInfo();
            resolve(data);
        })
    }

    const fetchAgencyInfo = async () => {

        const token = localStorage.getItem('token')
        try {
            const response = await fetch("http://localhost:8080/agency/info", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },

                mode: 'cors'
            });
            return await response.json();
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }

    };

    const runTask = async () => {
        const agencyData = await getData();
        setAgencyId(agencyData["agencyId"]);
        setName(agencyData["name"]);
        setAgencyName(agencyData["agencyName"]);
        const [p1, p2, p3] = agencyData["phone"].split('-');
        setPhone1(p1);
        setPhone2(p2);
        setPhone3(p3);
    }


    const handleUpdateAgencyInfo = async () => {
        try {
            const token = localStorage.getItem('token')
            const phone = phone1 + '-' + phone2 + '-' + phone3

            const response = await fetch('http://localhost:8080/agency/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
                body: JSON.stringify({ agencyId, password , name,  phone, agencyName}),
                mode: 'cors'
            });

            if (response.ok) {
                response.json().then(data => {
                    console.log(data);
                }).catch(error => {
                    console.error('JSON 파싱 오류:', error);
                });
            } else {
                console.error('가입 실패');
            }

        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    const handleDeleteAgency = async () => {
        try {
            const token = localStorage.getItem('token')

            const response = await fetch('http://localhost:8080/agency/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
                mode: 'cors'
            });

            if (response.ok) {
                response.json().then(data => {
                    localStorage.clear()
                    console.log(data);
                }).catch(error => {
                    console.error('JSON 파싱 오류:', error);
                });
            } else {
                console.error('가입 실패');
            }

        } catch (error) {
            console.error('오류 발생:', error);
        }
    };



    return (
        <Card>
            <CardBody>
                <>

                    <Box>
                        <Stack mb={5}>
                            <Typography variant="subtitle1"
                                        fontWeight={600} component="label" htmlFor='id' mb="5px">아이디</Typography>
                            <CustomTextField id="id" disabled variant="outlined" fullWidth value={agencyId} onChange={handleAgencyIdChange}/>

                            <Typography variant="subtitle1"
                                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">비밀번호</Typography>
                            <CustomTextField
                                id="password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={handlePasswordChange}
                            />

                            <Typography variant="subtitle1"
                                        fontWeight={600} component="label" htmlFor='name' mb="5px" mt="25px">이름</Typography>
                            <CustomTextField id="name" variant="outlined" fullWidth value={name} onChange={handleNameChange}/>




                            <Typography variant="subtitle1"
                                        fontWeight={200} component="label" htmlFor='phone_number' mb="5px" mt="25px">휴대전화</Typography>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CustomTextField
                                    id="phone_number_1"
                                    variant="outlined"
                                    value={phone1}
                                    onChange={handlePhone1Change}
                                    style={{ marginRight: '10px' }}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                />
                                <span>-</span>
                                <CustomTextField
                                    id="phone_number_2"
                                    variant="outlined"
                                    value={phone2}
                                    onChange={handlePhone2Change}
                                    style={{ margin: '0 10px' }}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                />
                                <span>-</span>
                                <CustomTextField
                                    id="phone_number_3"
                                    variant="outlined"
                                    value={phone3}
                                    onChange={handlePhone3Change}
                                    style={{ marginLeft: '10px' }}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                />
                            </div>

                            <Typography variant="subtitle1"
                                        fontWeight={600} component="label" htmlFor='address' mb="5px" mt="25px">기관명</Typography>
                            <CustomTextField disabled id="address" variant="outlined" fullWidth value={agencyName} />

                        </Stack>
                        <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/Starter"  onClick={handleUpdateAgencyInfo}>
                            정보수정
                        </Button>

                    </Box>

                </>
            </CardBody>
            <Button color="primary" variant="contained" size="small"  component={Link} to="/login"  onClick={handleDeleteAgency}>
                회원탈퇴
            </Button>
        </Card>

    )
}


export default AgencyInfo