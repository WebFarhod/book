import { ChangeEvent, FC } from 'react';
import './input.scss'

interface InputProps {
    label: string;
    type: string;
    placeholder: string;
    state: string | number;
    setState: React.Dispatch<React.SetStateAction<string>>,
    // setCheck: React.Dispatch<React.SetStateAction<boolean>>,
}

const Input: FC<InputProps> = ({ label, type, placeholder, state, setState }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    };
    return (
        <div className='component-input'>
            <label
                htmlFor={label}
                className='label'>
                {label}
            </label>
            <input
                type={type}
                name={label}
                id={label}
                className='input'
                placeholder={placeholder}
                value={state}
                onChange={
                    (e) => handleChange(e)
                }
            />
        </div>
    )
}

export default Input;