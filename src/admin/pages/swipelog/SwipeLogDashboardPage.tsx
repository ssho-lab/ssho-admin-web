import React, {useState} from 'react';
import {Table} from "antd";

interface SwipeLogDashboardPageProps {
    dataSource: any
}


const SwipeLogDashboardPage: React.FC<SwipeLogDashboardPageProps> = ({dataSource}) => {
    
    const cardColumns = [
        {title: '아이템 고유번호', dataIndex: 'itemId', key: 'itemId'},
        {title: '좋아요 여부', dataIndex: 'score', key: 'score', render: (score: number) => <span>{score===1 ? '좋아요' : '싫어요'}</span>}
    ];

    const setColumns = [
        {title: '카드셋 번호', dataIndex: 'setId', key: 'setId'},
        {title: '좋아요 비율', dataIndex: 'likeRatio', key: 'likeRatio'},
        {title: '슈퍼라이크 비율', dataIndex: 'superLikeRatio', key: 'superLikeRatio'},            
    ]

    const columns = [
        {
            title: '회원 고유 번호',
            dataIndex: 'userId',
            width: 150,
            render: (userId: string) => <span>#{userId}</span>
        },
        {
            title: '세트 개수',
            dataIndex: 'setCount',
            key: 'setCount',
            width: 150,
        }
    ];




    return (
        <Table columns={columns} 
            expandable={{expandedRowRender: record => <Table columns={setColumns} 
                expandable={{expandedRowRender: record => <Table columns={cardColumns} 
                    dataSource={record.cardList.map((data: any, idx: any) =>{return {...data, key: idx}})}/>}} 
                dataSource={record.setList.map((data: any, idx: any) =>{return {...data, key: idx}})}/>}} 
            dataSource={dataSource.map((data: any, idx: any) =>{return {...data, key: idx}})} pagination={{ pageSize: 50 }} scroll={{ y: 320 }} />
    )
}

export default SwipeLogDashboardPage;
