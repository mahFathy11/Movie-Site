import '../styling/actionButtons.css'

export default function BackToTopButton() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button className="back-to-top" type="button" onClick={scrollToTop}>
      Back to top
    </button>
  )
}
