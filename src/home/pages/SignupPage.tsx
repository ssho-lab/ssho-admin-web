import React, {useEffect, useState} from 'react';
import '../../App.css';
import useReactRouter from 'use-react-router';
import axios from 'axios';

// @ts-ignore
import {Button, Col, Form, Input, message, Row,} from 'antd';

interface SignupPageProps {}

const SignupPage: React.FC<SignupPageProps> = () => {

    const [form] = Form.useForm();

    const {history} = useReactRouter()

    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 8},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    const success = () => {
        message.success('회원가입에 성공했습니다.');
    };

    useEffect(() => {
        if (sessionStorage.getItem('name') != null) history.push("/item");

    }, []);

    const saveUser = (email: string, password: string, name: string) => {

        axios.post('http://3.35.129.79:8080/users/signup', {
            email: email,
            password: password,
            name: name
        })
            .then(function (response: any) {
                if(response.status === 200) {
                    success()
                    history.push("/")
                }
            })

            .catch(function (error) {
                console.log(error)
            })
    }

    const onFinish = (values: any) => {
        const {email, password, name} = values
        saveUser(email, password, name)
    };

    return (
        <div style={{padding: "150px 0 0 0"}}>
            <Row>
                <Col span={12} offset={5}>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="email"
                            label="이메일"
                            dependencies={['email']}
                            rules={[
                                {
                                    type: 'email',
                                    message: '이메일 형식이 아닙니다.',
                                },
                                {
                                    required: true,
                                    message: '이메일을 입력해주세요.',
                                },
                                () => ({
                                    validator(rule, value) {
                                        return new Promise((resolve, reject) => {
                                            axios.get('http://3.35.129.79:8080/users/check?email=' + value)
                                                .then(function (response: any) {
                                                    if(response.data === true) {
                                                        reject('이미 등록된 이메일입니다.');
                                                    }
                                                    else{
                                                        resolve();
                                                    }
                                                })
                                        })
                                    },
                                })
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="비밀번호"
                            rules={[
                                {
                                    required: true,
                                    message: '비밀번호를 입력해주세요.',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="비밀번호 확인"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '비밀번호 확인을 입력해주세요.',
                                },
                                ({getFieldValue}) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('위의 비밀번호와 일치하지 않습니다.');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item
                            name="name"
                            label="이름"
                            rules={[{required: true, message: '이름을 입력해주세요.', whitespace: true}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                회원가입
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>

    );
}

export default SignupPage;
