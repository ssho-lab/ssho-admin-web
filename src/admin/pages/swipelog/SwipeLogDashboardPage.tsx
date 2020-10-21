import * as React from 'react';
import {Table} from "antd";

interface SwipeLogDashboardPageProps {
    dataSource: []
}

const SwipeLogDashboardPage: React.FC<SwipeLogDashboardPageProps> = ({dataSource}) => {

    const columns = [
        {
            title: '회원 고유 번호',
            dataIndex: 'userId',
            width: 150,
            render: (userId: string) => <span>#{userId}</span>
        },
        {
            title: '상품 고유 번호',
            dataIndex: 'itemId',
            width: 150,
            render: (itemId: string) => <span>#{itemId}</span>
        },
        {
            title: '스와이프 일시',
            dataIndex: 'swipeTime',
            width: 150,
        },
        {
            title: '스와이프 점수',
            dataIndex: 'score',
            width: 150,
        },
        {
            title: '카드셋 번호',
            dataIndex: 'cardSetSeq',
            width: 150,
        },
        {
            title: '카드 번호',
            dataIndex: 'cardSeq',
            width: 150,
        },
    ];

    return (
        <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 50 }} scroll={{ y: 320 }} />
    )
}

export default SwipeLogDashboardPage;
