/**
 * Calculate the number of grid columns based on container width
 * @param containerWidth - Container width in pixels
 * @param gap - Gap between items in pixels
 * @param minItemWidth - Minimum item width in pixels
 * @returns Number of columns
 */
export const calculateGridColumns = (
  containerWidth: number,
  gap: number = 12,
  minItemWidth: number = 200
): number => {
  if (containerWidth <= 0) return 1;
  
  let columns = Math.max(1, Math.floor((containerWidth + gap) / (minItemWidth + gap)));
  
  let totalGap = gap * Math.max(0, columns - 1);
  let columnWidth = Math.floor((containerWidth - totalGap) / columns);

  // Adjust columns if column width is less than minimum
  while (columns > 1 && columnWidth < minItemWidth) {
    columns -= 1;
    totalGap = gap * Math.max(0, columns - 1);
    columnWidth = Math.floor((containerWidth - totalGap) / columns);
  }

  return columns;
};
