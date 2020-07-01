import React from "react";

const MoodForm = ({ isMoodCaptured, handleSubmit, handleInputChange }) => {
  if (isMoodCaptured) {
    return <div>Thanks for sharing your mood.</div>;
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} data-testid="form">
      <input
        className="search-input"
        type="text"
        placeholder="how are you feeling today?"
        size="200"
        onChange={handleInputChange}
      />
      <br />
      <button name="go" className="submit-button" type="submit">
        submit
      </button>
    </form>
  );
};

export default MoodForm;
