'use client';

import { IconType } from "react-icons";

interface CategoryInputProps {
    icon: IconType,
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}
const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
    return (
        <div
            onClick={() => onClick(label)}

            className={`rounded-xl
    border-2
    p-4
    flex
    flex-row
    gap-3
    hover:border-purple-500
    transition
    cursor-pointer
    ${selected ? 'border-purple-500' : 'border-transparent'}
    `}>
            <Icon size={30} className="text-4xl" />
            <div className="font-semibold text-lg">
                {label}
            </div>

        </div>);
}

export default CategoryInput;