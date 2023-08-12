import React from 'react';
import PhoneInput from 'react-phone-input-2';

interface PhoneInputComponentProps {
    values: {
        phoneNumber: string;
    };
}

const PhoneInputComponent: React.FC<PhoneInputComponentProps> = ({ values }) => {
    return (
        <div
            className={`shadow w-full appearance-none border rounded mt-2 bg-white font-semibold text-deepgray`}
        >
            <PhoneInput
                value={values.phoneNumber}
                country={'tr'}
                // onChange={phone => setPhoneCode(phone)}
                inputStyle={{
                    width: '100%',
                    height: '10%',
                    border: 'none',
                }}
            />
        </div>
    );
};

export default PhoneInputComponent;
