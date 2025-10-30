import React from "react";


const WorkoutSessions = () => {
  return (
    <section className="workout_session">
      <div className="wrapper">
        <h1>TOP WORKOUT SESSIONS</h1>
        <p>
          Build strength, improve endurance, and stay motivated with our
          high-energy workout sessions. Each class is designed to challenge
          every muscle group and help you push your limits safely and
          effectively.
        </p>
        <img src="/img5.jpg" alt="workout" />
      </div>
      <div className="wrapper">
        <h1>FEATURED BOOTCAMPS</h1>
        <p>
          Take your fitness to the next level with our special bootcamp
          programs. These sessions combine strength training, cardio, and
          flexibility workouts to deliver faster and more visible results.
        </p>
        <div className="bootcamps">
          <div>
            <h4>Full Body Transformation</h4>
            <p>
              A power-packed routine focusing on overall fitness. Perfect for
              anyone who wants to tone muscles, burn calories, and boost
              stamina.
            </p>
          </div>
          <div>
            <h4>Strength and Conditioning</h4>
            <p>
              Improve your muscle strength, balance, and endurance with a mix of
              weight training and functional exercises.
            </p>
          </div>
          <div>
            <h4>Cardio Burn Bootcamp</h4>
            <p>
              High-intensity workouts designed to maximize calorie burn and
              improve heart health — great for quick, effective fat loss.
            </p>
          </div>
          <div>
            <h4>Core and Mobility Training</h4>
            <p>
              Focused on building a stronger core, better posture, and improved
              flexibility to enhance your performance in all types of workouts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutSessions;
