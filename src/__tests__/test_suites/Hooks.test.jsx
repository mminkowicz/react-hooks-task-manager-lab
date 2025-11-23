import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../../components/App";
import { TaskProvider } from "../../context/TaskContext";

describe("Task Manager App", () => {
  test("renders initial tasks from the backend", async () => {
    global.setFetchResponse(global.baseTasks)
    let { getByText } = render(
      <TaskProvider>
        <App />
      </TaskProvider>
    );
    
    await waitFor(() => {
      expect(getByText("Buy groceries")).toBeInTheDocument();
      expect(getByText("Finish React project")).toBeInTheDocument();
    });
  });

  test("adds a new task when the form is submitted", async () => {
    global.setFetchResponse(global.baseTasks)
    let { getByText,getByPlaceholderText } = render(
      <TaskProvider>
        <App />
      </TaskProvider>
    );

    const input = getByPlaceholderText("Add a new task...");
    const button = getByText("Add Task");

    fireEvent.change(input, { target: { value: "Walk the dog" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Walk the dog")).toBeInTheDocument();
    });
  });

  test("filters tasks based on search input", async () => {
    global.setFetchResponse(global.baseTasks)
    render(
      <TaskProvider>
        <App />
      </TaskProvider>
    );

    const searchInput = screen.getByPlaceholderText("Search tasks...");

    fireEvent.change(searchInput, { target: { value: "groceries" } });

    await waitFor(() => {
      expect(screen.getByText("Buy groceries")).toBeInTheDocument();
      expect(screen.queryByText("Finish React project")).not.toBeInTheDocument();
    });
  });

  test("toggles task completion state", async () => {
    global.setFetchResponse(global.baseTasks)
    let { getByText, findAllByTestId } = render(
      <TaskProvider>
        <App />
      </TaskProvider>
    );
    const button =  await findAllByTestId("1")
    global.setFetchResponse([{
        "id": 1,
        "name": "Woody",
        "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
        "likes": 8
    }])
    
    
    await waitFor(() => {
        fireEvent.click(button[0]);
        expect(getByText("Undo")).toBeInTheDocument();
    });
  });
});