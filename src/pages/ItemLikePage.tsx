import React, {useEffect, useState} from 'react';
import '../App.css';

// @ts-ignore
import {GridLayout} from "@egjs/react-infinitegrid";
import axios from 'axios';

import {HeartOutlined} from '@ant-design/icons';

// @ts-ignore
import {Row, Col, Button} from "antd";
import useReactRouter from 'use-react-router';

import moment from 'moment'

function ItemLikePage() {

    const { history} = useReactRouter();

    const [likeItemList, setLikeItemList]: any[] = useState([]);
    const [userId, setUserId]: any = useState<string>();

    const getLikeItems = (userId : any) => {
        axios.get('http://13.124.59.2:8081/item/test/like?userId=' + userId)

            .then(function (response: any) {
                setLikeItemList(response.data);
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {

        if(sessionStorage.getItem('id') == null) history.push("/");

        if(sessionStorage.getItem(('id')) !== null)
            setUserId(sessionStorage.getItem('id'));

        getLikeItems(sessionStorage.getItem("id"));

    }, []);


    return (
        <div style={{paddingTop: "50px"}}>
            <Row>
                <Col offset={2}><h1>스쇼 테스트 페이지</h1></Col>
            </Row>
            <Row>
                {sessionStorage.getItem('name') && <Col offset={2}><h4>{sessionStorage.getItem('name')}님 안녕하세요</h4></Col>}
            </Row>
            <Row>
                <Col offset={10} span={4}>
                    <Button onClick={()=>{
                        history.push("/item");
                    }}style={{height : "50px", color : "black", fontSize : "12px"}}>상품 페이지로 돌아가기</Button>
                </Col>
            </Row>
            <GridLayout

                className="gridlayout container"

                options={{
                    isOverflowScroll: false,
                    useFit: true,
                    useRecycle: true,
                    horizontal: false,
                }}

                layoutOptions={{
                    margin: 5,
                    align: "center",
                }}>

                {likeItemList.length > 0 && likeItemList.map((p: any, key: any) =>

                    <Col key={key} style={{cursor: "pointer", marginTop: "5vh"}} span={4}>
                        <Row>
                            <Col offset={0} span={24}>
                                <img style={{border: "none", borderRadius: "10px"}}
                                     src={p.imageUrl}></img>
                            </Col>
                        </Row>
                        <div style={{marginTop : "20px"}}>
                            <Row>
                                <Col offset={0} span={24}>
                                    <h4 style={{fontSize: "12px"}}>{p.title}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={0} span={24}>
                                    <h4 style={{fontSize: "12px"}}>{p.mallNm}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={0} span={24}>
                                    <h4 style={{fontSize: "12px"}}>{new Intl.NumberFormat().format(p.price)}원</h4>
                                </Col>
                            </Row>
                        </div>

                    </Col>
                )}

            </GridLayout>
        </div>
    );
}

export default ItemLikePage;
