export interface Dealer {
  dealerId: number;
  dealerName: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: number;
  storageCapacity: number;
  inventory?: number;
}
