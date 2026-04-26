export { TextBlock } from './TextBlock';
export { ImageBlock } from './ImageBlock';
export { ListBlock } from './ListBlock';
export { FAQBlock } from './FAQBlock';
export { MapBlock } from './MapBlock';
export { EventBlock } from './EventBlock';
export { ButtonBlock } from './ButtonBlock';

import React from 'react';
import { TextBlock } from './TextBlock';
import { ImageBlock } from './ImageBlock';
import { ListBlock } from './ListBlock';
import { FAQBlock } from './FAQBlock';
import { MapBlock } from './MapBlock';
import { EventBlock } from './EventBlock';
import { ButtonBlock } from './ButtonBlock';

export const blockRenderers: Record<string, React.FC<{ data: Record<string, unknown> }>> = {
  text: TextBlock,
  image: ImageBlock,
  list: ListBlock,
  faq: FAQBlock,
  map: MapBlock,
  event: EventBlock,
  button: ButtonBlock,
  form: TextBlock, // fallback to text for now
};
