import React, {useEffect, useState} from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {Card, CardBody} from "reactstrap";
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import DatePicker from 'react-datepicker';
import moment from "moment";



const UserModify = ({userInfo}) => {

    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState(null);
    const [address, setAddress] = useState('');
    const [glasses, setGlasses] = useState('');
    const [gender, setGender] = useState('');
    const [username, setUsername] = useState('');
    const [domain, setDomain] = useState('');

    useEffect(() => {
        console.log(userInfo);
        setUserId(userInfo["userId"])
        setName(userInfo["name"])
        setAddress(userInfo["address"])
        const [username, domain] = userInfo["email"].split('@');
        setUsername(username)
        setDomain(domain)
        setBirth(moment(userInfo["birth"], "yyyy-MM-dd").toDate())
        setGlasses(userInfo["glasses"])
        const [p1, p2, p3] = userInfo["phone"].split('-');
        setPhone1(p1)
        setPhone2(p2)
        setPhone3(p3)
        setGender(userInfo["gender"])
    }, [userInfo]);
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


    const handleGlassesChange = (event) =>{
        setGlasses(event.target.value);
    }
    const handleUserIdChange = (event) =>{
        setUserId(event.target.value);
    };
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleBirthChange = event => {
        setBirth(event);
    };


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleDomainChange = (event) => {
        setDomain(event.target.value);
    };

    const handleAddressChange = (event) =>{
        setAddress(event.target.value);
    };



    const handleUpdateUser = async () => {
        try {
            const token = localStorage.getItem('token')
            const phone = phone1 + '-' + phone2 + '-' + phone3
            const email = username + '@' + domain

            const response = await fetch('http://localhost:8080/user/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
                body: JSON.stringify({ userId, password , name, birth, phone, email, address, gender, glasses}),
                mode: 'cors'
            });

            if (response.ok) {
                response.json().then(data => {
                    console.log('업데이트 완료');
                }).catch(error => {
                    console.error('JSON 파싱 오류:', error);
                });
            } else {
                console.error('가입 실패');
            }

        } catch (error) {
            console.error('오류 발생:', error);
        }
        window.location.reload();
    };

    return (
        <Card>
            <CardBody>
                <>

                    <Box>
                        <Stack mb={5}>
                            <Typography variant="subtitle1"
                                        fontWeight={600} component="label" htmlFor='id' mb="5px">아이디</Typography>
                            <CustomTextField id="id" variant="outlined" fullWidth value={userId} onChange={handleUserIdChange}/>

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
                                        fontWeight={600} component="label" htmlFor='birthday' mb="5px" mt="25px">생년월일</Typography>
                            <DatePicker
                                selected={birth}
                                onChange={handleBirthChange}
                                dateFormat="yyyy-MM-dd"
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={80}
                                placeholderText="Select a date"
                            />


                            <Typography variant="subtitle1"
                                        fontWeight={600} component="label" htmlFor='gender' mb="5px" mt="25px">성별</Typography>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value= 'male'
                                        checked={gender === 'male'}
                                        onChange={handleGenderChange}
                                    />
                                    남성
                                </label>
                                <span style={{ margin: '0 56px' }}></span>
                                <label>
                                    <input
                                        type="checkbox"
                                        value= 'female'
                                        checked={gender === 'female'}
                                        onChange={handleGenderChange}
                                    />
                                    여성
                                </label>
                            </div>

                            <div>
                                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='username' mb="5px" mt="25px">이메일</Typography>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CustomTextField
                                        id="phone_number_1"
                                        variant="outlined"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        style={{ marginRight: '10px' }}
                                    />
                                    <span>@</span>
                                    <CustomTextField
                                        id="phone_number_2"
                                        variant="outlined"
                                        value={domain}
                                        onChange={handleDomainChange}
                                        style={{ margin: '0 10px' }}
                                    />
                                </div>

                            </div>

                            <Typography variant="subtitle1"
                                        fontWeight={600} component="label" htmlFor='gender' mb="5px" mt="25px">안경 착용 여부</Typography>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value = 'ok'
                                        checked={glasses === 'ok'}
                                        onChange={handleGlassesChange}
                                    />
                                    착용
                                </label>
                                <span style={{ margin: '0 56px' }}></span>
                                <label>
                                    <input
                                        type="checkbox"
                                        value = 'no'
                                        checked={glasses === 'no'}
                                        onChange={handleGlassesChange}
                                    />
                                    미착용
                                </label>
                            </div>

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
                                        fontWeight={600} component="label" htmlFor='address' mb="5px" mt="25px">주소</Typography>
                            <CustomTextField id="address" variant="outlined" fullWidth value={address} onChange={handleAddressChange}/>

                        </Stack>
                        <Button  color="primary" variant="contained" size="large" fullWidth component={Link} to="/UserInfo"  onClick={handleUpdateUser}>
                            Update
                        </Button>
                    </Box>
                </>
            </CardBody>
        </Card>
    );
};

export default UserModify