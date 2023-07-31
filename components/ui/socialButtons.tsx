import React, { ReactNode } from 'react';

import { IconType } from 'react-icons';

type Buttons = {
  text: string;
  buttons: {
    buttonClassName: string;
    buttonText: string;
    ButtonElement: ReactNode;
  }[];
  showText: boolean;
};

type IconProps = {
  icon: React.ReactNode;
};

const IconRenderer: React.FC<IconProps> = ({ icon }) => {
  return <>{icon}</>;
};

const SocialButtons: React.FC<Buttons> = ({ text, buttons, showText }) => {
  return (
    <>
      {showText && (
          <div className="w-full my-2 flex items-center justify-center mb-5">
            <div className="flex-1 h-px bg-primary"></div>
            <p className="px-4 font-bold text-gray-600">{text}</p>
            <div className="flex-1 h-px bg-primary"></div>
          </div>

      )}
      <div className="w-full flex justify-center">
        {buttons.map((button, index) => (
          <button
            key={index}
            type="button"
            className={`${button.buttonClassName} w-full mx-2 flex items-center px-6 py-3`}
            style={{ fontSize: '1.1rem' }}
          >
            <div className="flex items-center justify-center w-full">
              <IconRenderer icon={button.ButtonElement} />
              <span className="ml-2">
                {button.buttonText}
              </span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default SocialButtons;
