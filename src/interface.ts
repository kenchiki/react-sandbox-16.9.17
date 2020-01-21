export interface Item {
  text: string;
  id: number;
}

export interface State {
  text: string;
}

export interface AccountInfo {
  id: string;
  url: string;
  // eslint-disable-next-line camelcase
  display_name: string;
  username: string;
  avatar: string;
}
