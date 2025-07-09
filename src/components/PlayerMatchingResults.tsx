
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Clock, TrendingUp } from 'lucide-react';

interface PlayerMatch {
  broadcastId: string;
  tacticalId: string;
  confidence: number;
  position: string;
}

interface MatchingResults {
  totalPlayers: number;
  matchedPairs: number;
  confidenceScore: number;
  processingTime: string;
  matches: PlayerMatch[];
}

interface PlayerMatchingResultsProps {
  results: MatchingResults;
}

const PlayerMatchingResults: React.FC<PlayerMatchingResultsProps> = ({ results }) => {
  const matchSuccessRate = (results.matchedPairs / results.totalPlayers) * 100;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{results.totalPlayers}</p>
                <p className="text-slate-400 text-sm">Total Players</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{results.matchedPairs}</p>
                <p className="text-slate-400 text-sm">Matched Pairs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">{Math.round(matchSuccessRate)}%</p>
                <p className="text-slate-400 text-sm">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">{results.processingTime}</p>
                <p className="text-slate-400 text-sm">Processing Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Matches */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Player ID Correspondences</CardTitle>
          <p className="text-slate-400 text-sm">
            Cross-camera player matching results with confidence scores
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.matches.map((match, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-400 text-sm font-bold">{match.broadcastId}</span>
                    </div>
                    <span className="text-slate-400">↔</span>
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-green-400 text-sm font-bold">{match.tacticalId}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-white font-medium">
                      {match.broadcastId} ↔ {match.tacticalId}
                    </p>
                    <p className="text-slate-400 text-sm">{match.position}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge 
                    variant={match.confidence >= 0.9 ? "default" : "secondary"}
                    className={
                      match.confidence >= 0.9 
                        ? "bg-green-500/20 text-green-400 border-green-500/30" 
                        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                    }
                  >
                    {Math.round(match.confidence * 100)}% confidence
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerMatchingResults;
