import * as React from 'react';
import {useEffect, useState} from 'react';
import {Layout, Menu} from "antd";
import {UserOutlined} from "@ant-design/icons";
import axios from "axios";
import ItemDashboardPage from "./item/ItemDashboardPage";
import SwipeLogDashboardPage from "./swipelog/SwipeLogDashboardPage";
import useReactRouter from "use-react-router";
import UserDashboardPage from "./user/UserDashboardPage";

const { Header, Content, Footer, Sider } = Layout;

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = () => {

    const [ menuId, setMenuId ] = useState<number>(0)
    const [ itemList, setItemList ] = useState<any>([])
    const [ swipeLogList, setSwipeLogList ] = useState<any>([])
    const [ userList, setUserList ] = useState<any>([])

    const {history} = useReactRouter()

    const getItemList = () => {

        axios.get('http://13.124.59.2:8081/item')
            .then(function (response: any) {
                setItemList(response.data)
            })

            .catch(function (error) {
            })
    }

    const getSwipeLogList = () => {
        axios.get('http://13.124.59.2:8082/log/swipe')
            .then(function (response: any) {
                setSwipeLogList(response.data)
            })

            .catch(function (error) {
            })
    }

    const getUserList = () => {
        axios.get('http://3.35.129.79:8080/users')
            .then(function (response: any) {
                setUserList(response.data)
            })

            .catch(function (error) {
            })
    }

    useEffect(()=>{
        if (sessionStorage.getItem('token') === null ||
            sessionStorage.getItem('admin') === null ||
            sessionStorage.getItem('admin') === "false") {
            sessionStorage.clear()
            history.push("/")
        }
        getItemList()
        getSwipeLogList()
        getUserList()
    },[])

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
                    <Menu.Item onClick={()=>setMenuId(0)} key="0" icon={<UserOutlined />}>
                        등록 상품
                    </Menu.Item>
                    <Menu.Item onClick={()=>setMenuId(1)} key="1" icon={<UserOutlined />}>
                        스와이프 로그
                    </Menu.Item>
                    <Menu.Item onClick={()=>setMenuId(2)} key="2" icon={<UserOutlined />}>
                        회원
                    </Menu.Item>
                    <Menu.Item onClick={()=>history.push("/item")} key="3" icon={<UserOutlined />}>
                        테스트 페이지
                    </Menu.Item>
                    <Menu.Item onClick={()=>{
                        sessionStorage.clear()
                        history.push("/")
                    }} key="3" icon={<UserOutlined />}>
                        로그아웃
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200, height: "100vh" }}>
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 0 0', overflow: 'initial', height: "100vh"}}>
                    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                        {menuId === 0 && itemList && <ItemDashboardPage dataSource={itemList}/>}
                        {menuId === 1 && swipeLogList && <SwipeLogDashboardPage dataSource={swipeLogList}/>}
                        {menuId === 2 && userList && <UserDashboardPage dataSource={userList}/>}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminPage;
