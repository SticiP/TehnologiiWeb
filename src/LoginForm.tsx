import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert } from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from './firebase';
import { GoogleOutlined } from '@ant-design/icons';

const auth = getAuth(app);

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onFinish = (values: { username: string; password: string }) => {
    const { username, password } = values;
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        setSuccess("Logare reușită!");
        setError(null);
      })
      .catch((error) => {
        setError("Eroare la logare. Verificați datele introduse.");
        setSuccess(null);
      });
  };

  const handleGoogleLogin = () => {
    // Logică pentru logare prin Google va fi adăugată mai târziu
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Card title="Logare" style={{ width: 300 }}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Log in
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="default" style={{ width: '100%' }} icon={<GoogleOutlined />} onClick={handleGoogleLogin}>
              Log in with Google
            </Button>
          </Form.Item>
        </Form>
        {error && <Alert message={error} type="error" showIcon style={{ marginTop: 16 }} />}
        {success && <Alert message={success} type="success" showIcon style={{ marginTop: 16 }} />}
      </Card>
    </div>
  );
};

export default LoginForm;
