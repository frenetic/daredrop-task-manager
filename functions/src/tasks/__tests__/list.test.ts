import { req } from "../../../tests/helpers";
import { database } from "../../services/firebase";


describe('Listing Tasks', () => {
  it('should list tasks', async () => {
    const res = await req.get("/tasks").send();
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);
  
    const tasks = await database.collection('tasks').get();
    const allTasks: any[] = [];
    tasks.forEach(task => allTasks.push(task.data()));
  
    expect(res.body).toStrictEqual(allTasks);
  });
});