import { CandidatesNew } from "./candidates-new";

const EmptyScreen = () => {
  return <div>Empty Screen</div>;
};

const screens = [
  {
    id: "candidates-new",
    description: "Register a new application candidate",
    screen: CandidatesNew,
  },
];

export { screens, EmptyScreen };
