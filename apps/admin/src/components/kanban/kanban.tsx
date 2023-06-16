import { motion } from "framer-motion";
import React, { useRef } from "react";

interface Props {}
const lanes = [
  {
    name: "To Do",
    tickets: [
      {
        title:
          "We don't have a brig. Meh. Calculon is gonna kill us and it's all everybody else's fault!",
        author: "Philip J. Fry",
        created_at: "16 hours ago",
        level: "Medium Level",
        comments_count: 12,
      },
      {
        title:
          "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
        author: "Turanga Leela",
        created_at: "16 hours ago",
        level: "High Level",
        comments_count: 1,
      },
      {
        title:
          "Stop it, stop it. It's fine. I will 'destroy' you! I can explain. It's very valuable. ",
        author: "Bender Bending Rodriguez",
        created_at: "16 hours ago",
        level: "Low Level",
        comments_count: 12,
      },
      {
        title:
          "Hey, whatcha watching? Hey! I'm a porno-dealing monster, what do I care what you think? It must be wonderful.",
        author: "Professor Farnsworth",
        created_at: "16 hours ago",
        level: "Medium Level",
        comments_count: 0,
      },
      {
        title:
          "A superpowers drug you can just rub onto your skin? You'd think it would be something you'd have to freebase.",
        author: "Amy Wong",
        created_at: "16 hours ago",
        level: "High Level",
        comments_count: 56,
      },
      {
        title:
          "Robot 1-X, save my friends! And Zoidberg! Perhaps, but perhaps your civilization is merely the sewer of an even greater society above you!",
        author: "Hermes Conrad",
        created_at: "16 hours ago",
        level: "Medium Level",
        comments_count: 10,
      },
      {
        title:
          "You are the last hope of the universe. Stop! Don't shoot fire stick in space canoe!",
        author: "Dr. John A. Zoidberg",
        created_at: "16 hours ago",
        level: "Low Level",
        comments_count: 3,
      },
    ],
  },
  {
    name: "In Progress",
    tickets: [
      {
        title:
          "You are the last hope of the universe. Stop! Don't shoot fire stick in space canoe!",
        author: "Dr. John A. Zoidberg",
        created_at: "16 hours ago",
        level: "Low Level",
        comments_count: 12,
      },
      {
        title:
          "A superpowers drug you can just rub onto your skin? You'd think it would be something you'd have to freebase.",
        author: "Amy Wong",
        created_at: "16 hours ago",
        level: "High Level",
        comments_count: 2,
      },
      {
        title:
          "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
        author: "Turanga Leela",
        created_at: "16 hours ago",
        level: "High Level",
        comments_count: 12,
      },
    ],
  },
  {
    name: "Done",
    tickets: [
      {
        title:
          "Stop it, stop it. It's fine. I will 'destroy' you! I can explain. It's very valuable. ",
        author: "Bender Bending Rodriguez",
        created_at: "16 hours ago",
        level: "Low Level",
        comments_count: 12,
      },
      {
        title:
          "Hey, whatcha watching? Hey! I'm a porno-dealing monster, what do I care what you think? It must be wonderful.",
        author: "Professor Farnsworth",
        created_at: "16 hours ago",
        level: "Medium Level",
        comments_count: 0,
      },
      {
        title:
          "We don't have a brig. Meh. Calculon is gonna kill us and it's all everybody else's fault!",
        author: "Philip J. Fry",
        created_at: "16 hours ago",
        level: "Medium Level",
        comments_count: 12,
      },
      {
        title:
          "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
        author: "Turanga Leela",
        created_at: "16 hours ago",
        level: "High Level",
        comments_count: 1,
      },
    ],
  },
];
const Kanban: React.FC<Props> = () => {
  return (
    <section>
      <div className="flex h-screen w-screen flex-col bg-blue-200">
        <header className="m-4 p-2">
          <h1 className="text-2xl font-bold">Team Project Board</h1>
        </header>
        {lanes.map((lane, index) => (
          <div className="m-4 flex h-min w-72 flex-shrink-0 flex-col rounded-md bg-gray-100">
            <h3 className="p-2">Backlog</h3>
            <motion.div>
              <motion.div drag className="m-2">
                <div className="flex flex-col rounded-md bg-white p-2 shadow">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-800">
                      {" "}
                      Add discount code to checkout page.
                    </p>
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80"
                      alt="user-2"
                      className="h-8 w-8 rounded-full"
                    />
                  </div>

                  <div className="mt-4 flex justify-between">
                    <p className="text-xs text-gray-600">Jun 8</p>
                    <div className="rounded-lg bg-teal-100 p-2 text-xs font-semibold text-teal-500">
                      Feature request
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Kanban;
