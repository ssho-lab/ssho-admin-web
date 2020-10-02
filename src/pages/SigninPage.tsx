import React, {useEffect, useState} from 'react';
import '../App.css';
import useReactRouter from 'use-react-router';
import axios from 'axios';

// @ts-ignore
import {Form, Input, Button, Row, Col} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";

function Signin() {

    const {history} = useReactRouter();

    useEffect(() => {
        if (sessionStorage.getItem('name') != null) history.push("/item");

    }, []);

    const signin = (email: string, password: string) => {

        axios.post('http://3.35.129.79:8080/users/signin', {
            email: email,
            password: password
        })
            .then(function (response: any) {
                if (response.data !== null && response.data.token !== "") {

                    const token = response.data.token
                    const name = response.data.name

                    sessionStorage.setItem('token', token)
                    sessionStorage.setItem('name', name)
                    history.push("/item")
                }
            })

            .catch(function (error) {
                console.log(error)
            })
    }

    const onFinish = (values: any) => {
        const email = values.email;
        const password = values.password;
        signin(email, password);
    };


    return (
        <div style={{height: "100vh", padding: "30vh 0 0 0"}}>
            <Row>
                <Col span={8} offset={8}>
                    <Form
                        onFinish={onFinish}
                        name="basic"
                        initialValues={{remember: true}}
                    >
                        <Row>
                            <Col span={18} offset={3}>
                                <Form.Item
                                    name="email"
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" placeholder="이메일" />}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={18} offset={3}>
                                <Form.Item
                                    name="password"
                                >
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />}
                                           type="password"
                                           placeholder="비밀번호"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8} offset={3}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        로그인
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={8} offset={2}>
                                <Form.Item>
                                    <Button onClick={()=>history.push("/signup")} type="primary">
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
