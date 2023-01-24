import { validate as uuidValidate } from "uuid";

import InvalidUuidError from "../../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";

const spyValidateMethod = () => {
  return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
}

describe("UniqueEntityId tests", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept an uuid passed in constructor', () => {
    const validateSpy = spyValidateMethod();
    const uuid = '4a637de4-956c-44f3-86c1-e79166e52230';
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid)
    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  })
});
