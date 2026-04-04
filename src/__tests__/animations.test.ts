import { describe, it, expect } from "vitest";
import { transition } from "@/utils/animations";

describe("animations", () => {
    it("exports a transition object with duration", () => {
        expect(transition).toBeDefined();
        expect(transition.duration).toBe(0.25);
    });

    it("has a valid easing array with 4 numbers", () => {
        expect(transition.ease).toHaveLength(4);
        transition.ease.forEach((val: number) => {
            expect(typeof val).toBe("number");
        });
    });
});
