import React from 'react';

interface InputFormProps {
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
  loading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ inputValue, onInputChange, onButtonClick, loading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onButtonClick();
    }
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Digite o nome do jogo"
      />
      <div className="d-flex justify-content-center align-items-center mt-2">
        <button className="btn btn-primary mt-2" onClick={onButtonClick} disabled={loading}>
          Pesquisar
        </button>
        {loading && (
          <div className="spinner-border text-primary ms-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputForm;