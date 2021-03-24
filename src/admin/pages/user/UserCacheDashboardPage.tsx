import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Descriptions, Select, Table} from "antd";
import {User} from "../../model/user/UserModel";
import axios from "axios";
import API_ENDPOINTS from "../../../endpoints";
import {UserCache} from "../../model/user/UserCacheModel";
import {Mall} from "../../model/mall/MallModel";
//import xlsx from 'xlsx';

const {Option} = Select;
interface UserCacheDashboardPageProps {
    userList: User[]
}

const UserCacheDashboardPage: React.FC<UserCacheDashboardPageProps> = ({ userList }) => {

    const mallColumns = [
        {
            title: '몰번호',
            dataIndex: 'mall',
            width: 110,
            render: (mall: Mall) => <span style={{ fontSize: "15px" }}>{mall.id}</span>
        },
        {
            title: '몰명',
            dataIndex: 'mall',
            width: 110,
            render: (mall: Mall) => <span style={{ fontSize: "15px" }}>{mall.name}</span>
        },
        {
            title: '가중치',
            dataIndex: 'rate',
            width: 110,
            render: (rate: number) => <span style={{ fontSize: "15px" }}>{rate}</span>
        },
        /*
        {
            title: '다운로드',
            width: 110,
            render: () => <Button onClick={() => download()}>다운로드</Button>
        },

         */
    ];

    const itemColumns = [
        {
            title: '상품번호',
            dataIndex: 'item',
            width: 110,
            render: (item: any) => <span style={{ fontSize: "15px" }}>{item.id}</span>
        },
        {
            title: '상품명',
            dataIndex: 'item',
            width: 110,
            render: (item: any) => <span style={{ fontSize: "15px" }}>{item.title}</span>
        },
        {
            title: '몰명',
            dataIndex: 'item',
            width: 110,
            render: (item: any) => <span style={{ fontSize: "15px" }}>{item.mallNm}</span>
        },
        {
            title: '가중치',
            dataIndex: 'rate',
            width: 110,
            render: (rate: number) => <span style={{ fontSize: "15px" }}>{rate}</span>
        },
    ];

    const [userInfo, setUserInfo] = useState<User>({ admin: "", birth: "", email: "", gender: "", id: "", name: "", password: "" });
    const [userCache, setUserCache] = useState<UserCache>();

    const onSelectUser = (value: any) => {
        const info: any = userList.find(user => user.id === value)
        setUserInfo(info);
    }

    const getUserCache = (userId: string) => {
        axios.get(API_ENDPOINTS.CORE_API + '/cache/user-item/' + userId)
            .then(function (response: any) {
                setUserCache(response.data);
            })

            .catch(function (err) {
            })
    }

    /*
    const download = () => {
        if(userCache) {
            const ws = xlsx.utils.json_to_sheet(userCache.userMallList);

            const wb = xlsx.utils.book_new();

            xlsx.utils.book_append_sheet(wb, ws, "Sheet1");

            xlsx.writeFile(wb, "Test.xlsx");
        }
    }

     */

    useEffect(() => {
        if(userInfo && userInfo.id){
            getUserCache(userInfo.id);
        }
    }, [userInfo])

    return (
        <div style={{textAlign: 'left'}}>
            <Select showSearch style={{ width: 200, marginBottom: 40 }} placeholder="회원 검색" optionFilterProp="children" filterOption={(input: string, option : any) => option.children.indexOf(input)>= 0} onSelect={(value: any) => onSelectUser(value)}>
                {userList.map(user => <Option value={user.id}>{user.id + '-' + user.name}</Option>)}
            </Select>
            {
                userCache && userCache.userId &&
                <div style={{marginBottom: 40}}>
                    <h4>추천 상품 가중치 계산 방식</h4>
                    <ul>
                        <li>
                            <span>스와이프 이력이 1개 이상 있을때</span>
                            <ol>
                                <li><span>최근 스와이프 이력 5개(또는 이하)를 기준으로 하는 전체 상품과의 유사도를 가중치로 설정</span></li>
                                <li><span>각 상품 가중치 X 해당 상품 가중치(MF)를 최종 가중치로 설정</span></li>
                            </ol>
                        </li>
                        <li>
                            <span>스와이프 이력이 없을 때</span>
                            <ol>
                                <li><span>몰별 가중치 순서대로 추천 상품을 구성</span></li>
                            </ol>
                        </li>
                    </ul>
                </div>
            }

            {
                userCache && userCache.userId &&
                <div>
                    <div style={{marginBottom: 40, border: '1px solid black'}} >
                        <Descriptions layout="vertical" bordered size="small" column={{ xxl: 5, xl: 5, lg: 5, md: 3, sm: 2, xs: 1 }}>
                            <Descriptions.Item label="회원 고유 번호">{userInfo.id}</Descriptions.Item>
                            <Descriptions.Item label="이름">{userInfo.name}</Descriptions.Item>
                            <Descriptions.Item label="이메일">{userInfo.email}</Descriptions.Item>
                        </Descriptions>
                    </div>
                    {userCache.recentItemIdList && userCache.recentItemIdList.length > 0 && <div style={{marginBottom: 40}} >
                        <Descriptions layout="vertical" bordered size="small" column={{ xxl: 5, xl: 5, lg: 5, md: 3, sm: 2, xs: 1 }}>
                            <Descriptions.Item label="최근 본 상품(5개)">{userCache.recentItemIdList? userCache.recentItemIdList.join(' '): ''}</Descriptions.Item>
                        </Descriptions>
                    </div>}
                </div>
            }
            {userCache && userCache.userMallList && <Table columns={mallColumns} rowKey={record => record.id} dataSource={userCache.userMallList} pagination={{ pageSize: 50 }} scroll={{ y: 320 }} />}
            {userCache && userCache.userItemList && <Table columns={itemColumns} rowKey={record => record.id} dataSource={userCache.userItemList} pagination={{ pageSize: 50 }} scroll={{ y: 320 }} />}
        </div>
    )
}

export default UserCacheDashboardPage;
