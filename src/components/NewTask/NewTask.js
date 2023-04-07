import { useCallback } from "react";
import useHttpRequest, { RequestConfig } from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const URL =
  "https://react-http-c16bc-default-rtdb.europe-west1.firebasedatabase.app/tasks.json";

const NewTask = ({ onAddTask }) => {
  const { sendRequest: postTask, error, isLoading } = useHttpRequest();

  const enterTaskHandler = useCallback(
    async (taskText) => {
      const data = await postTask(
        URL,
        new RequestConfig({
          method: "POST",
          body: { text: taskText },
          headers: {
            "Content-Type": "application/json",
          },
        })
      );

      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      onAddTask(createdTask);
    },
    [postTask, onAddTask]
  );

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
