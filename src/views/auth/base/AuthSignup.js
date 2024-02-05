import React, {useState} from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };
    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordsMatch(confirmPassword === event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordsMatch(password === event.target.value);
    };

    const handleSubmit = () => {
        if (passwordsMatch) {
            // 비밀번호와 비밀번호 재확인이 일치하므로 회원 가입 처리 가능
            console.log('회원 가입 정보 전송');
        } else {
            // 비밀번호가 일치하지 않을 때의 처리
            console.log('비밀번호가 일치하지 않습니다.');
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
                    <CustomTextField id="id" variant="outlined" fullWidth />

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
                    <CustomTextField id="division" variant="outlined" fullWidth />

                    <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='name' mb="5px" mt="25px">이름</Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth />

                    <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='birthday' mb="5px" mt="25px">생년월일</Typography>
                    <CustomTextField id="birthday" variant="outlined" fullWidth />

                    <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='gender' mb="5px" mt="25px">성별</Typography>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <label>
                            <input
                                type="checkbox"
                                value="male"
                                checked={selectedGender === 'male'}
                                onChange={handleGenderChange}
                            />
                            남성
                        </label>
                        <span style={{ margin: '0 56px' }}></span>
                        <label>
                            <input
                                type="checkbox"
                                value="female"
                                checked={selectedGender === 'female'}
                                onChange={handleGenderChange}
                            />
                            여성
                        </label>
                    </div>

                    <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">이메일</Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth />


                    <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='role' mb="5px" mt="25px">직무</Typography>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <label>
                            <input
                                type="checkbox"
                                value="admin"
                                checked={selectedRole === 'admin'}
                                onChange={handleRoleChange}
                            />
                            관리자
                        </label>
                        <span style={{ margin: '0 50px' }}></span>
                        <label>
                            <input
                                type="checkbox"
                                value="worker"
                                checked={selectedRole === 'worker'}
                                onChange={handleRoleChange}
                            />
                            근로자
                        </label>
                    </div>

                    <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='phone_number' mb="5px" mt="25px">휴대전화</Typography>
                    <CustomTextField id="phone_number" variant="outlined" fullWidth />

                    <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='address' mb="5px" mt="25px">주소</Typography>
                    <CustomTextField id="address" variant="outlined" fullWidth />

                    <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='note' mb="5px" mt="25px">특이사항</Typography>
                    <CustomTextField id="note" variant="outlined" fullWidth />

                </Stack>
                <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/auth/login"  disabled={!passwordsMatch} onClick={handleSubmit}>
                    Sign Up
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegister;
