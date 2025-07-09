
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, CheckCircle, Circle } from 'lucide-react';

interface ProcessingPipelineProps {
  currentStage: number;
}

const ProcessingPipeline: React.FC<ProcessingPipelineProps> = ({ currentStage }) => {
  const stages = [
    { name: 'Loading Models', description: 'Loading YOLOv11 detection model' },
    { name: 'Detecting Players', description: 'Identifying players in both video feeds' },
    { name: 'Extracting Features', description: 'Computing appearance and spatial features' },
    { name: 'Matching Players', description: 'Cross-view similarity matching' },
    { name: 'Generating Output', description: 'Creating annotated result video' }
  ];

  const progress = ((currentStage + 1) / stages.length) * 100;

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
          Processing Pipeline
        </CardTitle>
        <Progress value={progress} className="w-full" />
        <p className="text-slate-400 text-sm">{Math.round(progress)}% complete</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div key={index} className="flex items-center gap-3">
              {index < currentStage ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : index === currentStage ? (
                <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
              ) : (
                <Circle className="h-5 w-5 text-slate-600" />
              )}
              
              <div className="flex-1">
                <p className={`font-medium ${
                  index <= currentStage ? 'text-white' : 'text-slate-500'
                }`}>
                  {stage.name}
                </p>
                <p className={`text-sm ${
                  index <= currentStage ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {stage.description}
                </p>
              </div>
              
              {index === currentStage && (
                <div className="text-blue-400 text-sm font-medium">Processing...</div>
              )}
              {index < currentStage && (
                <div className="text-green-400 text-sm font-medium">Complete</div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingPipeline;
