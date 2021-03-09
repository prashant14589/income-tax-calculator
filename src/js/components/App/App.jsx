import React, { useCallback, useEffect, useState } from 'react';
import Select from "../SelectOption/Select";
import { TextInput, Wrapper } from '../Input/TextInput';
import calculateTax from "../../tax-calculator-helper";

export const App = () => {
    const yearOptions = [
        { value: "", label: "Please enter year" },
        { value: "2018", label: "2018" },
        { value: "2019", label: "2019" },
        { value: "2020", label: "2020" },
    ];
    const [year, setYear] = useState(0);
    const [age, setAge] = useState(0);
    const [income, setIncome] = useState(0);
    const [investment, setInvestment] = useState(0);
    const [finalTaxPayble, setFinalTaxPayble] = useState(0);
    const [displayTaxCalculator, setDisplayTaxCalculator] = useState(true);
    // TODO - need to cehck if useCallback is better than useEfect here?
    const finalTaxCalculation = useEffect(
        () => {
            setFinalTaxPayble(calculateTax(year, age, income, investment));
        },
        [year, age, income, investment],
    );
    return (
        <>
            {/* <Login ></Login> */}
            <>
                <section>
                    <h1>Tax Calculator</h1>
                    <label htmlFor="year">Year:
    <Select
                            options={yearOptions}
                            value={year}
                            handleChange={(e) => setYear(e.target.value)}
                        />
                    </label>

                    <TextInput id="age" value={age} onChange={(e) => setAge(e.target.value)}>Age:</TextInput>

                    <TextInput id="income" value={income} onChange={(e) => setIncome(e.target.value)}>Income:</TextInput>

                    <TextInput id="investment" value={investment} onChange={(e) => setInvestment(e.target.value)}>Investment:</TextInput>

                </section>
                <TextInput id="tax" value={finalTaxPayble} readOnly={true}>Final Tax calculated:</TextInput>
            </>

        </>
    )
}
