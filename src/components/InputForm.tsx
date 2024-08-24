import React from 'react';

interface InputFormProps {
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ inputValue, onInputChange, onButtonClick }) => (
  <div className="mb-3">
    <input
      type="text"
      className="form-control"
      value={inputValue}
      onChange={onInputChange}
      placeholder="Enter game name"
    />
    <button className="btn btn-primary mt-2" onClick={onButtonClick}>
      Send Request
    </button>
  </div>
);

export default InputForm;