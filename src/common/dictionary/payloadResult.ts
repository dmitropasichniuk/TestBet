export class PayloadResultDictionary {
  static FIRST_TEAM_WIN: number = 1;
  static SECOND_TEAM_WIN: number = 2;
  static DRAW: number = 3;
  static IN_PROGRESS: number = 4;
}

export enum PayloadResultEnum {
  WIN = PayloadResultDictionary.FIRST_TEAM_WIN,
  LOOSE = PayloadResultDictionary.SECOND_TEAM_WIN,
  DRAW = PayloadResultDictionary.DRAW,
  IN_PROGRESS = PayloadResultDictionary.IN_PROGRESS,
}
