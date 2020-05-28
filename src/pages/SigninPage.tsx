import React, {useEffect, useState} from 'react';
import '../App.css';
import useReactRouter from 'use-react-router';
import axios from 'axios';

// @ts-ignore
import { Form, Input, Button, Row, Col} from 'antd';

function Signin() {

    const { history} = useReactRouter();

    useEffect(() => {
        if(sessionStorage.getItem('name') != null) history.push("/item");

    }, []);

    const signin = (name : string) => {

        axios.get('http://13.124.59.2:8081/users/signin?name=' + name)

            .then(function (response: any) {
                console.log(response);
                if(response.data !== "") {
                    sessionStorage.setItem('name', name);
                    sessionStorage.setItem('id', response.data)
                    history.push("/item");
                }
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    const onFinish = (values : any) => {
        const name = values.username;
        signin(name);
    };


    return (
        <div style = {{padding : "20% 0 20% 0"}}>
            <Row>
                <Col span={8} offset={8}>
                    <Form
                        onFinish = {onFinish}
                        name="basic"
                        initialValues={{ remember: true }}
                    >
                        <Row>
                            <Col span={12} offset={6}>
                                <Form.Item
                                    label="이름"
                                    name="username"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12} offset={6}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        로그인
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
