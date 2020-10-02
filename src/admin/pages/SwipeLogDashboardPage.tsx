import * as React from 'react';
import {Layout, Menu, message, Table} from "antd";
const { Header, Content, Footer, Sider } = Layout;

interface SwipeLogDashboardPageProps {
    dataSource: []
}

const SwipeLogDashboardPage: React.FC<SwipeLogDashboardPageProps> = ({dataSource}) => {

    const columns = [
        {
            title: '회원 고유 번호',
            dataIndex: 'userId',
            width: 150,
        },
        {
            title: '상품 고유 번호',
            dataIndex: 'itemId',
            width: 150,
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
        <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
    )
}

export default SwipeLogDashboardPage;
