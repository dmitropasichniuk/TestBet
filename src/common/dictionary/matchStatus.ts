export class MatchDictionary {
    // Good status
    static WIN: number = 1;
    static LOOSE: number = 2;
    static DRAW: number = 3;
    static IN_PROGRESS: number = 4;
  }
  
  export enum MatchEnum {
    WIN = MatchDictionary.WIN,
    LOOSE = MatchDictionary.LOOSE,
    DRAW = MatchDictionary.DRAW,
    IN_PROGRESS = MatchDictionary.IN_PROGRESS, 
  }