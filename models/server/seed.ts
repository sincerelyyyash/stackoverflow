import { db } from "../name";
import createQuestionCollection from "./questions.collection";
import createVoteCollection from "./vote.collection";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comments.collection";

import { databases } from "./config";

export default async function getorCreateDB() {
  try {
    await databases.get(db)
    console.log("Database created")
    await Promise.all([
      createCommentCollection(),
      createAnswerCollection(),
      createVoteCollection(),
      createQuestionCollection(),
    ])
    console.log("Connection created");
    console.log("Database connected");
  } catch (error) {
    console.log("Error while creating databases or collection", error);
  }

  return databases;
}
