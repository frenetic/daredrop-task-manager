import { req } from "../../../tests/helpers";
import { database } from "../../services/firebase";


describe('Listing Tasks', () => {
  beforeAll(async () => {
    const tasks = [
      {
        name: 'test task',
        description: 'first test task',
        isDone: false,
      },
      {
        name: 'second task',
        description: 'second test task',
        isDone: true,
      },
      {
        name: 'last one',
        description: 'it is boring to add tasks',
        isDone: false,
      }
    ];

    tasks.forEach(async (task) => {
      const entry = await database.collection('tasks').doc();
      await entry.set({ ...task, id: entry.id });
    });
  });

  afterAll(async () => {
    const documents = await database.collection('tasks').listDocuments();
    documents.forEach(async (doc) => await doc.delete());
  });

  it('should list tasks', async () => {
    const res = await req.get("/tasks").send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(3);

    const tasks = await database.collection('tasks').get();
    const allTasks: any[] = [];
    tasks.forEach(task => allTasks.push(task.data()));

    expect(res.body).toStrictEqual(allTasks);
  });
});