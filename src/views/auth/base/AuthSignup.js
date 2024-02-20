import React, {useState} from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [agencyId, setAgencyId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [agencyName, setAgencyName] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleAgencyIdChange = (event) =>{
        setAgencyId(event.target.value);
    };

    const handleAgencyNameChange = (event) =>{
        setAgencyName(event.target.value);
    };

    const handleNameChange = (event) =>{
        setName(event.target.value);
    };

    const handlePhoneChange = (event) =>{
        setPhone(event.target.value);
    };



    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordsMatch(confirmPassword === event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordsMatch(password === event.target.value);
    };




    const handleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:8080/agency/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ agencyId, password , agencyName, name, phone}),
                mode: 'cors'
            });

            if (response.ok) {
                response.json().then(data => {
                    console.log('회원가입 성공');
                }).catch(error => {
                    console.error('JSON 파싱 오류:', error);
            });
            } else {
                console.error('로그인 실패');
            }

        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box>
                <Stack mb={5}>
                    <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='id' mb="5px">아이디</Typography>
                    <CustomTextField id="id" variant="outlined" fullWidth value={agencyId} onChange={handleAgencyIdChange}/>

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
                                fontWeight={600} component="label" htmlFor='setPassword' mb="5px" mt="25px">비밀번호 확인</Typography>
                    <CustomTextField
                        id="confirm_password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />

                    {!passwordsMatch && (
                        <Typography color="error" variant="body2">
                            비밀번호가 일치하지 않습니다.
                        </Typography>
                    )}

                    <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='division' mb="5px" mt="25px">소속</Typography>
                    <CustomTextField id="division" variant="outlined" fullWidth value={agencyName} onChange={handleAgencyNameChange}/>

                    <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='name' mb="5px" mt="25px">이름</Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth value={name} onChange={handleNameChange} />

                    <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='phone_number' mb="5px" mt="25px">휴대전화</Typography>
                    <CustomTextField id="phone_number" variant="outlined" fullWidth value={phone} onChange={handlePhoneChange}/>




                </Stack>
                <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/login"  disabled={!passwordsMatch} onClick={handleSignUp}>
                    Sign Up
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegister;
