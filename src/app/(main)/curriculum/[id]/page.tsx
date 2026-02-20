import { CurriculumDetailPage } from '@/views/curriculum';

export default function CurriculumDetailRoute({
  params,
}: {
  params: { id: string };
}) {
  return <CurriculumDetailPage id={params.id} />;
}
