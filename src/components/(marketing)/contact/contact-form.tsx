'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

const categories = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'sales', label: 'Sales' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'press', label: 'Press & Media' },
] as const;

interface FormData {
  category: typeof categories[number]['value'];
  name: string;
  email: string;
  message: string;
  attachmentUrl?: string;
}

export function ContactForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    category: 'general',
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: In production, upload file to cloud storage and get URL
      const attachmentUrl = selectedFile 
        ? `https://example.com/files/${selectedFile.name}` // Placeholder URL
        : undefined;

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          attachmentUrl,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }

      router.push('/success/contact');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
      console.error('Contact form error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Invalid file type. Please upload PDF, DOC, DOCX, PNG, or JPG');
        return;
      }
      setSelectedFile(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="How can we help you?"
            className="min-h-[150px]"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <Label htmlFor="file">Attachments</Label>
          <div className="mt-1">
            <label
              htmlFor="file"
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm hover:bg-muted"
            >
              <Upload className="h-4 w-4" />
              {selectedFile ? selectedFile.name : 'Upload file'}
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                disabled={isLoading}
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              />
            </label>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Max file size: 10MB. Supported formats: PDF, DOC, DOCX, PNG, JPG
          </p>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Sending Message...' : 'Send Message'}
      </Button>
    </form>
  );
} 