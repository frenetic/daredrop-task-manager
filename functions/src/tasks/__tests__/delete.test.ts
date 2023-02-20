import {req} from "../../../tests/helpers";
import {database} from "../../services/firebase";
import {Task} from "../types";


describe("Deleting Tasks", () => {
  let taskId: string;

  beforeEach(async () => {
    const entry = await database.collection("tasks").doc();
    taskId = entry.id;

    await entry.set({
      name: "task we want",
      description: "we will try to delete this task on tests",
      isDone: false,
      id: taskId,
    });
  });

  it("should delete the task we want", async () => {
    const res = await req.delete(`/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);

    const tasks = await database.collection("tasks").get();
    const allTasks: Task[] = [];
    tasks.forEach((task) => allTasks.push(task.data() as Task));

    expect(allTasks.length).toBe(2);
    expect(allTasks).toContainEqual(
      {
        name: "ignore this task",
        description: "this task will be ignore",
        isDone: false,
      },
    );

    expect(allTasks).toContainEqual(
      {
        name: "ignore this other one as well",
        description: "this task will also be ignored",
        isDone: true,
      });
  });

  it("should return 404 when trying to delete a non existing task", async () => {
    const res = await req.delete("/tasks/iddqd_idkfa");

    expect(res.statusCode).toBe(404);

    const tasks = await database.collection("tasks").get();
    const allTasks: Task[] = [];
    tasks.forEach((task) => allTasks.push(task.data() as Task));

    expect(allTasks.length).toBe(3);
  });
});
