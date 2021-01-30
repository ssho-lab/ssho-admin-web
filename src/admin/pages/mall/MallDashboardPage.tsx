import * as React from 'react';
import {useState} from 'react';
import { Button, Table, Select, Descriptions } from "antd";
import TagList from '../item/TagList';
import { Category } from "../../model/category/CategoryModel";
import { Tag } from "../../model/tag/TagModel";
import { Mall } from "../../model/mall/MallModel";
import NumberFormat from 'react-number-format';

const {Option} = Select;
interface MallDashboardPageProps {
    itemList: any[],
    allTagList: Tag[],
    mallList: Mall[]
}

const MallDashboardPage: React.FC<MallDashboardPageProps> = ({ itemList, allTagList, mallList }) => {

    const columns = [
        {
            title: '상품 번호',
            dataIndex: 'id',
            width: 110,
            render: (id: string) => <span style={{ fontSize: "10px" }}>{id}</span>
        },
        {
            title: '카테고리',
            dataIndex: 'category',
            width: 100,
            filters: [{ text: "TOP", value: "TOP" }, { text: "BOTTOM", value: "BOTTOM" }, { text: "SKIRT", value: "SKIRT" }, { text: "OUTER", value: "OUTER" }, { text: "DRESS", value: "DRESS" },
            { text: "SHOES", value: "SHOES" }, { text: "HAT", value: "HAT" }, { text: "EXTRA", value: "EXTRA" }],
            onFilter: (value: any, record: any) => {
                let filtered = false;
                record.category.forEach((cat: Category) => {
                    if (cat.catCd.indexOf(value) === 0) {
                        filtered = true;
                    }
                })
                return filtered;
            },
            render: (categoryList: Category[]) => categoryList.map(category => {
                return <div><span style={{ fontSize: "10px" }}>{category.mallCatNm}</span></div>
            })
        },
        {
            title: '상품명',
            dataIndex: 'title',
            width: 100,
            render: (title: string) => <span style={{ fontSize: "10px" }}>{title}</span>
        },
        {
            title: '태그 리스트',
            dataIndex: 'tagList',
            width: 220,
            render: (tagList: Tag[], record: any) => <TagList itemId={record.id} tagListPerItem={tagList} allTagList={allTagList} />,
        },
        {
            title: '가격',
            dataIndex: 'price',
            width: 100,
            render: (price: string) => <span style={{ fontSize: "10px" }}><NumberFormat displayType={'text'} value={price} thousandSeparator={true} suffix={'원'} /></span>

        },
        {
            title: '상품 이미지',
            dataIndex: 'imageUrl',
            width: 150,
            render: (imageUrl: string) => <img style={{ width: 100, height: "auto" }} src={imageUrl}></img>,
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

    const [mallInfo, setMallInfo] = useState<Mall>({id: "", name: "", categoryList: [], tagList: [], lastSyncTime: ""});
    const [mallItemList, setMallItemList] = useState<any[]>([]);

    const onSelectMall = (value: any) => {
        const info: any = mallList.find(mall => mall.name === value)
        setMallInfo(info);
        setMallItemList(itemList.filter(item => item.mallNm === value));
    }

    return (
        <div style={{textAlign: 'left'}}>
            <Select showSearch style={{ width: 200, marginBottom: 40 }} placeholder="몰 검색" optionFilterProp="children" filterOption={(input: string, option : any) => option.children.indexOf(input)>= 0} onSelect={(value: any) => onSelectMall(value)}>
                {mallList.map(mall => <Option value={mall.name}>{mall.name}</Option>)}
            </Select>
            {mallInfo.name && 
            <div style={{marginBottom: 40, border: '1px solid black'}} >
                <Descriptions layout="vertical" bordered size="small" column={{ xxl: 5, xl: 5, lg: 5, md: 3, sm: 2, xs: 1 }}>
                    <Descriptions.Item label="몰명">{mallInfo.name}</Descriptions.Item>
                    <Descriptions.Item label="카테고리">{mallInfo.categoryList.map((cate: Category) => cate.mallCatNm).join(", ")}</Descriptions.Item>
                    <Descriptions.Item label="태그">{mallInfo.tagList.map((tag: Tag) => tag.name).join(", ")}</Descriptions.Item>
                    <Descriptions.Item label="싱크시간">{mallInfo.lastSyncTime}</Descriptions.Item>
                    <Descriptions.Item label="상품개수">{mallItemList.length}</Descriptions.Item>
                </Descriptions>
            </div>}
            {mallItemList.length !== 0 && <Table columns={columns} rowKey={record => record.id} dataSource={mallItemList} pagination={{ pageSize: 50 }} scroll={{ y: 320 }} />}
            
        </div>
    )
}

export default MallDashboardPage;
