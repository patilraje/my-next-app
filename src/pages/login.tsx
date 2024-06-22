import React from 'react';

const Login = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Login</h1>
      <a href="/api/auth/saml">Sign in with SAML</a>
    </div>
  );
};

export default Login;
