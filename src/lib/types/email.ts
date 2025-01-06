export interface EmailOptions {
  email: string;
  name?: string;
  verificationToken?: string;
  resetToken?: string;
}

export interface EmailTemplateProps {
  name: string;
  verificationUrl?: string;
  resetUrl?: string;
} 