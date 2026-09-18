import Movies from './Movies'

export default function OnTv({ initialCategory, onTvSelect }) {
  return <Movies initialCategory={initialCategory} isTv onMovieSelect={onTvSelect} />
}
