import '../styling/sectionState.css'

export default function SectionState({ type, message, onRetry }) {
  // Keep loading and error UI consistent across all movie sections.
  if (type === 'loading') {
    return (
      <div className="section-state section-loading" aria-label="Loading movies">
        <div className="loading-card" />
      </div>
    )
  }

  return (
    <div className="section-state section-error" role="alert">
      <p>{message}</p>
      <button type="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  )
}
