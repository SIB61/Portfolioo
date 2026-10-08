import { Metadata } from 'next';
import { BuilderProvider } from '@/context/BuilderContext';
import { PortfolioBuilder } from '@/components/builder/PortfolioBuilder';

export const metadata: Metadata = {
  title: 'Portfolioo Builder — Create Custom Professional Portfolios',
  description: 'Visual builder for custom portfolios: atomic components, sections, pages, templates, and harmonious theme generation.',
};

export default function BuildPage() {
  return (
    <BuilderProvider>
      <PortfolioBuilder />
    </BuilderProvider>
  );
}
