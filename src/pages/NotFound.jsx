import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <main style={{
      display: 'grid',
      minHeight: '50vh',
      placeItems: 'center',
      textAlign: 'center',
      color: '#e6edf3',
      padding: '2rem',
    }}>
      <section>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>404</h1>
        <p style={{ marginBottom: '1rem', color: '#b9c7d6' }}>Page not found.</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            padding: '0.75rem 1.25rem',
            borderRadius: '0.5rem',
            border: '1px solid #1ab7e1',
            background: '#0d1d2b',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Back home
        </button>
      </section>
    </main>
  )
}
