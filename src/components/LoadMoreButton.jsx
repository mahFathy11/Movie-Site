import '../styling/actionButtons.css'

export default function LoadMoreButton({ hasMore, isLoading, onLoadMore }) {
  if (!hasMore) return null

  return (
    <button className="load-more" type="button" onClick={onLoadMore} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Load more'}
    </button>
  )
}
