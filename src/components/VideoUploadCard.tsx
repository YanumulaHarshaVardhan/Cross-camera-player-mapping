
import React, { useRef } from 'react';
import { Upload, FileVideo, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VideoUploadCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  video: File | null;
  onVideoChange: (file: File | null) => void;
  acceptedTypes: string;
}

const VideoUploadCard: React.FC<VideoUploadCardProps> = ({
  title,
  description,
  icon,
  video,
  onVideoChange,
  acceptedTypes
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onVideoChange(file);
    }
  };

  const handleRemoveVideo = () => {
    onVideoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <p className="text-slate-400 text-sm">{description}</p>
      </CardHeader>
      <CardContent>
        {!video ? (
          <div
            className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-300 font-medium mb-2">Click to upload video</p>
            <p className="text-slate-500 text-sm">MP4, AVI, MOV files supported</p>
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes}
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg">
              <FileVideo className="h-8 w-8 text-blue-400" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{video.name}</p>
                <p className="text-slate-400 text-sm">{formatFileSize(video.size)}</p>
              </div>
              <Button
                onClick={handleRemoveVideo}
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-red-400"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <video
              src={URL.createObjectURL(video)}
              controls
              className="w-full rounded-lg bg-black"
              style={{ maxHeight: '200px' }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoUploadCard;
