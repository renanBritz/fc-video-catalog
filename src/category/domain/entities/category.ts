import Entity from "../../../@seedwork/domain/entity/entity";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export type UpdateCategoryProperties = Pick<
  CategoryProperties,
  "name" | "description"
>;

export default class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    super(props, id);
    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get is_active() {
    return this.props.is_active;
  }

  get created_at() {
    return this.props.created_at;
  }

  update(props: UpdateCategoryProperties) {
    this.name = props.name;
    this.description = props.description ?? this.description;
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }
}
