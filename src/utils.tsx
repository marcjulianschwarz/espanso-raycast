import fs from "fs";
import path from "path";
import yaml from "yaml";
import { useEffect, useState } from "react";
import { EspansoMatchFile, Match, MatchFileReducerAction, UserAction } from "./types";
import { showToast } from "@raycast/api";

export function readFiles(dirname: string) {
  return fs.readdirSync(dirname).filter((filename: string) => {
    return filename.endsWith(".yml");
  });
}

export function useMatchFiles(espansoPath: string) {
  const [matchFiles, setMatchFiles] = useState<EspansoMatchFile[]>([]);
  useEffect(() => {
    const filenames = readFiles(espansoPath);
    filenames.forEach((filename: string) => {
      const content = fs.readFileSync(path.join(espansoPath, filename)).toString();
      const matches = yaml.parse(content).matches;

      setMatchFiles((prev: EspansoMatchFile[]) => {
        return [...prev, { matches: matches, filename: filename }];
      });
    });
  }, []);
  return matchFiles;
}

export function matchFileReducer(matchFile: EspansoMatchFile, action: MatchFileReducerAction) {
  switch (action.type) {
    case UserAction.Add:
      const newMatchFile = {
        ...matchFile,
        matches: [...matchFile.matches, action.payload],
      };
      const newConfig = { matches: newMatchFile.matches };
      const newYaml = yaml.stringify(newConfig);

      fs.writeFileSync(
        "/Users/.../Library/Application Support/espanso/match/" + matchFile.filename,
        newYaml
      );
      showToast({ title: "Added Trigger 🎉" });
      return newMatchFile;

    default:
      console.log("default");
      return matchFile;
  }
}
