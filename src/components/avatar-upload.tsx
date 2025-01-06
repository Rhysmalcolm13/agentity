'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { UploadService } from '@/lib/upload/upload-service';
import { Loader2, Upload, X } from 'lucide-react';

interface AvatarUploadProps {
  currentImageUrl?: string | null;
  onUploadComplete: (url: string) => void;
  className?: string;
  name?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function AvatarUpload({
  currentImageUrl,
  onUploadComplete,
  className = '',
  name = '',
}: AvatarUploadProps): JSX.Element {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview URL when currentImageUrl changes
  useEffect(() => {
    setPreviewUrl(currentImageUrl || null);
  }, [currentImageUrl]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Start upload
      setIsUploading(true);
      const uploadService = UploadService.getInstance();
      const { url } = await uploadService.processAvatar(file);

      // Notify parent component
      onUploadComplete(url);
      toast.success('Avatar uploaded successfully');
    } catch (error) {
      setPreviewUrl(currentImageUrl || null);
      toast.error(error instanceof Error ? error.message : 'Failed to upload avatar');
      console.error('Avatar upload error:', error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onUploadComplete('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        disabled={isUploading}
      />

      {previewUrl ? (
        <div className="relative">
          <Avatar className="h-32 w-32">
            <AvatarImage src={previewUrl} alt="Avatar preview" />
            <AvatarFallback className="text-lg font-medium">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={handleRemoveImage}
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="relative">
          <Avatar className="h-32 w-32">
            <AvatarFallback className="text-lg font-medium">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            size="icon"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
} 