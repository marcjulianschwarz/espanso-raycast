import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { EspansoMatchFile } from "./types";

export function MatchFileSelection(props: {
  matchFiles: EspansoMatchFile[];
  target: (matchFile: EspansoMatchFile) => React.ReactNode;
}) {
  return (
    <List>
      {props.matchFiles.map((matchFile: EspansoMatchFile) => {
        return (
          <List.Item
            key={matchFile.filename}
            title={matchFile.filename}
            actions={
              <ActionPanel>
                <Action.Push title="Add Trigger" icon={Icon.PlusCircle} target={props.target(matchFile)} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
