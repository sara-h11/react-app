import { Button, Divider , Layout, Menu, theme } from 'antd';
import { createContext, useState } from 'react';
import SelectColor from './SelectColor';
import { Link, Outlet } from "react-router-dom";
import { authSelector, logout } from 'features/auth/auth.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

const { Header, Content, Footer } = Layout;
interface AppContextType {
  color : string ,
  lang : string
}
export const AppContext = createContext<
[AppContextType , React.Dispatch<React.SetStateAction<AppContextType>>]>([] as any);

function AppLayout() {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
      const dispatch = useAppDispatch();
      const authSelect = useAppSelector(authSelector);
    const [context, setContext] = useState<AppContextType>({color : 'red' , lang : 'fa'})
    return ( 
      <AppContext.Provider value={[context , setContext]}>
          <div className='container'>
          <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}>
                  <Menu.Item key="posts">
                    <Link to="/posts">Posts</Link>
                  </Menu.Item >
                  <Menu.Item key="comments">
                    <Link to="/comments">Comments</Link>
                  </Menu.Item >
                  <Menu.Item key="tasks">
                    <Link to="/tasks">Tasks</Link>
                  </Menu.Item>
                  <Menu.Item key="todos"> 
                    <Link to="/todos">Todos</Link>
                  </Menu.Item>
                  <Menu.Item key="photos">
                    <Link to="/photos">Photos</Link>
                  </Menu.Item>
                  <Menu.Item key="counter">
                    <Link to="/counter">Counter</Link>
                  </Menu.Item>
                  <Menu.Item key="logout" style={{display : authSelect.token ? "inline" : "none"}}>
                    <Button onClick={() => dispatch(logout())} danger type="dashed" style={{backgroundColor :"transparent" }}>Logout</Button>
                  </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '10px 50px' }}>
              <div className="site-layout-content p-2" style={{ background: colorBgContainer }}>
                <SelectColor />
                <Divider />
                <Outlet></Outlet>
              </div>
            </Content>
          <Footer style={{ textAlign: 'center' }}>React 2022</Footer>
        </Layout>
      </div>
    </AppContext.Provider>
     );
}

export default AppLayout;