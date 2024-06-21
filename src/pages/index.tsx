import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/scim-user', { email, password });
      setMessage('User created successfully!');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setMessage(`Error: ${error.response?.data?.error || error.message}`);
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Hello World</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginTop: '10px', padding: '10px', fontSize: '16px' }}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: '10px', padding: '10px', fontSize: '16px' }}
          required
        />
        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Home;
