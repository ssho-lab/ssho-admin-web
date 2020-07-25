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

function ItemPage() {
    const [initial, setInitial]: any = useState(true);
    const [productList, setProductList]: any[] = useState([]);
    const [swipeReq, setSwipeReq]: any = useState({startTime : null, swipeList : []});
    const [userId, setUserId]: any = useState<string>();
    const [numOfLikeItems, setNumOfLikeItems]: any = useState<number>();

    const { history} = useReactRouter();

    useEffect(() => {

        if(sessionStorage.getItem('id') == null) history.push("/");

        if(sessionStorage.getItem(('id')) !== null)
            setUserId(sessionStorage.getItem('id'));

        getAllProducts(sessionStorage.getItem("id"));
        getNumOfLikeItems(sessionStorage.getItem("id"));

        const temp = swipeReq;
        temp.startTime = moment().format("YYYY-MM-DD HH:mm:ss");
        setSwipeReq(temp);

    }, []);


    useEffect(() => {
        if (productList.length > 0 && initial) {
            const temp = productList;
            temp.forEach((t: any) => {
                t.like = false
            });
            setProductList(temp);
            setInitial(false);
        }
    }, [productList])

    const getAllProducts = (userId : any) => {

        axios.get('http://13.124.59.2:8081/item/test?userId=' + userId)

            .then(function (response: any) {
                setProductList(response.data);
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    const getNumOfLikeItems = (userId : any) => {
        axios.get('http://13.124.59.2:8081/item/test/like?userId=' + userId)

            .then(function (response: any) {
                setNumOfLikeItems(response.data.length);
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    const saveLogs = () => {

        const temp  = swipeReq;
        const swipeList = temp.swipeList;

        productList.forEach((p : any) => {

            const swipe =
                {
                    userId : "",
                    itemId : "",
                    score : 0,
                    swipeTime : null
                }

                console.log(p);

                swipe.userId = userId;
                swipe.itemId = p.id;
                swipe.score = p.like ? 1 : 0
                swipe.swipeTime = swipeReq.startTime;

                swipeList.push(swipe);
        })

        temp.swipeList = swipeList;
        setSwipeReq(temp);

        axios.post('http://13.124.59.2:8082/log/swipe', swipeReq)

            .then(function (response: any) {
                setProductList([]);
                getNumOfLikeItems(sessionStorage.getItem("id"));
                getAllProducts(userId);
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    const setLike = (itemId: number) => {

        const temp = productList;

        temp.forEach((item: any) => {
            if (item.id === itemId) {
                item.like = !item.like;
            }
        });
        setProductList(temp);
    }

    return (
        <div style={{paddingTop: "50px", paddingBottom: "50px"}}>
            <Row>
                <Col offset={2}><h1>스쇼 테스트 페이지</h1></Col>
            </Row>
            <Row>
                {sessionStorage.getItem('name') && <Col offset={2}><h4>{sessionStorage.getItem('name')}님 안녕하세요</h4></Col>}
            </Row>
            <Row>
                {numOfLikeItems && <Col offset={2}><h4>좋아요 한 상품 수 : {numOfLikeItems}개</h4></Col>}
            </Row>
            <Row>
                <Col offset={7} span={4}>
                    <Button onClick={()=>{
                        saveLogs()
                    }}style={{height : "50px", color : "black", fontSize : "15px"}}>다음</Button>
                </Col>
                <Col offset={2} span={4}>
                    <Button onClick={()=>{
                        history.push("/item/like");
                    }}style={{height : "50px", color : "black", fontSize : "15px"}}>좋아요 한 상품 보기</Button>
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

                {productList.length > 0 && productList.map((p: any, key: any) =>

                    <Col key={key} style={{cursor: "pointer", marginTop: "5vh"}} span={4}>
                        <div style={{textAlign: "right"}}>
                            <HeartOutlined
                                onClick={(e: any) => {
                                    if(p.like === true) e.target.style.color = 'black'
                                    else e.target.style.color = 'red';
                                    setLike(p.id);
                                }} style={{
                                fontSize: "50px",
                                position: "relative",
                                top: 50,
                                zIndex: 100
                            }}/>
                        </div>
                        <Row>
                            <Col offset={0} span={24}>
                                <img style={{border: "none", borderRadius: "10px"}}
                                     src={p.imageUrl}></img>
                            </Col>
                        </Row>
                        <div style={{marginTop : "20px"}}>
                            <Row>
                                <Col offset={0} span={24}>
                                    <h4>{p.title}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={0} span={24}>
                                    <h4>{p.mallNm}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={0} span={24}>
                                    <h4>{new Intl.NumberFormat().format(p.price)}원</h4>
                                </Col>
                            </Row>
                        </div>

                    </Col>
                )}

            </GridLayout>
        </div>
    );
}

export default ItemPage;
