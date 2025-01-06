import { Resend } from 'resend';
import { EmailOptions } from '../types/email';
import { verificationTemplate } from './templates/verification';
import { resetPasswordTemplate } from './templates/reset-password';
import { welcomeTemplate } from './templates/welcome';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
  private static instance: EmailService;
  private readonly fromEmail: string;

  private constructor() {
    this.fromEmail = process.env.EMAIL_FROM || 'noreply@agentity.com';
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendVerificationEmail(options: EmailOptions): Promise<void> {
    const { email, name, verificationToken } = options;
    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${verificationToken}`;
    
    try {
      await resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: 'Verify your email address',
        html: verificationTemplate({
          name: name || 'there',
          verificationUrl,
        }),
      });
    } catch (error) {
      console.error('Failed to send verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }

  async sendPasswordResetEmail(options: EmailOptions): Promise<void> {
    const { email, name, resetToken } = options;
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;
    
    try {
      await resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: 'Reset your password',
        html: resetPasswordTemplate({
          name: name || 'there',
          resetUrl,
        }),
      });
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  async sendWelcomeEmail(options: EmailOptions): Promise<void> {
    const { email, name } = options;
    
    try {
      await resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: 'Welcome to Agentity!',
        html: welcomeTemplate({
          name: name || 'there',
        }),
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      throw new Error('Failed to send welcome email');
    }
  }
} 