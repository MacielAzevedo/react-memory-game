interface Props {
    label: string;
    value: string;
}

export const InfoItem = ({ label, value }: Props) => {
    return (
        <div className="my-5">
            <div className="text-gray-400">{label}</div>
            <div className="text-3xl font-bold text-gray-700">{value}</div>
        </div>
    )
}