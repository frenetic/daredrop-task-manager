import {req} from "../../../tests/helpers";
import {database} from "../../services/firebase";


describe("Listing Tasks", () => {
  it("should list all tasks", async () => {
    const res = await req.get("/tasks").send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);

    const tasks = await database.collection("tasks").get();
    const allTasks: any[] = [];
    tasks.forEach((task) => allTasks.push(task.data()));

    expect(res.body).toStrictEqual(allTasks);
  });

  it("should list filter by isDone = true", async () => {
    const res = await req.get("/tasks?isDone=true").send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);

    expect(res.body).toStrictEqual([
      {
        name: "ignore this other one as well",
        description: "this task will also be ignored",
        isDone: true,
      },
    ]);
  });

  it("should list filter by isDone = false", async () => {
    const res = await req.get("/tasks?isDone=false").send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);

    expect(res.body).toStrictEqual([
      {
        name: "ignore this task",
        description: "this task will be ignore",
        isDone: false,
      },
    ]);
  });
});
