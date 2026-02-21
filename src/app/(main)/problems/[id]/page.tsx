import { ProblemSolvePage } from '@/views/problems';

export default function ProblemSolveRoute({
  params,
}: {
  params: { id: string };
}) {
  return <ProblemSolvePage id={params.id} />;
}
