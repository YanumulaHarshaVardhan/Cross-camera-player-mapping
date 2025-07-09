
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Download } from 'lucide-react';

interface VideoComparisonProps {
  broadcastVideo: File | null;
  tacticalVideo: File | null;
  matchingResults: any;
}

const VideoComparison: React.FC<VideoComparisonProps> = ({
  broadcastVideo,
  tacticalVideo,
  matchingResults
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would sync both videos
  };

  const handleReset = () => {
    setIsPlaying(false);
    // Reset video positions to beginning
  };

  const handleDownload = () => {
    // In a real implementation, this would download the processed video
    console.log('Downloading processed video...');
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">Synchronized Video Comparison</CardTitle>
            <p className="text-slate-400 text-sm">
              Side-by-side view with matched player IDs highlighted
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Video Controls */}
        <div className="flex items-center justify-center gap-4 p-4 bg-slate-700/30 rounded-lg">
          <Button
            onClick={handlePlayPause}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 mr-2" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            {isPlaying ? 'Pause' : 'Play'} Synchronized
          </Button>
          
          <div className="text-slate-400 text-sm">
            Matched players will be highlighted with consistent colors
          </div>
        </div>

        {/* Video Display */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Broadcast View */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <h3 className="text-white font-medium">Broadcast Camera</h3>
            </div>
            
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              {broadcastVideo ? (
                <video
                  src={URL.createObjectURL(broadcastVideo)}
                  className="w-full h-full object-cover"
                  controls={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-slate-500">No video loaded</p>
                </div>
              )}
              
              {/* Simulated player overlays */}
              <div className="absolute inset-0">
                <div className="absolute top-4 left-4 bg-blue-500/80 text-white px-2 py-1 rounded text-xs">
                  P1 (95%)
                </div>
                <div className="absolute top-12 right-8 bg-green-500/80 text-white px-2 py-1 rounded text-xs">
                  P2 (92%)
                </div>
                <div className="absolute bottom-8 left-12 bg-yellow-500/80 text-white px-2 py-1 rounded text-xs">
                  P3 (88%)
                </div>
              </div>
            </div>
          </div>

          {/* Tactical View */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <h3 className="text-white font-medium">Tactical Camera</h3>
            </div>
            
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              {tacticalVideo ? (
                <video
                  src={URL.createObjectURL(tacticalVideo)}
                  className="w-full h-full object-cover"
                  controls={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-slate-500">No video loaded</p>
                </div>
              )}
              
              {/* Simulated player overlays with matching IDs */}
              <div className="absolute inset-0">
                <div className="absolute top-8 left-6 bg-blue-500/80 text-white px-2 py-1 rounded text-xs">
                  T1 → P1
                </div>
                <div className="absolute top-16 right-10 bg-green-500/80 text-white px-2 py-1 rounded text-xs">
                  T2 → P2
                </div>
                <div className="absolute bottom-12 left-8 bg-yellow-500/80 text-white px-2 py-1 rounded text-xs">
                  T3 → P3
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="p-4 bg-slate-700/20 rounded-lg">
          <h4 className="text-white font-medium mb-3">Player ID Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-slate-300">Forwards</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-slate-300">Midfielders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-slate-300">Defenders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-slate-300">Goalkeepers</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoComparison;
