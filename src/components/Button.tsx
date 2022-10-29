import React from "react";

interface Props {
    label: string;
    icon?: any;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({ label, icon, onClick }: Props) => {
    return (
        <div className="w-52 h-12 flex bg-[#1550FF] rounded-lg cursor-pointer opacity-100 ease-in duration-300 hover:opacity-80"
            onClick={onClick}
        >
            {icon &&
                <div className="flex justify-center items-center border-r px-4">
                    <img src={icon} height={20} alt="" />
                </div>
            }
            <div className="h-auto text-white flex justify-center items-center flex-1 px-5 font-bold">
                {label}
            </div>
        </div>
    )
}