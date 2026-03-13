import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '6rem', margin: '0 0 1rem 0', fontWeight: 'bold', color: '#ff4d4f' }}>404</h1>
      <h2 style={{ fontSize: '2rem', margin: '0 0 1.5rem 0' }}>Page Not Found</h2>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem', maxWidth: '500px' }}>
        Oops! The route you are looking for does not exist or has been moved.
      </p>
      <Link 
        href="/" 
        style={{
          display: 'inline-block',
          padding: '0.8rem 1.5rem',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontWeight: '500',
          transition: 'background-color 0.2s'
        }}
      >
        Return to Home
      </Link>
    </div>
  );
}
