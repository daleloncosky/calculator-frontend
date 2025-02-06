import axios from "axios";
import { useState } from "react";

const API_URL = "https://calculator2.hypsster.com/calculate";

const handleCalculate = async (firstNumber, secondNumber, operation, setResult, setError) => {
    try {
        // Convert input to numbers to avoid string issues
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(secondNumber);

        if (isNaN(num1) || isNaN(num2)) {
            setError("Please enter valid numbers.");
            setResult(null);
            return;
        }

        console.log("Sending request to API:", API_URL);
        console.log("Payload:", { first_number: num1, second_number: num2, operation });

        const response = await axios.post(API_URL, {
            first_number: num1,
            second_number: num2,
            operation: operation,
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        console.log("Response received:", response.data);

        if (response.data.error) {
            setError(response.data.error);
            setResult(null);
        } else {
            setResult(response.data.result);
        }
    } catch (err) {
        console.error("API request failed:", err);
        setError("Server error. Please try again later.");
        setResult(null);
    }
};

export default handleCalculate;
