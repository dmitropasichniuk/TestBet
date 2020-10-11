export class MatchResultDictionary {
  static WIN: number = 1;
  static LOOSE: number = 2;
  static DRAW: number = 3;
  static IN_PROGRESS: number = 4;
}

export enum MatchResultEnum {
  WIN = MatchResultDictionary.WIN,
  LOOSE = MatchResultDictionary.LOOSE,
  DRAW = MatchResultDictionary.DRAW,
  IN_PROGRESS = MatchResultDictionary.IN_PROGRESS,
}

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
