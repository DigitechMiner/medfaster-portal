'use client';

import React from 'react';
import Image from 'next/image';

// ============ SCORE BOX ============
export interface ScoreBoxProps {
  score: number;
}

export const ScoreBox: React.FC<ScoreBoxProps> = ({ score }) => (
  <div className="bg-white border border-green-400 rounded-md p-1.5 flex-shrink-0">
    <div className="flex items-center gap-1">
      <Image src="/svg/Progress.svg" alt="progress" width={16} height={16} />
      <span className="text-xs font-semibold text-green-800">{score}/100</span>
    </div>
    <div className="text-xs text-green-600">Score</div>
  </div>
);

