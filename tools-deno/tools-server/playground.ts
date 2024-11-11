import {
  createDynamoDBDocumentClient,
  DynamoDBTableImpl,
} from "./src/aws_dynamodb/mod.ts";

const _table = new DynamoDBTableImpl(createDynamoDBDocumentClient(), {
  tableName: "Playground",
  fields: {
    id: "string",
    strength: "number",
    pokemonName: "string",
  },
});

// const response = await table.createOne({
//   data: {
//     id: crypto.randomUUID(),
//     pokemonName: "Greninja",
//     strength: 400,
//   },
// });

// const response = await table.updateOne({
//   key: { id: "b8d89019-9a04-40aa-93a1-dc3ae8dbcbdc" },
//   data: { strength: 101 },
// });

// console.log(response);
