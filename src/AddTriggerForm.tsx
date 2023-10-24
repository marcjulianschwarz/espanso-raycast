import { Action, ActionPanel, Form, getPreferenceValues, Icon, List, useNavigation } from "@raycast/api";
import path from "path";
import { useEffect, useReducer } from "react";
import { EspansoMatchFile, GlobalPreferences, UserAction, MatchFileReducerAction, Match } from "./types";
import { matchFileReducer, useMatchFiles } from "./utils";

type FormValue = {
  trigger: string;
  replace: string;
};

export default function AddTriggerForm(props: { matchFile: EspansoMatchFile }) {
  const { pop } = useNavigation();
  const espansoPath = getPreferenceValues<GlobalPreferences>().espansoPath;
  const matchFilePath = path.join(espansoPath, props.matchFile.filename);

  const [matchFile, dispatch] = useReducer(matchFileReducer, props.matchFile);

  useEffect(() => {
    return () => {
      pop();
    };
  }, [matchFile]);

  function handleSubmit(form: FormValue) {
    const trigger = form.trigger;
    const replace = form.replace;
    dispatch({ type: UserAction.Add, payload: { trigger: trigger, replace: replace } });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Add a simple trigger to the Espanso config file." />
      <Form.TextField id="trigger" title="Trigger" placeholder=":example" defaultValue="" />
      <Form.TextField id="replace" title="Text" placeholder="Replacement" defaultValue="" />
    </Form>
  );
}
