import { getPreferenceValues, List } from "@raycast/api";
import { EspansoMatchFile, GlobalPreferences, Match } from "./types";
import { useMatchFiles } from "./utils";

export default function Command() {
  const espansoPath = getPreferenceValues<GlobalPreferences>().espansoPath;
  const matchFiles = useMatchFiles(espansoPath);

  // function removeTrigger(match: Match) {
  //   const newMatches = config.matches.filter((m: Match) => {
  //     return m.trigger != match.trigger;
  //   });
  //   const newConfig = { matches: newMatches };
  //   setConfig(newConfig);

  //   const newYaml = yaml.stringify(newConfig);
  //   fs.writeFileSync("/Users/.../Library/Application Support/espanso/match/raycast.yml", newYaml);
  //   showToast({ title: "Removed Trigger." });
  // }

  // function editTrigger(match: Match) {
  //   const newMatches = config.matches.filter((m: Match) => {
  //     return m.trigger != match.trigger;
  //   });
  //   const newConfig = { matches: newMatches };
  //   setConfig(newConfig);

  //   const newYaml = yaml.stringify(newConfig);
  //   fs.writeFileSync("/Users/.../Library/Application Support/espanso/match/raycast.yml", newYaml);
  //   showToast({ title: "Removed Trigger." });
  // }

  return (
    <List
      isShowingDetail={true}
      // actions={
      //   <ActionPanel>
      //     <Action.Push
      //       title="Add Trigger"
      //       icon={Icon.PlusCircle}
      //       target={<AddTriggerForm onSubmit={addTrigger}></AddTriggerForm>}
      //     />
      //   </ActionPanel>
      // }
    >
      {matchFiles.map((matchFile: EspansoMatchFile) => {
        return (
          <List.Section
            title={matchFile.filename}
            subtitle={matchFile.matches.length.toString()}
            key={matchFile.filename}
          >
            {matchFile.matches.map((match: Match) => {
              const triggerable = "trigger" in match ? match.trigger : match.regex;
              const replaceable = match.replace;
              return (
                <List.Item
                  title={triggerable}
                  subtitle={match.replace}
                  keywords={[triggerable, replaceable, matchFile.filename]}
                  detail={<List.Item.Detail markdown={`**${triggerable}** ${replaceable}`} />}
                  key={match.replace}
                  // actions={
                  //   <ActionPanel>
                  //     <Action.Push
                  //       title="Add Trigger"
                  //       icon={Icon.PlusCircle}
                  //       target={<AddTriggerForm onSubmit={addTrigger}></AddTriggerForm>}
                  //     />
                  //     <Action.Push
                  //       title="Edit Trigger"
                  //       icon={Icon.Pencil}
                  //       target={<EditTriggerForm match={match} onSubmit={addTrigger} />}
                  //     />
                  //     <Action
                  //       title="Delete Trigger"
                  //       onAction={() => removeTrigger(match)}
                  //       style={Action.Style.Destructive}
                  //       icon={Icon.Trash}
                  //       shortcut={{ modifiers: ["cmd"], key: "x" }}
                  //     />
                  //   </ActionPanel>
                  // }
                ></List.Item>
              );
            })}
          </List.Section>
        );
      })}
    </List>
  );
}
