import { getPreferenceValues } from "@raycast/api";
import AddTriggerForm from "./AddTriggerForm";
import { MatchFileSelection } from "./MatchFileSelection";
import { EspansoMatchFile, GlobalPreferences } from "./types";
import { useMatchFiles } from "./utils";

export default function AddTriggerCommand() {
  const espansoPath = getPreferenceValues<GlobalPreferences>().espansoPath;
  const matchFiles = useMatchFiles(espansoPath);

  return (
    <MatchFileSelection
      matchFiles={matchFiles}
      target={(matchFile: EspansoMatchFile) => <AddTriggerForm matchFile={matchFile} />}
    />
  );
}
