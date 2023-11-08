export const rangeFrom = (start: number, stop: number, step: number) => {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
  }

export function getPaginationItems(current: number, total: number) {
  const maxLength = 9 // Max length generated
  const startCount = 1 // Start number to be printed
  const step = 1 // Generate numbers range startCount..n with step of 1
  let result: Array<number> = []

  // handle total less than maxLength
  if (total <= maxLength) {
    result = result.concat(rangeFrom(startCount, total, step))
  }

  // handle ellipsis logics
  else {
    const firstPage = 1
    const confirmedPagesCount = 3
    const deductedMaxLength = maxLength - confirmedPagesCount
    const sideLength = deductedMaxLength / 2
    const closeToFirstPageCount = 6
    const closeToLastPageCount = -6

    const arrCloseToFirstPage = rangeFrom(startCount, closeToFirstPageCount, step)
    const closeToFirstPage = arrCloseToFirstPage.includes(current)

    const arrTotal = rangeFrom(startCount, total, step)
    const closeToLastPage = arrTotal.slice(closeToLastPageCount).includes(current)

    if (closeToFirstPage && current !== arrCloseToFirstPage[arrCloseToFirstPage.length - 1]) {
      const lastCount = 1

      result = result.concat(rangeFrom(startCount, closeToFirstPageCount, step))
      result.push(NaN)
      result = result.concat(rangeFrom(total - lastCount, total, step))
    } else if (closeToLastPage && current !== arrTotal.slice(closeToLastPageCount)[0]) {
      const firstCount = 2
      const lastCount = 5

      result = result.concat(rangeFrom(startCount, firstCount, step))
      result.push(NaN)
      result = result.concat(rangeFrom(total - lastCount, total, step))
    }

    // handle two ellipsis
    else if (
      current - firstPage >= deductedMaxLength - 1 &&
      total - current >= deductedMaxLength - 1
    ) {
      const deductedSideLength = sideLength - 1

      result.push(1)
      result.push(NaN)
      result = result.concat(
        rangeFrom(current - deductedSideLength, current + deductedSideLength, step),
      )
      result.push(NaN)
      result.push(total)
    }
  }

  return result
}
