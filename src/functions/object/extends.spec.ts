import "./extends.function";
import { $extends } from "./extends.function";

describe("Function merge object", () => {
  it("Test merge objects default", () => {
    const objOne = { firstName: "Douglas" };
    const objTwo = { lastName: "Serena" };

    expect($extends(objOne, objTwo)).toStrictEqual({
      firstName: "Douglas",
      lastName: "Serena",
    });
  });
  it("Test merge objects compare ref", () => {
    const objOne = { firstName: "Douglas" };
    const objTwo = { lastName: "Serena" };

    $extends(objOne, objTwo);
    expect(objOne).toStrictEqual({
      firstName: "Douglas",
      lastName: "Serena",
    });
  });

  it("Test merge objects default with function", () => {
    const objOne = { firstName: "Douglas2" };
    const objTwo = {
      firstName: "Douglas",
      lastName: "Serena",
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    };

    expect($extends<typeof objOne & typeof objTwo>(objOne, objTwo).fullName()).toStrictEqual(
      "Douglas Serena"
    );
  });

  it("Test merge objects default with array", () => {
    const objOne = { firstName: "Douglas", like: ["Coca cola", "Cookie"] };
    const objTwo = {
      lastName: "Serena",
      dog: {
        like: ["bike"],
      },
    };

    $extends(objOne, objTwo);

    expect(objOne).toStrictEqual({
      firstName: "Douglas",
      like: ["Coca cola", "Cookie"],
      lastName: "Serena",
      dog: { like: ["bike"] },
    });
  });
});
