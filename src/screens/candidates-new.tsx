import React from "react";
import { z } from "zod";

import { type Screen as ScreenType } from "@/lib/screens";
import { Button } from "@/components/button";
import { PanelHeader, PanelContent } from "@/components/panel";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { useAssistant } from "@/lib/assistant";

const propsSchema = z.object({});

type ScreenProps = z.infer<typeof propsSchema>;

function Screen(props: ScreenProps) {
  const {} = props;

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [linkedIn, setLinkedIn] = React.useState("");
  const [portfolio, setPortfolio] = React.useState("");
  const [github, setGithub] = React.useState("");
  const [skills, setSkills] = React.useState("");

  const { addClientRunDynamic } = useAssistant({ utils: {} });

  React.useEffect(() => {
    addClientRunDynamic({
      name: "fillInFirstName",
      description: "Fill-in the applican't first name",
      parameters: z.object({ firstName: z.string() }),
      handler: ({ args }) => {
        setFirstName(args.firstName);
        return "Successfully filled-in firstName";
      },
    });
  }, [addClientRunDynamic]);

  React.useEffect(() => {
    addClientRunDynamic({
      name: "fillInLastName",
      description: "Fill-in the applicant's last name",
      parameters: z.object({ lastName: z.string() }),
      handler: ({ args }) => {
        setLastName(args.lastName);
        return "Successfully filled-in lastName";
      },
    });
  }, [addClientRunDynamic]);

  React.useEffect(() => {
    addClientRunDynamic({
      name: "fillInEmail",
      description: "Fill-in the applicant's email",
      parameters: z.object({ lastName: z.string() }),
      handler: ({ args }) => {
        setEmail(args.lastName);
        return "Successfully filled-in email";
      },
    });
  }, [addClientRunDynamic]);

  React.useEffect(() => {
    addClientRunDynamic({
      name: "fillInLinkedIn",
      description: "Fill-in the applicant's LinkedIn URL",
      parameters: z.object({ linkedIn: z.string() }),
      handler: ({ args }) => {
        setLinkedIn(args.linkedIn);
        return "Successfully filled-in LinkedIn URL";
      },
    });
  }, [addClientRunDynamic]);

  React.useEffect(() => {
    addClientRunDynamic({
      name: "fillInPortfolio",
      description: "Fill-in the applicant's portfolio URL",
      parameters: z.object({ portfolio: z.string() }),
      handler: ({ args }) => {
        setPortfolio(args.portfolio);
        return "Successfully filled-in portfolio URL";
      },
    });
  }, [addClientRunDynamic]);

  React.useEffect(() => {
    addClientRunDynamic({
      name: "fillInGithub",
      description: "Fill-in the applicant's GitHub URL",
      parameters: z.object({ github: z.string() }),
      handler: ({ args }) => {
        setGithub(args.github);
        return "Successfully filled-in GitHub URL";
      },
    });
  }, [addClientRunDynamic]);

  React.useEffect(() => {
    addClientRunDynamic({
      name: "fillInSkills",
      description: "Fill-in the applicant's skills",
      parameters: z.object({ skills: z.string() }),
      handler: ({ args }) => {
        setSkills(args.skills);
        return "Successfully filled-in skills";
      },
    });
  }, [addClientRunDynamic]);

  return (
    <>
      <PanelHeader className="flex justify-between items-center">
        <h1 className="text-gray-950 font-medium text-base">
          Register New Candidate
        </h1>
        <Button size="sm">Save</Button>
      </PanelHeader>
      <PanelContent>
        <form className="p-6 space-y-12">
          <div className="space-y-6">
            <div>
              <h1 className="text-gray-950 font-medium">
                Personal Information
              </h1>
            </div>
            <div className="flex gap-x-6">
              <Input
                type="text"
                label="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                type="text"
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="max-w-116 space-y-6">
              <Input
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="url"
                label="LinkedIn"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-gray-950 font-medium">Role Specific</h1>
            </div>
            <Input
              label="Portfolio"
              type="url"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
            />
            <Input
              label="GitHub"
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
            <Textarea
              label="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
        </form>
      </PanelContent>
    </>
  );
}

const screen: ScreenType<typeof Screen> = {
  id: "candidatesNew",
  description: "Register a new application candidate",
  propsSchema,
  render: () => <Screen />,
};

export { screen };
