import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const [agencyId, setAgencyId] = useState(''); // 변경된 부분
    const [password, setPassword] = useState('');
    const [rememberDevice, setRememberDevice] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/agency/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ agencyId, password }),
                mode: 'cors'
            });

            if (response.ok) {
                response.json().then(data => {
                    const token = data.token;
                    console.log(token);

                    localStorage.setItem('token', token);
                    localStorage.setItem('agencyId', agencyId);
                    localStorage.setItem('password', password);
                    navigate('/starter');
                    setIsLoggedIn(true);
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

            <Stack>
                <Box>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='email' mb="5px">
                        이메일
                    </Typography>
                    <CustomTextField
                        id="email"
                        variant="outlined"
                        fullWidth
                        value={agencyId}
                        onChange={(e) => setAgencyId(e.target.value)} // 변경된 부분
                    />
                </Box>
                <Box mt="25px">
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='password' mb="5px">
                        비밀번호
                    </Typography>
                    <CustomTextField
                        id="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>
                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={rememberDevice} onChange={() => setRememberDevice(!rememberDevice)} />}
                            label="기기에 정보 저장"
                        />
                    </FormGroup>
                </Stack>
            </Stack>
            <Box>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleLogin}
                >
                    로그인
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthLogin;
