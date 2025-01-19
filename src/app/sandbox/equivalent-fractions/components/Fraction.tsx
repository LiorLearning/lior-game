

function Fraction({ numerator, denominator, className }: { numerator: any, denominator: any, className?: string }) {
    return (
        <div className={`gap-2 flex items-center ${className}`}>
            <div className="flex flex-col justify-center items-center">
                <div className=" text-gray-700 mb-1 min-h-10">{numerator}</div>
                <div className="border-t-2 border-gray-500 w-full mb-1"></div>
                <div className="text-gray-700">{denominator}</div>
            </div>
        </div>
    );
}

Fraction.defaultProps = {
    numerator: 0,
    denominator: 1,
    className: 'text-4xl'
};

export default Fraction;