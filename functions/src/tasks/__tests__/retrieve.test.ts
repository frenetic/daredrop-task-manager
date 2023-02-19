import { req } from "../../../tests/helpers";
import { database } from "../../services/firebase";


describe('Retrieving Tasks', () => {
  let taskId: string;

  beforeAll(async () => {
    const tasks = [
      {
        name: 'ignore this task',
        description: 'this task will be ignore',
        isDone: false,
      },
      {
        name: 'ignore this other one as well',
        description: 'this task will also be ignored',
        isDone: true,
      },
    ];

    tasks.forEach(async (task) => {
      const entry = await database.collection('tasks').doc();
      await entry.set({ ...task, id: entry.id });
    });
  });

  beforeAll(async () => {
    const entry = await database.collection('tasks').doc();
    taskId = entry.id;

    await entry.set({
      name: 'task we want',
      description: 'we will try to query this task on tests',
      isDone: false,
      id: taskId,
    });
  });

  afterAll(async () => {
    const documents = await database.collection('tasks').listDocuments();
    documents.forEach(async (doc) => await doc.delete());
  });

  it('should retrive the task we want', async () => {
    const res = await req.get(`/tasks/${taskId}`);

    expect(res.statusCode).toBe(200);

    expect(res.body).toStrictEqual({
      name: 'task we want',
      description: 'we will try to query this task on tests',
      isDone: false,
      id: taskId,
    });
  });
});