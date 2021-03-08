//This component replaces Layout.js. We should delete Layout.js once we confirm it is no longer in use.

import React from 'react';
import { Layout, Button, PageHeader, Breadcrumb } from 'antd';
import { LoginOutlined, FormOutlined } from '@ant-design/icons';
import fullLogo from '../images/vbb-full-logo.png';

function AppWrapper(props) {
    const { Footer, Content } = Layout;

    return (
        <div>
            <Layout>
                <PageHeader
                    style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#ff914d' }}
                    title={<img
                        src={fullLogo}
                        alt="VBB logo"
                        width="200"
                    ></img>}
                    extra={[
                        <Button key="1" href='/signin/' style={{ marginTop: '15px', color: '#549bea' }}>Sign In<LoginOutlined /></Button>,
                        <Button type='primary' key="2" href='/signup'>Register<FormOutlined style={{ color: 'white'}}/></Button>,
                    ]}
                >
                </PageHeader>
                <Content className="site-layout" style={{ padding: '50px', marginTop: 64, backgroundColor: '#fffff6' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><a href='/'>VBB Portal</a></Breadcrumb.Item>
                        <Breadcrumb.Item><a href='/signup'>Mentor Registration</a></Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, minHeight: 380 }}>
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', padding: '35px' }}>Village Book Builders ©2021 | All Rights Reserved</Footer>
            </Layout>
        </div>
    );
}
export default AppWrapper;
