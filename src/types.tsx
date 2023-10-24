export type GlobalPreferences = {
  espansoPath: string;
};

export type EspansoMatchFile = {
  matches: Match[];
  filename: string;
};

export type Match = TriggerMatch | RegexMatch;

export type TriggerMatch = {
  trigger: string;
  replace: string;
};

export type RegexMatch = {
  regex: string;
  replace: string;
};

export enum UserAction {
  Add,
}

export type MatchFileReducerAction = { type: UserAction.Add; payload: Match };
