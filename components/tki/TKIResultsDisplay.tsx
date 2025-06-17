
import React from 'react';
import { TKIResultDetails, TKIStyle } from '../../types';
import GlassCard from '../GlassCard';
import { THEME_COLORS, TKI_DESCRIPTIONS } from '../../constants';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TKIResultsDisplayProps {
  results: TKIResultDetails;
}

const TKIResultsDisplay: React.FC<TKIResultsDisplayProps> = ({ results }) => {
  const theme = THEME_COLORS.tki;
  const COLORS = {
    [TKIStyle.Competing]: '#ec4899', // Pink
    [TKIStyle.Collaborating]: '#8b5cf6', // Purple
    [TKIStyle.Compromising]: '#3b82f6', // Blue
    [TKIStyle.Avoiding]: '#6b7280', // Gray
    [TKIStyle.Accommodating]: '#10b981', // Green
  };

  const pieData = results.scores.map(item => ({
    name: item.style,
    value: item.score,
  }));

  return (
    <GlassCard className="border-pink-500/50">
      <h2 className={`text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo}`}>
        Your Dominant Conflict Style: {results.dominantStyle}
      </h2>
      <p className="text-lg text-gray-300 mb-6 text-center">{results.description}</p>

      <div className="mb-8">
        <h3 className={`text-xl font-semibold mb-3 ${theme.accentText}`}>Score Breakdown:</h3>
        {results.scores.sort((a,b) => b.score - a.score).map((item) => (
          <div key={item.style} className="mb-3 p-3 bg-white/5 rounded-md">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-200">{item.style}</span>
              <span className={`font-bold px-2 py-0.5 rounded text-sm`} style={{backgroundColor: `${COLORS[item.style]}33`, color: COLORS[item.style]}}>{item.score}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{TKI_DESCRIPTIONS[item.style]}</p>
          </div>
        ))}
      </div>

      <div className="h-80 md:h-96 w-full mt-8">
        <h3 className={`text-xl font-semibold mb-3 ${theme.accentText} text-center`}>Style Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={window.innerWidth < 768 ? 80 : 120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as TKIStyle]} />
              ))}
            </Pie>
            <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: '1px solid #4B5563', borderRadius: '0.5rem' }} 
                itemStyle={{ color: '#E5E7EB' }}
            />
            <Legend wrapperStyle={{ color: '#E5E7EB' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

export default TKIResultsDisplay;
