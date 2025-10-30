import React, { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../service/axios.config";


const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState("");

  const calculateBMI = async (e) => {
    e.preventDefault();

    if (!height || !weight || !gender) {
      toast.error("Please enter valid height, weight and gender.");
      return;
    }

    try {
      const response = await apiClient.post("/calculate-bmi", {
        height,
        weight,
        gender,
      });

      const { bmi, category } = response.data;
      setBmi(bmi);

      if (category === "Underweight")
        toast.warning("You are underweight. Consult a healthcare provider.");
      else if (category === "Normal")
        toast.success("You have normal weight. Keep maintaining a healthy lifestyle.");
      else if (category === "Overweight")
        toast.warning("You are overweight. Consider lifestyle adjustments.");
      else
        toast.error("You are in the obese range. Seek medical advice.");

    } catch (error) {
      toast.error("Server error. Please try again later.");
      console.error(error);
    }
  };

  return (
    <section className="bmi">
      <h1>BMI CALCULATOR</h1>
      <div className="container">
        <div className="wrapper">
          <form onSubmit={calculateBMI}>
            <div>
              <label>Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <button type="submit">Calculate BMI</button>
          </form>
        </div>
        <div className="wrapper">
          <img src="/BMI.jpg" alt="bmiImage" />
          {bmi && <h3>Your BMI: {bmi}</h3>}
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;
