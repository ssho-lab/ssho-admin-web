import * as React from 'react';
import {Button, Table} from "antd";
import TagList from './TagList';
import {Category} from "../../model/category/CategoryModel";
import {Tag} from "../../model/tag/TagModel";
import {Mall} from "../../model/mall/MallModel";
import NumberFormat from 'react-number-format';

interface ItemDashboardPageProps {
    itemList: any[],
    allTagList: Tag[],
    mallList: Mall[]
}

const ItemDashboardPage: React.FC<ItemDashboardPageProps> = ({itemList, allTagList, mallList}) => {

    const columns = [
        {
            title: '상품 번호',
            dataIndex: 'id',
            width: 110,
            render: (id: string) => <span style={{fontSize: "10px"}}>{id}</span>
        },
        {
            title: '몰명',
            dataIndex: 'mallNm',
            width: 80,
            filters: mallList.map(mall => {
                return({
                    text: mall.name,
                    value: mall.name
                })
            }),
            onFilter: (value: any, record: any) => record.mallNm.indexOf(value) === 0,
            render: (mallNm: string) => <span style={{fontSize: "10px"}}>{mallNm}</span>
        },
        {
            title: '카테고리',
            dataIndex: 'category',
            width: 100,
            filters: [{text: "TOP", value: "TOP"}, {text: "BOTTOM", value: "BOTTOM"}, {text: "SKIRT", value: "SKIRT"}, {text: "OUTER", value: "OUTER"}, {text: "DRESS", value: "DRESS"},
                {text: "SHOES", value: "SHOES"}, {text: "HAT", value: "HAT"}, {text: "EXTRA", value: "EXTRA"}],
            onFilter: (value: any, record: any) => {
                let filtered = false;
                record.category.forEach((cat: Category) => {
                    if(cat.catCd.indexOf(value) === 0){
                        filtered = true;
                    }
                })
                return filtered;
            },
            render: (categoryList: Category[]) => categoryList.map(category => {
                return <div><span style={{fontSize: "10px"}}>{category.mallCatNm}</span></div>
            })
        },
        {
            title: '상품명',
            dataIndex: 'title',
            width: 100,
            render: (title: string) => <span style={{fontSize: "10px"}}>{title}</span>
        },
        {
            title: '태그 리스트',
            dataIndex: 'tagList',
            width: 220,
            render: (tagList: Tag[], record: any) => <TagList itemId={record.id} tagListPerItem={tagList} allTagList={allTagList}/>,
        },
        {
            title: '가격',
            dataIndex: 'price',
            width: 100,
            render: (price: string) => <span style={{fontSize: "10px"}}><NumberFormat displayType={'text'} value={price} thousandSeparator={true} suffix={'원'}/></span>

        },
        {
            title: '상품 이미지',
            dataIndex: 'imageUrl',
            width: 150,
            render: (imageUrl: string) => <img style={{width: 100, height: "auto"}} src={imageUrl}></img>,
        },
        /*
        {
            title: '노출 횟수',
            dataIndex: 'showCount',
            width: 100,
            render: (showCount: number) => <span style={{fontSize: '10px'}}>{showCount}</span>,
            sorter: (a: any, b: any) => b.showCount-a.showCount,
        },

         */
        {
            title: '상품 상세',
            dataIndex: 'link',
            width: 100,
            render: (link: string) => <a href={link} target="_blank"><Button>이동</Button></a>,
        }
    ];

    return (
        <Table columns={columns} rowKey={record => record.id} dataSource={itemList} pagination={{ pageSize: 50 }} scroll={{ y: 320 }} />
    )
}

export default ItemDashboardPage;
