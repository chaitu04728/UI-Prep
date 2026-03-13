'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

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
      <div style={{
        backgroundColor: '#fff1f0',
        border: '1px solid #ffa39e',
        borderRadius: '8px',
        padding: '2rem',
        maxWidth: '600px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ color: '#cf1322', marginTop: 0, fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>⚠️</span>
          Something went wrong!
        </h2>
        <p style={{ color: '#555', marginBottom: '1.5rem' }}>
          We caught an unexpected error. You can try recovering by clicking the button below.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderRadius: '4px',
            overflowX: 'auto',
            textAlign: 'left',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            color: '#333'
          }}>
            <strong>Error details (dev only):</strong>
            <pre style={{ margin: '0.5rem 0 0 0', whiteSpace: 'pre-wrap' }}>
              {error.message}
            </pre>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => reset()}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '1rem'
            }}
          >
            Try again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: 'white',
              color: '#333',
              border: '1px solid #d9d9d9',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '1rem'
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
