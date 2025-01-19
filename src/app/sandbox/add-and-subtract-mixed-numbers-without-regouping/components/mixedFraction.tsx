import React from 'react';
import {MixedFractionProps} from '../utils/types';

function MixedFraction({ whole, numerator, denominator, className }: MixedFractionProps & { className?: string }) {
    return (
        <div className={`gap-2 flex items-center ${className}`}>
            {whole !== 0 && <span className="text-gray-800">{whole}</span>}
            <div className="flex flex-col justify-center items-center">
                <div className=" text-gray-700 mb-1">{numerator}</div>
                <div className="border-t-2 border-gray-500 w-full mb-1"></div>
                <div className="text-gray-700">{denominator}</div>
            </div>
        </div>
    );
}

MixedFraction.defaultProps = {
    whole: 0,
    numerator: 0,
    denominator: 1,
    className: 'text-4xl'
};

export default MixedFraction;