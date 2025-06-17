
import React from 'react';
import { MBTIResultDetails } from '../../types';
import GlassCard from '../GlassCard';
import { THEME_COLORS } from '../../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface MBTIResultsDisplayProps {
  results: MBTIResultDetails;
}

const MBTIResultsDisplay: React.FC<MBTIResultsDisplayProps> = ({ results }) => {
  const theme = THEME_COLORS.mbti;
  
  const chartData = results.breakdown.map(dim => ({
    name: dim.dimension,
    [dim.scores.poleA]: dim.scores.scoreA,
    [dim.scores.poleB]: dim.scores.scoreB,
    preference: dim.preference
  }));

  return (
    <GlassCard className="border-cyan-500/50">
      <h2 className={`text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo}`}>
        Your Personality Type: {results.type}
      </h2>
      <p className="text-lg text-gray-300 mb-6 text-center">{results.description}</p>

      <div className="mb-8">
        <h3 className={`text-xl font-semibold mb-3 ${theme.accentText}`}>Personality Breakdown:</h3>
        {results.breakdown.map((dim, index) => (
          <div key={index} className="mb-4 p-4 bg-white/5 rounded-md">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-gray-200">{dim.dimension} ({dim.scores.poleA} vs {dim.scores.poleB})</span>
              <span className={`font-bold ${theme.accentText}`}>{dim.preference}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo}`}
                style={{ width: `${(dim.scores.scoreA / (dim.scores.scoreA + dim.scores.scoreB)) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{dim.scores.poleA}: {dim.scores.scoreA}</span>
              <span>{dim.scores.poleB}: {dim.scores.scoreB}</span>
            </div>
          </div>
        ))}
      </div>

       <div className="h-80 md:h-96 w-full mt-8">
         <h3 className={`text-xl font-semibold mb-3 ${theme.accentText} text-center`}>Score Visualization</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" domain={[0, 6]} allowDecimals={false} />
            <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: '1px solid #4B5563', borderRadius: '0.5rem' }} 
                itemStyle={{ color: '#E5E7EB' }}
                cursor={{fill: 'rgba(255,255,255,0.1)'}}
            />
            <Bar dataKey={results.breakdown[0].scores.poleA} stackId="a" fill={`url(#color${results.breakdown[0].scores.poleA})`} />
            <Bar dataKey={results.breakdown[0].scores.poleB} stackId="a" fill={`url(#color${results.breakdown[0].scores.poleB})`} />
            <Bar dataKey={results.breakdown[1].scores.poleA} stackId="b" fill={`url(#color${results.breakdown[1].scores.poleA})`} />
            <Bar dataKey={results.breakdown[1].scores.poleB} stackId="b" fill={`url(#color${results.breakdown[1].scores.poleB})`} />
            <Bar dataKey={results.breakdown[2].scores.poleA} stackId="c" fill={`url(#color${results.breakdown[2].scores.poleA})`} />
            <Bar dataKey={results.breakdown[2].scores.poleB} stackId="c" fill={`url(#color${results.breakdown[2].scores.poleB})`} />
            <Bar dataKey={results.breakdown[3].scores.poleA} stackId="d" fill={`url(#color${results.breakdown[3].scores.poleA})`} />
            <Bar dataKey={results.breakdown[3].scores.poleB} stackId="d" fill={`url(#color${results.breakdown[3].scores.poleB})`} />
            <defs>
              <linearGradient id={`color${results.breakdown[0].scores.poleA}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.8}/>
              </linearGradient>
              <linearGradient id={`color${results.breakdown[0].scores.poleB}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#67e8f9" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.6}/>
              </linearGradient>
               {/* Repeat for other poles or make generic */}
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </GlassCard>
  );
};

export default MBTIResultsDisplay;
