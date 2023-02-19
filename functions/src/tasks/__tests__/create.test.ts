import { req } from "../../../tests/helpers";
import { database } from "../../services/firebase";

describe('Creating Tasks', () => {
  afterEach(async () => {
    const documents = await database.collection('tasks').listDocuments();
    await Promise.all(
      documents.map(async (doc) => await doc.delete()),
    );
  });

  it("should create a new task", async () => {
    const newTask = {
      name: "first task",
      description: "Trying to add our first task",
      isDone: false,
    };

    const res = await req.post("/tasks").send(newTask);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toStrictEqual({ ...newTask, id: res.body.id });

    const taskFromDB = await database.collection('tasks').doc(res.body.id).get();

    expect(res.body).toStrictEqual(taskFromDB.data());
  });

  it("should not create a task when json is empty", async () => {
    const newTask = {};

    const res = await req.post("/tasks").send(newTask);

    expect(res.statusCode).toBe(400);
  });

  it("should not create a task when task is missing name", async () => {
    const newTask = {
      description: "Task without a name",
      isDone: false,
    };

    const res = await req.post("/tasks").send(newTask);

    expect(res.statusCode).toBe(400);
    expect(res.body[0].message).toBe("must have required property 'name'");
  });

  it("should not create a task when json is empty", async () => {
    const newTask = {};

    const res = await req.post("/tasks").send(newTask);

    expect(res.statusCode).toBe(400);
  });

  it("should not create a task when task is missing description", async () => {
    const newTask = {
      name: "Task without a description",
      isDone: false,
    };

    const res = await req.post("/tasks").send(newTask);

    expect(res.statusCode).toBe(400);
    expect(res.body[0].message).toBe("must have required property 'description'");
  });

  it("should not create a task when task is missing isDone", async () => {
    const newTask = {
      name: "isDoneLess",
      description: "Task without a isDone",
    };

    const res = await req.post("/tasks").send(newTask);

    expect(res.statusCode).toBe(400);
    expect(res.body[0].message).toBe("must have required property 'isDone'");
  });

  it("should not create a task when isDone is a string", async () => {
    const newTask = {
      name: "isDone is not boolean",
      description: "isDone is a string",
      isDone: "true",
    };

    const res = await req.post("/tasks").send(newTask);

    expect(res.statusCode).toBe(400);
    expect(res.body[0].message).toBe("must be boolean");
  });

  it("should not create a task when isDone is an integer", async () => {
    const newTask = {
      name: "isDone is not boolean",
      description: "isDone is am integer",
      isDone: 1,
    };

    const res = await req.post("/tasks").send(newTask);

    expect(res.statusCode).toBe(400);
    expect(res.body[0].message).toBe("must be boolean");
  });
});

