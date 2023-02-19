import { req } from '../../tests/helpers';
import { database } from '../services/firebase';

describe('Creating Tasks', () => {
  afterEach(async () => {
    const documents = await database.collection('tasks').listDocuments();
    documents.forEach(async (doc) => await doc.delete());
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
    expect(res.body).toStrictEqual({...newTask, id: res.body.id});

    const taskFromDB = await database.collection('tasks').doc(res.body.id).get();

    expect(res.body).toStrictEqual(taskFromDB.data());
  });
});