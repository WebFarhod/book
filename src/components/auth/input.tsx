import { FC, ChangeEvent, useState, useEffect } from 'react';
import './input.scss'

interface InputProps {
  label: string,
  type: string,
  placeholder: string,
  state: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
  check: boolean,
  setCheck: React.Dispatch<React.SetStateAction<boolean>>,
}

const input: FC<InputProps> = ({ label, type, placeholder, state, setState, check, setCheck }) => {
  const [checks, setChecks] = useState<boolean>(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  useEffect(() => {
    setChecks(check)
  }, [check]);
  return (
    <div className='component-input'>
      <label
        htmlFor={label}
        className={`label ${checks ? 'inputCheck' : ''}`}>
        {checks ? 'Enter your ' + label : 'Your ' + label}
      </label>
      <input
        type={type}
        name={label}
        id={label}
        className='input'
        placeholder={placeholder}
        value={state}
        onChange={(e) => {
          handleChange(e)
          setCheck(false)
        }}
      />
    </div>
  )
}

export default input;
