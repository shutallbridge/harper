import { Button } from "@/components/button";
import { Panel, PanelHeader, PanelContent } from "@/components/panel";

function CandidatesNew() {
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

export { CandidatesNew };
