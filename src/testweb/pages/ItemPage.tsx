import React, {useEffect, useState} from 'react';
import '../../App.css';

// @ts-ignore
import {GridLayout} from "@egjs/react-infinitegrid";
import axios from 'axios';

import {HeartOutlined} from '@ant-design/icons';

// @ts-ignore
import {Button, Col, Row} from "antd";
import useReactRouter from 'use-react-router';

import moment from 'moment'
import {RotateLoader} from "react-spinners";
import API_ENDPOINTS from "../../endpoints";

interface ItemPageProps {
}

const ItemPage: React.FC<ItemPageProps> = () => {

    const [initial, setInitial]: any = useState(true);
    const [itemList, setItemList]: any[] = useState([]);
    const [swipeReq, setSwipeReq]: any = useState({startTime: null, swipeList: []});
    const [token, setToken]: any = useState<string>();

    const [numOfSets, setNumOfSets]: any = useState<number>();
    const [numOfLikes, setNumOfLikes]: any = useState<number>();

    const {history} = useReactRouter();

    useEffect(() => {

        // 토큰이 없을 경우 홈으로 라우팅
        if (sessionStorage.getItem('token') === null) {
            history.push("/")
        } else {
            setToken(sessionStorage.getItem('token'))
        }

        // 상품 리스트 전체 조회
        getAllItemList(sessionStorage.getItem("token"))

        // 세트, 좋아요 수 조회
        getNumOfSetsAndNumOfLikes(sessionStorage.getItem("token"))

        // 스와이프 시각 리셋
        resetSwipeReq()

    }, [])

    /*
    useEffect(() => {
        if (swipeReq.swipeList.length === 0 && swipeReq.startTime !== null) {
            getAllItemList(sessionStorage.getItem("token"))
        }
    }, [swipeReq.swipeList, swipeReq.startTime])

     */


    /*
    useEffect(() => {

        if (itemList.length > 0 && initial) {

            const temp = itemList;
            temp.forEach((t: any) => {
                t.like = false
            });

            setItemList(temp);
            setInitial(false);
        }
    }, [itemList])

     */

    const resetSwipeReq = () => {
        setSwipeReq({startTime: moment().format("YYYY-MM-DD HH:mm:ss"), swipeList: []})
    }

    const getAllItemList = (token: any) => {
        axios.get('http://3.35.129.79:8080/cache/user-item', {
            headers: {
                Authorization: token
            }
        })

            .then(function (response: any) {
                setItemList(response.data.itemList);
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    const getNumOfSetsAndNumOfLikes = (token: any) => {
        axios.get(API_ENDPOINTS.ITEM_API + 'item/shopping-bag', {
            headers: {
                Authorization: token
            }
        })
            .then(function (response: any) {
                setNumOfSets(response.data.length);

                let likeSum = 0;

                response.data.forEach((set: any) => {
                    likeSum += set.length;
                })

                setNumOfLikes(likeSum);
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    const updateNumOfLikesAndSets = (swipeList: []) => {
        let likeSum = 0
        swipeList.forEach((swipe: any) => {
            if (swipe.score === 1) {
                likeSum += swipe.score
            }
        })
        setNumOfLikes(numOfLikes + likeSum)
        setNumOfSets(numOfSets + 1)
    }

    const saveLogs = (token: any) => {

        const temp = swipeReq;
        const swipeList = temp.swipeList;

        itemList.forEach((p: any, key: number) => {

            const swipe =

                {
                    itemId: "",
                    score: 0,
                    cardSeq: 0,
                    swipeTime: null,
                    realTagList: [],
                    expTagList: []
                }

            swipe.itemId = p.id;
            swipe.score = p.like ? 1 : 0
            swipe.cardSeq = key;
            swipe.swipeTime = swipeReq.startTime;
            swipe.realTagList = p.realTagList;
            swipe.expTagList = p.expTagList;

            swipeList.push(swipe);
        })

        temp.swipeList = swipeList;
        setSwipeReq(temp);

        axios.post(API_ENDPOINTS.LOG_API + '/log/swipe', swipeReq, {
            headers: {
                Authorization: token
            }
        })
            .then(function (response: any) {
                updateNumOfLikesAndSets(swipeList)
                setItemList([])
                resetSwipeReq()
                getAllItemList(sessionStorage.getItem("token"))
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    const setLike = (itemId: number) => {

        const temp = itemList;

        temp.forEach((item: any) => {
            if (item.id === itemId) {
                item.like = !item.like;
            }
        });

        setItemList(temp);
    }

    return (
        <div style={{paddingTop: "50px", paddingBottom: "50px"}}>
            {itemList.length === 0 &&
            <div>
                <Row style={{margin: "30vh 0 10vh 0"}}>
                    <Col offset={12} span={2}>
                        <RotateLoader
                            size={18}
                            color={"#123abc"}
                            loading={itemList.length === 0}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col offset={10} span={6}>
                        <span style={{textAlign: "center", fontSize: "20px"}}>카드를 불러오고 있습니다.</span>
                    </Col>
                </Row>
            </div>

            }
            {itemList.length > 0 &&
            <div>
                <Row>
                    <Col offset={2}><h1>스쇼 테스트 페이지</h1></Col>
                </Row>
                <Row>
                    {sessionStorage.getItem('name') &&
                    <Col offset={2}><h4>{sessionStorage.getItem('name')}님 안녕하세요</h4></Col>}
                </Row>
                <Row>
                    <Col offset={2}><h4>진행한 세트 수 : {numOfSets}개</h4></Col>
                </Row>
                <Row>
                    <Col offset={2}><h4>좋아요한 상품 수 : {numOfLikes}개</h4></Col>
                </Row>
                <Row style={{marginTop: "50px"}}>
                    <Col offset={4} span={4}>
                        <Button onClick={() => {
                            saveLogs(sessionStorage.getItem('token'))
                        }} style={{height: "50px", color: "black", fontSize: "12px"}}>다음</Button>
                    </Col>
                    <Col offset={2} span={4}>
                        <Button onClick={() => {
                            history.push("/item/shopping-bag");
                        }} style={{height: "50px", color: "black", fontSize: "12px"}}>좋아요 한 상품 보기</Button>
                    </Col>
                    <Col offset={2} span={4}>
                        <Button onClick={() => {
                            sessionStorage.clear()
                            history.push("/")
                        }} style={{height: "50px", color: "black", fontSize: "12px"}}>로그아웃</Button>
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
                    {itemList.length > 0 && itemList.map((p: any, key: any) =>
                        <Col key={key} style={{cursor: "pointer", marginTop: "5vh"}} span={4}>
                            <div style={{textAlign: "right"}}>
                                <HeartOutlined
                                    onClick={(e: any) => {
                                        if (p.like === true) e.target.style.color = 'black'
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
                                         src={p.imageUrl}/>
                                </Col>
                            </Row>
                            <div style={{marginTop: "20px"}}>
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
            }

        </div>
    );
}

export default ItemPage;
