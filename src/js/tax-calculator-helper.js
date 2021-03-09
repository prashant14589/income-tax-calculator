// export enum TaxSlab {

// }
const calculateTax = (year, age, income, investment) => {
    const taxSlabForYear = TAXSLAB[year];
    if (income <= TAXFREE) {
        return 0;
    }
    else if(income < investment){
        return "You are investing more than you earn. Fishy!!";
    }
    else if (year == "2018") {
        return taxCal2018(income, investment)
    }
    else if (year == "2019") {
        return taxCal2019(taxSlabForYear, age, income, investment)
    }
    else if (year == "2020") {
        return taxCal2020(taxSlabForYear, age, income, investment)
    }
    else {
        return "Not a valid year for calculation";
    }

}

const TAXFREE = 100000;
const TAXSLAB2_2018 = 400000;
const TAXSLAB2_2019 = 500000;
const TAXSLAB2_2020 = 900000;
const TAXSLAB3_2018 = 500000;
const TAXSLAB3_2019 = 600000;

export const TAXSLAB = {
    "2018": {
        CESSLIMIT: { value: 500000, percentage: .01 },
        TAXSLAB1: { value: 1000000, percentage: .30 },
        TAXSLAB2: { value: 500000, percentage: .20, fixedTax: 100000 },
        TAXSLAB3: { value: 100000, percentage: .10, fixedTax: 40000 }
    },
    "2019": {
        AGEFACTOR: { age: 60, value: 50000 },
        CESSLIMIT: { value: 500000, percentage: .02 },
        TAXSLAB1: { value: 1200000, percentage: .30 },
        TAXSLAB2: { value: 600000, percentage: .20, fixedTax: 120000 },
        TAXSLAB3: { value: 100000, percentage: .10, fixedTax: 50000 },
    },
    "2020": {
        AGEFACTOR: { age: 60, value: 75000 },
        CESSLIMIT: { value: 500000, percentage: .05 },
        TAXSLAB1: { value: 1000000, percentage: .25, fixedRate: 0 },
        TAXSLAB2: { value: 100000, percentage: .15, fixedTax: 135000 },
    }
}

const calculator = (year, amount) => {
    let tax = 0;

    const taxSlabForYear = TAXSLAB[year];
    // TODO - This could be reduced by a recursive loop maybe on the tax-slabs
    if (amount > taxSlabForYear.TAXSLAB1.value) {
        tax = (amount - taxSlabForYear.TAXSLAB1.value) * taxSlabForYear.TAXSLAB1.percentage + taxSlabForYear.TAXSLAB2.fixedTax + (taxSlabForYear?.TAXSLAB3?.fixedTax ? taxSlabForYear?.TAXSLAB3?.fixedTax : 0);
    }
    else if (amount > taxSlabForYear.TAXSLAB2.value && amount < taxSlabForYear.TAXSLAB1.value) {
        tax = (amount - taxSlabForYear.TAXSLAB2.value) * taxSlabForYear.TAXSLAB2.percentage + (taxSlabForYear?.TAXSLAB3?.fixedTax ? taxSlabForYear?.TAXSLAB3?.fixedTax : 0);
    }
    else if (amount > taxSlabForYear?.TAXSLAB3?.value && amount < taxSlabForYear.TAXSLAB2.value) {
        tax = (amount - taxSlabForYear.TAXSLAB3?.value) * taxSlabForYear.TAXSLAB3.percentage;
    }
    else {
        tax = 0;
    }
    // Calculate cess
    tax += tax >= taxSlabForYear?.CESSLIMIT.value ? tax * taxSlabForYear?.CESSLIMIT?.percentage : 0;
    return tax;
}
const taxCal2018 = (income = 0, investment = 0) => {

    // TODO - Might not need this conversion as type would automatically be detected
    let totalInvestment = (parseFloat(investment) > 100000 ? 100000 : parseFloat(investment));
    // TODO - Check for a case when investment is greater than income    
    let pseudoIncome = income - totalInvestment;
    return calculator("2018", pseudoIncome);
}
const taxCal2019 = (taxSlabForYear, age = 0, income = 0, investment = 0) => {

    let totalInvestment = (parseFloat(investment) > 150000 ? 150000 : parseFloat(investment)) + (parseInt(age) >= taxSlabForYear?.AGEFACTOR.age ? parseFloat(taxSlabForYear.AGEFACTOR.value) : 0);
    let pseudoIncome = income - totalInvestment;

    return calculator("2019", pseudoIncome);
}
const taxCal2020 = (taxSlabForYear, age = 0, income = 0, investment = 0) => {

    let totalInvestment = (parseFloat(investment) > 200000 ? 200000 : parseFloat(investment)) + (parseInt(age) >= taxSlabForYear?.AGEFACTOR.age ? taxSlabForYear.AGEFACTOR.value : 0);
    let pseudoIncome = income - totalInvestment;

    return calculator("2020", pseudoIncome);
}

export default calculateTax;