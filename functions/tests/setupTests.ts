import {database} from "../src/services/firebase";

beforeEach(async () => {
  const tasks = [
    {
      name: "ignore this task",
      description: "this task will be ignore",
      isDone: false,
    },
    {
      name: "ignore this other one as well",
      description: "this task will also be ignored",
      isDone: true,
    },
  ];

  await Promise.all(
    tasks.map(async (task) => {
      const entry = await database.collection("tasks").doc();
      await entry.set({...task});
    }),
  );
});


afterEach(async () => {
  const documents = await database.collection("tasks").listDocuments();
  await Promise.all(
    documents.map(async (doc) => await doc.delete()),
  );
});
