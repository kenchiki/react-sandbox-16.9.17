import { AccountInfo } from './lib/Account'

export interface TootInfo {
  id: string;
  accounts: Array<AccountInfo>
  // eslint-disable-next-line camelcase
  last_status: {
    account: AccountInfo;
    // eslint-disable-next-line camelcase
    created_at: string;
    content: string;
  };
}
