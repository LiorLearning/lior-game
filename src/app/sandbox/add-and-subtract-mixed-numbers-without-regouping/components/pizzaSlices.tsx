"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PizzaSlicesProps {
  numerator: number;
  denominator: number;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

const PizzaSlices: React.FC<PizzaSlicesProps> = ({ 
  numerator, 
  denominator, 
  color,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const generateSlices = () => {
    const slices = []
    const angleStep = 360 / denominator
    for (let i = 0; i < denominator; i++) {
      const startAngle = i * angleStep
      const endAngle = (i + 1) * angleStep
      const largeArcFlag = angleStep > 180 ? 1 : 0
      const x1 = 50 + 45 * Math.cos((startAngle * Math.PI) / 180)
      const y1 = 50 + 45 * Math.sin((startAngle * Math.PI) / 180)
      const x2 = 50 + 45 * Math.cos((endAngle * Math.PI) / 180)
      const y2 = 50 + 45 * Math.sin((endAngle * Math.PI) / 180)

      slices.push(
        <path
          key={i}
          d={`M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
          fill={i < numerator ? "#FFA500" : "none"}
          stroke="#8B4513"
          strokeWidth="0.5"
        />
      )
    }
    return slices
  }

  return (
    <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-4">
          <svg viewBox="0 0 100 100" className={'w-32 h-32'}>
            <circle cx="50" cy="50" r="45" fill="#F5DEB3" stroke="#8B4513" strokeWidth="0.5" />
            {generateSlices()}
          </svg>
        </div>
    </div>
  )
}

export default PizzaSlices

