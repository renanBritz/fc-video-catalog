import Category from "./category";
import { omit } from "lodash";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

describe("Category unit tests", () => {
  describe("creating category", () => {
    test("constructor of category", () => {
      let category = new Category({ name: "Movie" });
      let props = omit(category.props, "created_at");
      expect(props).toStrictEqual({
        name: "Movie",
        description: null,
        is_active: true,
      });
      expect(category.props.created_at).toBeInstanceOf(Date);

      let created_at = new Date(); //string
      category = new Category({
        name: "Movie",
        description: "some description",
        is_active: false,
        created_at,
      });
      expect(category.props).toStrictEqual({
        name: "Movie",
        description: "some description",
        is_active: false,
        created_at,
      });

      category = new Category({
        name: "Movie",
        description: "other description",
      });
      expect(category.props).toMatchObject({
        name: "Movie",
        description: "other description",
      });

      category = new Category({
        name: "Movie",
        is_active: true,
      });
      expect(category.props).toMatchObject({
        name: "Movie",
        is_active: true,
      });

      created_at = new Date();
      category = new Category({
        name: "Movie",
        created_at,
      });
      expect(category.props).toMatchObject({
        name: "Movie",
        created_at,
      });
    });

    test("id field", () => {
      const testData = [
        { props: { name: "Movie" } },
        { props: { name: "Movie" }, id: null },
        { props: { name: "Movie" }, id: undefined },
        {
          props: { name: "Movie" },
          id: new UniqueEntityId("4a637de4-956c-44f3-86c1-e79166e52230"),
        },
      ];

      testData.forEach((data) => {
        const category = new Category(data.props, data.id);
        expect(category.id).not.toBeNull();
        expect(category.id).toBeInstanceOf(UniqueEntityId);
      });
    });

    test("getter of name prop", () => {
      const category = new Category({ name: "Movie" });
      expect(category.name).toBe("Movie");
    });

    test("getter and setter of description prop", () => {
      let category = new Category({ name: "Movie" });
      expect(category.description).toBeNull();

      category = new Category({
        name: "Movie",
        description: "some description",
      });
      expect(category.description).toBe("some description");

      category = new Category({ name: "Movie" });
      category["description"] = "other description";

      expect(category.description).toBe("other description");

      category["description"] = undefined;
      expect(category.description).toBeNull();

      category["description"] = null;
      expect(category.description).toBeNull();
    });

    test("getter and setter of is_active prop", () => {
      let category = new Category({ name: "Movie" });
      expect(category.is_active).toBeTruthy();

      category = new Category({ name: "Movie", is_active: true });
      expect(category.is_active).toBeTruthy();

      category = new Category({ name: "Movie", is_active: false });
      expect(category.is_active).toBeFalsy();
    });

    test("getter of created_at prop", () => {
      let category = new Category({ name: "Movie" });
      expect(category.created_at).toBeInstanceOf(Date);

      const created_at = new Date();
      category = new Category({ name: "Movie", created_at });
      expect(category.created_at).toBe(created_at);
    });
  });

  describe("updating category", () => {
    test("updates name and description", () => {
      let category = new Category({
        name: "Movie",
        description: "Movie Description",
      });

      category.update({
        name: "Documentary",
        description: "Documentary Description",
      });

      expect(category.props).toMatchObject({
        name: 'Documentary',
        description: 'Documentary Description'
      });
    });

    test("updates name and keeps old description", () => {
      let category = new Category({
        name: "Movie",
        description: "Movie Description",
      });

      category.update({ name: "Documentary" });

      expect(category.props).toMatchObject({
        name: 'Documentary',
        description: 'Movie Description'
      });
    });
  });

  describe('(de)activatinga categories', () => {
    test('activates inactive category', () => {
      let category = new Category({
        name: "Movie",
        description: "Movie Description",
        is_active: false
      });

      category.activate();
      expect(category.is_active).toBeTruthy();
    })

    test('deactivates active category', () => {
      let category = new Category({
        name: "Movie",
        description: "Movie Description",
        is_active: true
      });

      category.deactivate();
      expect(category.is_active).toBeFalsy();
    })
  });
});
