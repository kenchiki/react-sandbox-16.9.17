export interface Item {
  text: string;
  id: number;
}

export interface State {
  items: Array<Item>;
  text: string;
}
