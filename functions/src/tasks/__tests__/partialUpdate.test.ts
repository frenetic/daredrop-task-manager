import {req} from "../../../tests/helpers";
import {database} from "../../services/firebase";


describe("Updating Tasks", () => {
  let taskId: string;

  beforeEach(async () => {
    const entry = await database.collection("tasks").doc();
    taskId = entry.id;

    await entry.set({
      name: "task we want",
      description: "we will try to update this task on tests",
      isDone: false,
      id: taskId,
    });
  });

  it("should update the task we want when object contains all fields", async () => {
    const res = await req.patch(`/tasks/${taskId}`).send({
      name: "new name",
      description: "new description",
      isDone: true,
      id: taskId,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({
      name: "new name",
      description: "new description",
      isDone: true,
      id: taskId,
    });

    const tasks = await database.collection("tasks").get();
    const allTasks: any[] = [];
    tasks.forEach((task) => allTasks.push(task.data()));

    expect(allTasks.length).toBe(3);
    expect(allTasks).toContainEqual({
      name: "ignore this task",
      description: "this task will be ignore",
      isDone: false,
    });
    expect(allTasks).toContainEqual({
      name: "ignore this other one as well",
      description: "this task will also be ignored",
      isDone: true,
    });
    expect(allTasks).toContainEqual({
      name: "new name",
      description: "new description",
      isDone: true,
      id: taskId,
    });
  });

  it("should update the task we want when object DOES NOT contain ID", async () => {
    const res = await req.patch(`/tasks/${taskId}`).send({
      name: "new name",
      description: "new description without id",
      isDone: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({
      name: "new name",
      description: "new description without id",
      isDone: true,
      id: taskId,
    });

    const tasks = await database.collection("tasks").get();
    const allTasks: any[] = [];
    tasks.forEach((task) => allTasks.push(task.data()));

    expect(allTasks.length).toBe(3);
    expect(allTasks).toContainEqual({
      name: "ignore this task",
      description: "this task will be ignore",
      isDone: false,
    });
    expect(allTasks).toContainEqual({
      name: "ignore this other one as well",
      description: "this task will also be ignored",
      isDone: true,
    });
    expect(allTasks).toContainEqual({
      name: "new name",
      description: "new description without id",
      isDone: true,
      id: taskId,
    });
  });

  it("should return 404 when trying to update a non existing task", async () => {
    const res = await req.patch("/tasks/iddqd_idkfa").send({
      name: "404 please",
      description: "this test should return 404",
      isDone: true,
    });

    expect(res.statusCode).toBe(404);
  });

  it("should update when missing name field", async () => {
    const res = await req.patch(`/tasks/${taskId}`).send({
      description: "missing name",
      isDone: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({
      name: "task we want",
      description: "missing name",
      isDone: true,
      id: taskId,
    });

    const dbTask = await (await database.collection("tasks").doc(taskId).get()).data();

    expect(dbTask).toStrictEqual({
      name: "task we want",
      description: "missing name",
      isDone: true,
      id: taskId,
    });
  });

  it("should update when missing description field", async () => {
    const res = await req.patch(`/tasks/${taskId}`).send({
      name: "missing description",
      isDone: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({
      name: "missing description",
      description: "we will try to update this task on tests",
      isDone: true,
      id: taskId,
    });

    const dbTask = await (await database.collection("tasks").doc(taskId).get()).data();

    expect(dbTask).toStrictEqual({
      name: "missing description",
      description: "we will try to update this task on tests",
      isDone: true,
      id: taskId,
    });
  });

  it("should update when missing isDone field", async () => {
    const res = await req.patch(`/tasks/${taskId}`).send({
      name: "missing isDone",
      description: "where is isDone?",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({
      name: "missing isDone",
      description: "where is isDone?",
      isDone: false,
      id: taskId,
    });

    const dbTask = await (await database.collection("tasks").doc(taskId).get()).data();

    expect(dbTask).toStrictEqual({
      name: "missing isDone",
      description: "where is isDone?",
      isDone: false,
      id: taskId,
    });
  });

  it("should not update when isDone is not boolean", async () => {
    const res = await req.patch(`/tasks/${taskId}`).send({
      name: "integer isDone",
      description: "it is a big nono",
      isDone: 1,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body[0].message).toBe("must be boolean");

    const dbTask = await (await database.collection("tasks").doc(taskId).get()).data();

    expect(dbTask).toStrictEqual({
      name: "task we want",
      description: "we will try to update this task on tests",
      isDone: false,
      id: taskId,
    });
  });
});
