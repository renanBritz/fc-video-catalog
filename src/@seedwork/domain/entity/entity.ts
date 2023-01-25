import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export default abstract class Entity<Props> {
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId();
  }

  get id() {
    return this.uniqueEntityId;
  }

  serialize(): Required<{id: string} & Props> {
    return {
      id: this.id,
      ...this.props
    } as Required<{id: string} & Props>;
  }

  toJSON() {
    return JSON.stringify(this.serialize());
  }
}