import { JSXElement } from "solid-js";

export type StateSetPath = string | number;

export interface StateProviderProps {
  initialData?: object;
  children?: JSXElement;
}

export type StoreProvider = (props: StateProviderProps) => JSXElement;

export type StoreHandlerUpdateState = (
  path: string | StateSetPath[],
  value: any
) => void;

export type StoreHandler = () => [
  object,
  { updateState: StoreHandlerUpdateState }
];
