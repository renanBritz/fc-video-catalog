import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import Entity from "./entity";
import { validate as uuidValidate } from "uuid";

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe("Entity unit tests", () => {
  it("should set props and id", () => {
    const data = { prop1: "prop1 value", prop2: 10 };
    const entity = new StubEntity(data);
    expect(entity.props).toStrictEqual(data);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).not.toBeNull();
    expect(uuidValidate(entity.id.value)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    const data = { prop1: "prop1 value", prop2: 10 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(data, uniqueEntityId);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id.value).toBe(uniqueEntityId.value);
  });

  it("should serialize an entity", () => {
    const data = { prop1: "prop1 value", prop2: 10 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(data, uniqueEntityId);

    expect(entity.serialize()).toStrictEqual({ id: uniqueEntityId, ...data });
  });
});
