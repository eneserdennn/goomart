// @ts-check

import { Switch } from '@headlessui/react'

interface ToggleProps {
    isEnabled: boolean;
    onToggle: (checked: boolean) => void;
}

export default function Toggle({ isEnabled, onToggle }: ToggleProps) {
    return (
        <div className="flex items-center">
            <Switch
                checked={isEnabled}
                onChange={onToggle}
                className={`${isEnabled ? 'bg-[#34C759]' : 'bg-primary'}
          relative inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span
                    aria-hidden="true"
                    className={`${isEnabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-[27px] w-[27px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
    )
}
