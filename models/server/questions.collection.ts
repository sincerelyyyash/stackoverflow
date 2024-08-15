
import { db, questionsCollection } from "../name"
import { IndexType, Permission } from "node-appwrite"
import { databases } from "./config"

export default async function createQuestionCollection() {
  await databases.createCollection(db, questionsCollection, questionsCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ])
  console.log("Question collection created")

  await Promise.all([
    databases.createStringAttribute(db, questionsCollection, "title", 100, true),
    databases.createStringAttribute(db, questionsCollection, "content", 10000, true),
    databases.createStringAttribute(db, questionsCollection, "authorId", 50, true),
    databases.createStringAttribute(db, questionsCollection, "tags", 50, true, undefined, true),
    databases.createStringAttribute(db, questionsCollection, "attachmentId", 50, false),
  ]);
  console.log("Question Attributes created")

  await Promise.all([
    databases.createIndex(db, questionsCollection, "title", IndexType.Fulltext, ["title"], ['asc']),
    databases.createIndex(db, questionsCollection, "content", IndexType.Fulltext, ["content"], ['asc']),
    databases.createIndex(db, questionsCollection, "authorId", IndexType.Fulltext, ["authorId"], ['asc']),
    databases.createIndex(db, questionsCollection, "tags", IndexType.Fulltext, ["tags"], ['asc']),
    databases.createIndex(db, questionsCollection, "attachmentId", IndexType.Fulltext, ["attachmentId"], ['asc']),
  ])
}
