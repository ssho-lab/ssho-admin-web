import * as React from 'react';
import {Table} from "antd";
import {User} from "../../model/user/UserModel";

interface UserDashboardPageProps {
    userList: User[]
}

const UserDashboardPage: React.FC<UserDashboardPageProps> = ({userList}) => {

    const columns = [
        {
            title: '회원 고유 번호',
            dataIndex: 'id',
            width: 150,
            render: (id: string) => <span>#{id}</span>
        },
        {
            title: '이름',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: '이메일',
            dataIndex: 'email',
            width: 150,
        },
        {
            title: '관리자 여부',
            dataIndex: 'admin',
            width: 150,
            render: (admin: string) => admin? <span>O</span> : <span>X</span>
        },
    ];

    return (
        <Table columns={columns} dataSource={userList} pagination={{ pageSize: 50 }} scroll={{ y: 320 }} />
    )
}

export default UserDashboardPage;
