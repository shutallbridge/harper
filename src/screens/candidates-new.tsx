import { z } from "zod";

import { type Screen as ScreenType } from "@/lib/screens";
import { Button } from "@/components/button";
import { Panel, PanelHeader, PanelContent } from "@/components/panel";

const propsSchema = z.object({
  candidateId: z.string(),
});

// const result = props.safeParse({})

// if (result.success) {
//   result.data
// }

type ScreenProps = z.infer<typeof propsSchema>;

function Screen(props: ScreenProps) {
  const {} = props;

  // function fill_in_first_name(name: string) {
  //   return null;
  // }

  // const { fileds } = useAssistantForm({
  //   fieldName: "first_name"
  // })
  //
  // this would be used inside AssistantContext

  // inside useAssistantForm()
  //
  // const { registerTool } = useAssistant()
  // registerTool({ name: fillInForm, ... })

  return (
    <Panel className="min-w-xl">
      <PanelHeader className="flex justify-between items-center">
        <h1 className="text-gray-950 font-medium">Register New Candidate</h1>
        <Button>Save</Button>
      </PanelHeader>
      <PanelContent>Register new candidate screen</PanelContent>
    </Panel>
  );
}

const screen: ScreenType<typeof Screen> = {
  id: "candidates-new",
  description: "Register a new application candidate",
  propsSchema,
  render: (props) => <Screen candidateId={props.candidateId} />,
};

export { screen };
