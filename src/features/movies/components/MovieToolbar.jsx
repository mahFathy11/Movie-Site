import '../styles/movieToolbar.css'

export default function MovieToolbar({
  selectedCategory,
  onCategoryChange,
  selectedGenre,
  onGenreChange,
  categories
}) {
  const genres = [
    ['28', 'Action'],
    ['12', 'Adventure'],
    ['80', 'Crime'],
    ['10751', 'Family'],
    ['27', 'Horror'],
    ['9648', 'Mystery'],
    ['878', 'Sci-Fi'],
    ['10752', 'War'],
  ]

  return (
    <div className="movie-toolbar">
      <div className="category">
        <p className="toolbar-label">Category</p>
        <div className="category-options">
          {categories.map((category, index) => (
            <button
              key={index}
              type="button"
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="genres">
        <p className="toolbar-label">Genres</p>
        <div className="genre-options">
          {genres.map(([value, genre]) => (
            <button
              key={value}
              type="button"
              className={selectedGenre === value ? 'active' : ''}
              onClick={() => onGenreChange(value)}
            >
              {genre}
            </button>
          ))}
        </div>
        {selectedGenre ? (
          <button className="clear-filters" type="button" onClick={() => onGenreChange(null)}>
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  )
}
