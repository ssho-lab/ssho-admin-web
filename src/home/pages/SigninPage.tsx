import React, {useEffect, useState} from 'react';
import '../../App.css';
import useReactRouter from 'use-react-router';
import axios from 'axios';

// @ts-ignore
import {Form, Input, Button, Row, Col, message} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";

function Signin() {

    const {history} = useReactRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (sessionStorage.getItem('name') != null) history.push("/item");

    }, []);

    const signin = (email: string, password: string, adminLogin: boolean) => {

        axios.post('http://3.35.129.79:8080/users/signin', {
            email: email,
            password: password
        })
            .then(function (response: any) {
                if (response.data !== null && response.data.token !== "") {

                    const { token, name, admin } = response.data

                    sessionStorage.setItem('token', token)
                    sessionStorage.setItem('name', name)
                    sessionStorage.setItem('admin', admin)

                    if(adminLogin){
                        if(admin) {
                            history.push("/admin")
                        }
                        else{
                            message.error('관리자가 아닙니다.');
                        }
                    }
                    else{
                        history.push("/item")
                    }
                }
            })

            .catch(function (error) {
                message.error('로그인에 실패했습니다.');
            })
    }

    const onFinish = (email: string, password: string, adminLogin: boolean) => {
        signin(email, password, adminLogin);
    };


    return (
        <div style={{height: "100vh", padding: "30vh 0 0 0"}}>
            <Row>
                <Col span={8} offset={8}>
                    <Form
                        name="basic"
                        initialValues={{remember: true}}
                    >
                        <Row>
                            <Col span={18} offset={3}>
                                <Form.Item
                                    name="email">
                                    <Input onChange={(e)=>setEmail(e.target.value)} prefix={<UserOutlined className="site-form-item-icon"/>}
                                           placeholder="이메일"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={18} offset={3}>
                                <Form.Item
                                    name="password">
                                    <Input onChange={(e)=>setPassword(e.target.value)} prefix={<LockOutlined className="site-form-item-icon" />}
                                           type="password"
                                           placeholder="비밀번호"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} offset={3}>
                                <Form.Item>
                                    <Button onClick={()=>onFinish(email, password, false)} type="primary">
                                        로그인
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={8} offset={2}>
                                <Form.Item>
                                    <Button onClick={()=>onFinish(email, password, true)} type="primary">
                                        관리자 로그인
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={18} offset={3}>
                                <Form.Item>
                                    <Button onClick={()=>history.push("/signup")} type="default">
                                        회원가입
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

        </div>
    );
}

export default Signin;
