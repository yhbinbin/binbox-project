import { setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';
import BreakbeatGenerator from '@/components/lab/breakbeat/BreakbeatGenerator';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BreakbeatGeneratorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container className="max-w-[1180px] py-12 md:py-14">
      <BreakbeatGenerator />
    </Container>
  );
}
