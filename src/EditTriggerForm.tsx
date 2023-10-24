import { Action, ActionPanel, Form, useNavigation } from "@raycast/api";
import { Match } from "./types";

type FormValue = {
  trigger: string;
  replace: string;
};

export default function EditTriggerForm(props: { match: Match; onSubmit: (match: Match) => void }) {
  const { pop } = useNavigation();

  function handleSubmit(form: FormValue) {
    props.onSubmit(form as Match);
    pop();
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Edit a simple trigger in the Espanso config file." />
      <Form.TextField id="trigger" title="Trigger" placeholder=":example" defaultValue={props.match.trigger} />
      <Form.TextField id="replace" title="Text" placeholder="Replacement" defaultValue={props.match.replace} />
    </Form>
  );
}
