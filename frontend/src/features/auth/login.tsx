import { Button, Checkbox, Form, Input } from 'antd';
import Header from 'components/Header';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Navigate } from 'react-router-dom';
import {  authSelector, login } from './auth.slice';

function Login() {
    const dispatch = useAppDispatch();
    const authSelect = useAppSelector(authSelector);
    const onFinish = (values: any) => {
        console.log('Success:', values);
        dispatch(login(values))
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        
      };
      if(authSelect.token){
        return <Navigate replace={true}  to="posts" ></Navigate>
      }
    
      return (
        <>
             <Header title='Login' content='login' />
            <Form className='m-2'
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item 
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input style={{ width: '25%' }} />
              </Form.Item>
        
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password style={{ width: '25%' }} />
              </Form.Item >
        
              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
        
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
        </>
       
      );
    };
    

export default Login;