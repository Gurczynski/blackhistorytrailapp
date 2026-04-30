import React from 'react';
import { TextBlock } from '../../blocks/TextBlock';
import { ImageBlock } from '../../blocks/ImageBlock';
import { ListBlock } from '../../blocks/ListBlock';
import { FAQBlock } from '../../blocks/FAQBlock';
import { MapBlock } from '../../blocks/MapBlock';
import { EventBlock } from '../../blocks/EventBlock';
import { ButtonBlock } from '../../blocks/ButtonBlock';
import BlockAdapter from './BlockAdapter';

export const blockRegistry: Record<string, React.FC<{ block: any }>> = {
  text: (props) => <BlockAdapter block={props.block} component={TextBlock} />,
  image: (props) => <BlockAdapter block={props.block} component={ImageBlock} />,
  list: (props) => <BlockAdapter block={props.block} component={ListBlock} />,
  faq: (props) => <BlockAdapter block={props.block} component={FAQBlock} />,
  map: (props) => <BlockAdapter block={props.block} component={MapBlock} />,
  event: (props) => <BlockAdapter block={props.block} component={EventBlock} />,
  button: (props) => <BlockAdapter block={props.block} component={ButtonBlock} />,
};
