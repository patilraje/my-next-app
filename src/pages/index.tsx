// src/pages/index.tsx
const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Hello World</h1>
      <input type="text" placeholder="Enter text" style={{ marginTop: '10px', padding: '10px', fontSize: '16px' }} />
    </div>
  );
};

export default Home;
