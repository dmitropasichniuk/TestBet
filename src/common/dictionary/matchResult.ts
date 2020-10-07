export class MatchResultDictionary {
  // Good status
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
