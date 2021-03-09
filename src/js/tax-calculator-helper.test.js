import calculateTax from "./tax-calculator-helper";
describe("calculateTax function", () => {
    it("should be smart enough to check non-income holders",() => {
        expect(calculateTax("2018","25","450000","500000")).toBe("You are investing more than you earn. Fishy!!");
    })
    it("should calculate max slab tax for year 2020", () => {
        expect(calculateTax("2020","65","3800000","100000")).toBe(830812.5);
    })
    it("should calculate max slab tax for year 2019", () => {
        expect(calculateTax("2019","45","3800000","100000")).toBe(938400);
    })
    it("should calculate max slab tax for year 2018", () => {
        expect(calculateTax("2018","35","3800000","100000")).toBe(959500);
    })
    it("should calculate tax for year 2019", () => {
        expect(calculateTax("2019","25","825000","75000")).toBe(80000);
    })
    it("should calculate tax for year 2018", () => {
        expect(calculateTax("2018","25","90000")).toBe(0);
    })
    it("should calculate tax for year 2018 in TAXSLAB3", () => {
        expect(calculateTax("2018","25","510000")).toBe(42000);
    })
    it("should calculate tax for year 2019 in TAXSLAB3", () => {
        expect(calculateTax("2019","25","450000")).toBe(35000);
    })
    it("should calculate tax only if a valid year is given", () => {
        expect(calculateTax("","25","450000")).toBe("Not a valid year for calculation");
    })
    it("should calculate tax for year 2018 without age", () => {
        expect(calculateTax("2018","90000")).toBe(0);
    })
})