import { add, getUserName } from "./math.js";

test("add numbers:", () => {
    expect(add(1, 2)).toBe(3);
});

test("checks userName", () => {
    expect(getUserName({ name: "Vipul" })).toBe("Vipul");
    expect(getUserName(null)).toBe("Guest");
});