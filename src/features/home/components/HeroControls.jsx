// Renders the previous and next controls for the hero carousel.
export default function HeroControls({ onPrevious, onNext }) {
  return (
    <>
      <button
        className="carousel-arrow previous"
        type="button"
        aria-label="Previous movie"
        title="Previous movie"
        onClick={onPrevious}
      >
        &#10094;
      </button>

      <button
        className="carousel-arrow next"
        type="button"
        aria-label="Next movie"
        title="Next movie"
        onClick={onNext}
      >
        &#10095;
      </button>

    </>
  )
}
