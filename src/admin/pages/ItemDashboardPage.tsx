import * as React from 'react';
import {Layout, Menu, message, Table} from "antd";
const { Header, Content, Footer, Sider } = Layout;

interface ItemDashboardPageProps {
    dataSource: []
}

const ItemDashboardPage: React.FC<ItemDashboardPageProps> = ({dataSource}) => {

    const columns = [
        {
            title: '상품 고유 번호',
            dataIndex: 'id',
            width: 150,
        },
        {
            title: '몰명',
            dataIndex: 'mallNm',
            width: 150,
            filters: [
                {
                    text: '스타일난다',
                    value: '스타일난다',
                },
                {
                    text: '비바스튜디오',
                    value: '비바스튜디오',
                },
                {
                    text: '토마스모어',
                    value: '토마스모어',
                },
                {
                    text: '룩앳민',
                    value: '룩앳민',
                }],
            onFilter: (value: any, record: any) => record.mallNm.indexOf(value) === 0
        },
        {
            title: '카테고리',
            dataIndex: 'category',
        },
        {
            title: '상품명',
            dataIndex: 'title',
        },
        {
            title: '가격',
            dataIndex: 'price',
        },
        {
            title: '상품 이미지',
            dataIndex: 'imageUrl',
            render: (imageUrl: string) => <img style={{width: 100, height: "auto"}} src={imageUrl}></img>,
        },
    ];

    return (
        <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
    )
}

export default ItemDashboardPage;
