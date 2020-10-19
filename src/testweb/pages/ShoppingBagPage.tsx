import React, {useEffect, useState} from 'react';
import '../../App.css';

// @ts-ignore
import {GridLayout} from "@egjs/react-infinitegrid";
import axios from 'axios';

// @ts-ignore
import {Button, Col, Row} from "antd";
import useReactRouter from 'use-react-router';
import API_ENDPOINTS from "../../endpoints";

interface ShoppingBagPageProps {}

const ShoppingBagPage: React.FC<ShoppingBagPageProps> = () => {

    const {history} = useReactRouter();

    const [likeItemList, setLikeItemList]: any[] = useState([]);
    const [token, setToken]: any = useState<string>();
    const [setClicked, setSetClicked]: any = useState(false);
    const [clickedSetId, setClickedSetId]: any = useState(0);

    const getLikeItems = (token: any) => {
        axios.get(API_ENDPOINTS.ITEM_API + '/item/shopping-bag', {
            headers: {
                Authorization: token
            }
        })
            .then(function (response: any) {
                console.log(response.data);
                setLikeItemList(response.data);
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {

        if (sessionStorage.getItem('token') == null) history.push("/");

        if (sessionStorage.getItem(('token')) !== null)
            setToken(sessionStorage.getItem('token'));

        getLikeItems(sessionStorage.getItem("token"));

    }, []);


    return (
        <div style={{paddingTop: "50px"}}>
            <Row>
                <Col offset={2}><h1>스쇼 테스트 페이지</h1></Col>
            </Row>
            <Row>
                {sessionStorage.getItem('name') &&
                <Col offset={2}><h4>{sessionStorage.getItem('name')}님 안녕하세요</h4></Col>}
            </Row>
            <Row>
                {
                    !setClicked &&
                    <Col offset={10} span={4}>
                        <Button onClick={() => {
                            history.push("/item");
                        }} style={{height: "50px", color: "black", fontSize: "12px"}}>상품 페이지로 돌아가기</Button>
                    </Col>
                }
                {
                    setClicked &&
                    <Col offset={10} span={4}>
                        <Button onClick={() => {
                            setSetClicked(false);
                        }} style={{height: "50px", color: "black", fontSize: "12px"}}>세트 기록으로 돌아가기</Button>
                    </Col>
                }
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

                {!setClicked && likeItemList.length > 0 && likeItemList.map((likeItem: any, key: any) =>

                    <Col key={key} style={{cursor: "pointer", marginTop: "5vh"}} onClick={() => {
                        setClickedSetId(key);
                        setSetClicked(true)
                    }} span={4}>
                        <Row>
                            <Col offset={0} span={24}>
                                <img style={{border: "none", borderRadius: "10px", cursor: "pointer"}}
                                     src={likeItem[0].imageUrl}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col offset={0} span={24}>
                                <h4 style={{fontSize: "25px", textAlign: "center"}}>세트 {key + 1}</h4>
                            </Col>
                        </Row>
                    </Col>
                )}

                {setClicked && likeItemList.length > 0 && likeItemList[clickedSetId].map((likeItem: any, key: any) =>
                    <Col key={key} style={{cursor: "pointer", marginTop: "5vh"}} span={4}>
                        <Row>
                            <Col offset={0} span={24}>
                                <img style={{border: "none", borderRadius: "10px"}}
                                     src={likeItem.imageUrl}/>
                            </Col>
                        </Row>
                        <div style={{marginTop: "20px"}}>
                            <Row>
                                <Col offset={0} span={24}>
                                    <h4 style={{fontSize: "12px"}}>{likeItem.title}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={0} span={24}>
                                    <h4 style={{fontSize: "12px"}}>{likeItem.mallNm}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={0} span={24}>
                                    <h4 style={{fontSize: "12px"}}>{new Intl.NumberFormat().format(likeItem.price)}원</h4>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                )}
            </GridLayout>
        </div>
    );
}

export default ShoppingBagPage;
