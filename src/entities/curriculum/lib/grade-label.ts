export function gradeLabel(grade: number): string {
  if (grade <= 6) return `초등 ${grade}학년`;
  if (grade <= 9) return `중등 ${grade - 6}학년`;
  return `고등 ${grade - 9}학년`;
}
