import React from 'react';
import type { AppSchemaBlock } from '../../types/app-schema';

interface BlockAdapterProps {
  block: AppSchemaBlock;
  component: React.FC<{ data: Record<string, unknown> }>;
}

export default function BlockAdapter({ block, component: Component }: BlockAdapterProps) {
  return <Component data={block.props} />;
}