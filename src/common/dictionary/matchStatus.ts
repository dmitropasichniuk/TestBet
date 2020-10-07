export class MatchStatusDictionary {
  static WAITING: number = 1;
  static STARTING: number = 2;
  static END: number = 3;
}

export enum MatchStatusEnum {
  WAITING = MatchStatusDictionary.WAITING,
  STARTING = MatchStatusDictionary.STARTING,
  END = MatchStatusDictionary.END,
}