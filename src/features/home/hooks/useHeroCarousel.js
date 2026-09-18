import { useEffect, useRef, useState } from "react";

// Owns autoplay, manual navigation, and swipe behavior for the hero carousel.
export default function useHeroCarousel(itemCount) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [autoplayResetKey, setAutoplayResetKey] = useState(0);
  const pointerStartRef = useRef(null);

  // Restart the autoplay timer after manual navigation or when pause changes.
  useEffect(() => {
    if (isPaused || itemCount < 2) return undefined;

    const interval = setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % itemCount);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplayResetKey, isPaused, itemCount]);

  const moveTo = (direction) => {
    setActiveIndex(
      (currentIndex) => (currentIndex + direction + itemCount) % itemCount,
    );
    setAutoplayResetKey((key) => key + 1);
  };

  const select = (index) => {
    setActiveIndex(index);
    setAutoplayResetKey((key) => key + 1);
  };

  const getCardClass = (index) => {
    if (index === activeIndex) return "active";

    const nextIndex = (activeIndex + 1) % itemCount;
    const previousIndex = (activeIndex - 1 + itemCount) % itemCount;

    if (index === nextIndex) return "next";
    if (index === previousIndex) return "prev";

    return "none";
  };

  // Convert a horizontal pointer gesture into carousel navigation.
  const handlePointerDown = (event) => {
    pointerStartRef.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (pointerStartRef.current === null) return;

    const distance = event.clientX - pointerStartRef.current;
    pointerStartRef.current = null;

    const selectedText = window.getSelection()?.toString();
    if (event.pointerType === "mouse" && selectedText) return;
    if (Math.abs(distance) < 50) return;

    moveTo(distance < 0 ? 1 : -1);
  };

  return {
    activeIndex,
    isPaused,
    setIsPaused,
    moveTo,
    select,
    getCardClass,
    handlePointerDown,
    handlePointerUp,
  };
}
