export interface IBlockProps {
  className?: string;
  events?: Partial<
    /* eslint-disable-next-line */
    Record<keyof GlobalEventHandlersEventMap, (...args: any[]) => void>
  >;
  settings?: {
    withInternalId: boolean;
  };
  __id?: string | null;
}
