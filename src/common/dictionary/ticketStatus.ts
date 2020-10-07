export class TicketStatusDictionary {
  static WAITING: number = 1;
  static WON: number = 2;
  static LOST: number = 3;
}

export enum TicketStatusEnum {
  WAITING = TicketStatusDictionary.WAITING,
  STARTING = TicketStatusDictionary.WON,
  END = TicketStatusDictionary.LOST,
}