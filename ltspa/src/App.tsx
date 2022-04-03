import { Button, Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App(props: any) {

	return (
		<Layout>
			<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
					<Menu.Item key="1"><Link to='/route1'>Route 1</Link></Menu.Item>
					<Menu.Item key="2"><Link to='/route2'>Route 2</Link></Menu.Item>
					<Menu.Item key="3"><Link to='/protected'>Protected</Link></Menu.Item>
				</Menu>
			</Header>
			<Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
				<Button type='primary'>Login</Button>
				<Button type='ghost'>Logout</Button>
				<div className="site-layout-background" style={{ padding: 24, minHeight: 900 }}>
					<Outlet/>
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
		</Layout>
	);
}

export default App;