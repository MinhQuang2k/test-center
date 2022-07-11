import { useRef, useEffect } from 'react'
function ClickOutside({
  children,
  closeOption,
  closeAdvance,
  categoryRef,
  listRef,
  sortRef,
}) {
  const wrapperRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (closeOption) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          closeOption()
        }
      }
      if (closeAdvance) {
        if (
          wrapperRef.current &&
          !listRef.current &&
          !categoryRef.current &&
          !wrapperRef.current.contains(event.target) &&
          !wrapperRef.current.contains(categoryRef.current) &&
          !wrapperRef.current.contains(listRef.current) &&
          !wrapperRef.current.contains(sortRef.current)
        ) {
          closeAdvance()
        } else {
          listRef.current = undefined
          categoryRef.current = undefined
          sortRef.current = undefined
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    //eslint-disable-next-line
  }, [wrapperRef])
  return <div ref={wrapperRef}>{children}</div>
}

export default ClickOutside
