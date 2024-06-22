import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Welcome to My Next.js App</h1>
      {session ? (
        <>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>You are not signed in.</p>
          <a href="/login">Sign in with SAML</a>
        </>
      )}
    </div>
  );
};

export default Home;
