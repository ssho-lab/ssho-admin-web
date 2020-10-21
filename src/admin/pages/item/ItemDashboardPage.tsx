import * as React from 'react';
import {Button, Table} from "antd";
import TagList from './TagList';

interface ItemDashboardPageProps {
    dataSource: [];
    allTagList: [];
}

interface Tag{
  id: string;
  name: string;
  embedding?: null;
}

interface TagProps{
  expTag: Tag;
  realTagList: Tag[];
}

const ItemDashboardPage: React.FC<ItemDashboardPageProps> = ({dataSource, allTagList}) => {
    const columns = [
        {
            title: '상품 고유 번호',
            dataIndex: 'id',
            width: 150,
            render: (id: string) => <span>#{id}</span>
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
            width: 100,
        },
        {
            title: '상품명',
            dataIndex: 'title',
            width: 150,
        },
        {
            title: '태그 리스트',
            dataIndex: 'tagList',
            render: (tagList: TagProps[]) => <TagList tagListPerItem={tagList} allTagList={allTagList}/>,
        },
        {
            title: '가격',
            dataIndex: 'price',
            width: 100,
        },
        {
            title: '상품 이미지',
            dataIndex: 'imageUrl',
            width: 150,
            render: (imageUrl: string) => <img style={{width: 100, height: "auto"}} src={imageUrl}></img>,
        },
        {
            title: '상품 상세',
            dataIndex: 'link',
            width: 100,
            render: (link: string) => <a href={link} target="_blank"><Button>이동</Button></a>,
        },
    ];

    return (
        <Table columns={columns} rowKey={record => record.id} dataSource={dataSource} pagination={{ pageSize: 50 }} scroll={{ y: 320 }} />
    )
}

export default ItemDashboardPage;
