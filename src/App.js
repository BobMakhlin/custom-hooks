import React, { useCallback, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttpRequest from "./hooks/use-http";

const URL =
  "https://react-http-c16bc-default-rtdb.europe-west1.firebasedatabase.app/tasks.json";

function App() {
  const { sendRequest: getTasks, error, isLoading } = useHttpRequest();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    const data = await getTasks(URL);
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }
    setTasks(loadedTasks);
  }, [getTasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
