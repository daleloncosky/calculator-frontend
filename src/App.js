const API_URL = "https://calculator2.hypsster.com/calculate";

const handleCalculate = async () => {
    try {
        const response = await axios.post(API_URL, {
            first_number: firstNumber,
            second_number: secondNumber,
            operation: operation,
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.data.error) {
            setError(response.data.error);
            setResult(null);
        } else {
            setResult(response.data.result);
        }
    } catch (err) {
        setError("Server error. Please try again later.");
        setResult(null);
    }
};