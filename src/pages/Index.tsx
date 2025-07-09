
import React, { useState } from 'react';
import { Upload, Play, Users, Target, Video, Camera, FileVideo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VideoUploadCard from '@/components/VideoUploadCard';
import ProcessingPipeline from '@/components/ProcessingPipeline';
import PlayerMatchingResults from '@/components/PlayerMatchingResults';
import VideoComparison from '@/components/VideoComparison';

const Index = () => {
  const [broadcastVideo, setBroadcastVideo] = useState<File | null>(null);
  const [tacticalVideo, setTacticalVideo] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [matchingResults, setMatchingResults] = useState<any>(null);

  const handleStartProcessing = async () => {
    if (!broadcastVideo || !tacticalVideo) return;
    
    setIsProcessing(true);
    setProcessingStage(0);
    
    // Simulate processing pipeline
    const stages = ['Loading Models', 'Detecting Players', 'Extracting Features', 'Matching Players', 'Generating Output'];
    
    for (let i = 0; i < stages.length; i++) {
      setProcessingStage(i);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Mock results
    setMatchingResults({
      totalPlayers: 22,
      matchedPairs: 18,
      confidenceScore: 0.89,
      processingTime: '2.3s',
      matches: [
        { broadcastId: 'P1', tacticalId: 'T1', confidence: 0.95, position: 'Forward' },
        { broadcastId: 'P2', tacticalId: 'T2', confidence: 0.92, position: 'Midfielder' },
        { broadcastId: 'P3', tacticalId: 'T3', confidence: 0.88, position: 'Defender' },
        { broadcastId: 'P4', tacticalId: 'T4', confidence: 0.91, position: 'Goalkeeper' },
      ]
    });
    
    setIsProcessing(false);
  };

  const canProcess = broadcastVideo && tacticalVideo && !isProcessing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Target className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Cross-Camera Player ReID</h1>
              <p className="text-slate-400 text-sm">Multi-view player re-identification system</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Video Upload Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <VideoUploadCard
            title="Broadcast View"
            description="Wide-angle camera feed"
            icon={<Video className="h-5 w-5" />}
            video={broadcastVideo}
            onVideoChange={setBroadcastVideo}
            acceptedTypes="video/*"
          />
          
          <VideoUploadCard
            title="Tactical View"
            description="Overhead tactical camera"
            icon={<Camera className="h-5 w-5" />}
            video={tacticalVideo}
            onVideoChange={setTacticalVideo}
            acceptedTypes="video/*"
          />
        </div>

        {/* Processing Control */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-green-400" />
              Processing Pipeline
            </CardTitle>
            <CardDescription className="text-slate-400">
              YOLOv11 detection → Feature extraction → Cross-view matching
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                onClick={handleStartProcessing}
                disabled={!canProcess}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Re-Identification
              </Button>
              
              {(broadcastVideo || tacticalVideo) && (
                <div className="text-sm text-slate-400">
                  {broadcastVideo ? '✓ Broadcast video loaded' : '⏳ Broadcast video needed'} · {' '}
                  {tacticalVideo ? '✓ Tactical video loaded' : '⏳ Tactical video needed'}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Processing Pipeline */}
        {isProcessing && (
          <ProcessingPipeline currentStage={processingStage} />
        )}

        {/* Results */}
        {matchingResults && (
          <>
            <PlayerMatchingResults results={matchingResults} />
            <VideoComparison 
              broadcastVideo={broadcastVideo}
              tacticalVideo={tacticalVideo}
              matchingResults={matchingResults}
            />
          </>
        )}

        {/* Info Cards */}
        {!matchingResults && !isProcessing && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">YOLOv11 Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm">
                  Advanced object detection to identify all players in both camera feeds with high accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Feature Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm">
                  Extract jersey colors, spatial positioning, and movement patterns for cross-view matching.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">ID Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm">
                  Consistent player identification across multiple camera angles with confidence scoring.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
