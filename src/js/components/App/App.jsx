import React, { useCallback, useEffect, useState } from 'react';
import Login from "../Login/Login";
import Select from "../SelectOption/Select";
import Table from "../Dashboard/Dashboard";
import { TextInput, Wrapper } from '../Input/TextInput';
import calculateTax from "../../tax-calculator-helper";
function useSavedCalculationState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
        const savedCalculations = window.localStorage.getItem(key);
        return savedCalculations !== null
            ? JSON.parse(savedCalculations)
            : defaultValue;
    });
    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}
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
    const [hasValidCreds, setHasValidCreds] = useState(false);
    const [savedTaxes, setSavedTaxes] = useSavedCalculationState([], "savedtaxes");
    // TODO - need to cehck if useCallback is better than useEfect here?
    const finalTaxCalculation = useEffect(
        () => {
            setFinalTaxPayble(calculateTax(year, age, income, investment));
        },
        [year, age, income, investment],
    );
    const handleLoginClick = () => {
        setHasValidCreds(true);
    }
    const handleSave = () => {
        const addSavedTaxes = [...savedTaxes];
        addSavedTaxes.push({ "Year": year, "Age": age, "Income": income, "Investment": investment, "Calculated Tax": finalTaxPayble })
        setSavedTaxes(addSavedTaxes)
    }
    return (
        <>
            {!hasValidCreds && <Login handleLoginClick= {handleLoginClick}></Login>}
            {hasValidCreds && (<>
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
                {/* TODO - We can remove the disabled check, would fail for zero tax scenarios */}
                <button disabled={Boolean(finalTaxPayble) === false} onClick={handleSave}>Save this Calculation</button>
            </>
            )}
            {Boolean(savedTaxes.length) && (
                <section>
                    <h1>Saved User records</h1>
                    <Table data={savedTaxes.slice(0, 4)} />
                </section>)}
        </>
    )
}
