import React from "react";
import { z } from "zod";

import { type Screen as ScreenType } from "@/lib/screens";
import { Button } from "@/components/button";
import { Panel, PanelHeader, PanelContent } from "@/components/panel";

const propsSchema = z.object({});

type ScreenProps = z.infer<typeof propsSchema>;

function Screen(props: ScreenProps) {
  const {} = props;

  const candidates = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Frontend Developer",
      appliedDate: "2024-03-15",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "DevOps Engineer",
      appliedDate: "2024-03-14",
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Product Manager",
      appliedDate: "2024-03-14",
    },
    {
      id: 4,
      name: "James O'Connor",
      role: "Backend Developer",
      appliedDate: "2024-03-13",
    },
    {
      id: 5,
      name: "Yuki Tanaka",
      role: "UX Designer",
      appliedDate: "2024-03-13",
    },
    {
      id: 6,
      name: "Zainab Al-Hassan",
      role: "Data Scientist",
      appliedDate: "2024-03-12",
    },
    {
      id: 7,
      name: "David Kim",
      role: "Full Stack Developer",
      appliedDate: "2024-03-12",
    },
    {
      id: 8,
      name: "Elena Popov",
      role: "Software Architect",
      appliedDate: "2024-03-11",
    },
    {
      id: 9,
      name: "Thomas Nielsen",
      role: "QA Engineer",
      appliedDate: "2024-03-11",
    },
    {
      id: 10,
      name: "Priya Sharma",
      role: "Mobile Developer",
      appliedDate: "2024-03-10",
    },
    {
      id: 11,
      name: "André Santos",
      role: "Systems Analyst",
      appliedDate: "2024-03-10",
    },
    {
      id: 12,
      name: "Grace Wong",
      role: "Cloud Engineer",
      appliedDate: "2024-03-09",
    },
  ];

  return (
    <Panel className="min-w-xl">
      <PanelHeader className="flex justify-between items-center">
        <h1 className="text-gray-950 font-medium text-xl">Candidates List</h1>
        <Button>Add New</Button>
      </PanelHeader>
      <PanelContent>
        <div className="p-6">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left pb-3 text-gray-600">Name</th>
                <th className="text-left pb-3 text-gray-600">Role</th>
                <th className="text-left pb-3 text-gray-600">Applied Date</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3">{candidate.name}</td>
                  <td className="py-3">{candidate.role}</td>
                  <td className="py-3">
                    {new Date(candidate.appliedDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelContent>
    </Panel>
  );
}

const screen: ScreenType<typeof Screen> = {
  id: "candidatesList",
  description: "View and manage application candidates",
  propsSchema,
  render: () => <Screen />,
};

export { screen };
