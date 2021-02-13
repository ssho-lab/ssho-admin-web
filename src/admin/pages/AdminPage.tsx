import * as React from 'react';
import { useEffect, useState } from 'react';
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import ItemDashboardPage from "./item/ItemDashboardPage";
import MallDashboardPage from "./mall/MallDashboardPage";
import SwipeLogDashboardPage from "./swipelog/SwipeLogDashboardPage";
import useReactRouter from "use-react-router";
import UserDashboardPage from "./user/UserDashboardPage";
import SubMenu from "antd/es/menu/SubMenu";
import API_ENDPOINTS from "../../endpoints";
import { User } from "../model/user/UserModel";
import { Tag } from "../model/tag/TagModel";
import { Mall } from "../model/mall/MallModel";
import UserCacheDashboardPage from "./user/UserCacheDashboardPage";

const { Header, Content, Sider } = Layout;

interface AdminPageProps { }

const AdminPage: React.FC<AdminPageProps> = () => {

    const [menuId, setMenuId] = useState<number>(0);
    const [itemList, setItemList] = useState<any>([]);
    const [swipeLogList, setSwipeLogList] = useState<any>([]);
    const [userList, setUserList] = useState<User[]>([]);
    const [allTagList, setAllTagList] = useState<Tag[]>([]);
    const [mallList, setMallList] = useState<Mall[]>([]);

    const { history } = useReactRouter()

    const getItemList = () => {

        axios.get('https://3a3uqctsjk.execute-api.ap-northeast-2.amazonaws.com/dev/item')
            .then(function (response: any) {
                setItemList(response.data)
            })

            .catch(function (error) {
            })
    }

    const getSwipeLogList = () => {
        axios.get('https://3a3uqctsjk.execute-api.ap-northeast-2.amazonaws.com/dev/swipeSets')
            .then(function (response: any) {
                setSwipeLogList(response.data)
            })

            .catch(function (error) {
            })
    }

    const getUserList = () => {
        axios.get(API_ENDPOINTS.CORE_API + '/users')
            .then(function (response: any) {
                setUserList(response.data)
            })

            .catch(function (error) {
            })
    }

    const getAllTagList = () => {
        axios.get(API_ENDPOINTS.CORE_API + '/tag')
            .then(function (response: any) {
                setAllTagList(response.data)
            })

            .catch(function (err) {
            })
    }

    const getMallList = () => {
        axios.get(API_ENDPOINTS.CORE_API + '/mall/list')
            .then(function (response: any) {
                setMallList(response.data)
            })

            .catch(function (err) {
            })
    }

    useEffect(() => {

        if (sessionStorage.getItem('token') === null ||
            sessionStorage.getItem('admin') === null ||
            sessionStorage.getItem('admin') === "false") {
            sessionStorage.clear()
            history.push("/")
        }
        getItemList()
        getSwipeLogList()
        getUserList()
        getAllTagList()
        getMallList()
    }, [])

    return (
        <Layout>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>

                    <SubMenu key="0" icon={<UserOutlined />} title="등록 상품">
                        <Menu.Item onClick={() => setMenuId(0)} key="0" icon={<UserOutlined />}>
                            전체 상품
                        </Menu.Item>
                        <Menu.Item onClick={() => setMenuId(1)} key="1" icon={<UserOutlined />}>
                            몰별 상품
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="1" icon={<UserOutlined />} title="스와이프 로그">
                        <Menu.Item onClick={() => setMenuId(2)} key="2">스와이프 로그 조회</Menu.Item>
                    </SubMenu>
                    <SubMenu key="2" icon={<UserOutlined />} title="회원">
                        <Menu.Item onClick={() => setMenuId(3)} key="3" icon={<UserOutlined />}>
                            회원
                        </Menu.Item>
                        <Menu.Item onClick={() => setMenuId(4)} key="4" icon={<UserOutlined />}>
                            회원 추천 상품
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item onClick={() => history.push("/item")} key="6" icon={<UserOutlined />}>
                        테스트 페이지
                    </Menu.Item>
                    <Menu.Item onClick={() => {
                        sessionStorage.clear()
                        history.push("/")
                    }} key="8" icon={<UserOutlined />}>
                        로그아웃
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200, height: "100vh" }}>
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 0 0', overflow: 'initial', height: "100vh" }}>
                    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                        {menuId === 0 && itemList && <ItemDashboardPage itemList={itemList} allTagList={allTagList} mallList={mallList} />}
                        {menuId === 1 && itemList && <MallDashboardPage itemList={itemList} allTagList={allTagList} mallList={mallList} />}
                        {menuId === 2 && swipeLogList && <SwipeLogDashboardPage swipeLogList={swipeLogList} />}
                        {menuId === 3 && userList && <UserDashboardPage userList={userList} />}
                        {menuId === 4 && userList && <UserCacheDashboardPage userList={userList} />}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminPage;
