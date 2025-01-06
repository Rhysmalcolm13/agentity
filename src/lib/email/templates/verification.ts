import { EmailTemplateProps } from '../../types/email';

export const verificationTemplate = ({ name, verificationUrl }: EmailTemplateProps): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email address</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
    <h1 style="color: #333333; margin-bottom: 20px;">Verify your email address</h1>
    
    <p style="color: #666666; margin-bottom: 20px;">Hi ${name},</p>
    
    <p style="color: #666666; margin-bottom: 20px;">
      Thanks for signing up for Agentity! Please verify your email address by clicking the button below:
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${verificationUrl}" 
         style="display: inline-block; background-color: #0070f3; color: white; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold;">
        Verify Email Address
      </a>
    </div>
    
    <p style="color: #666666; margin-bottom: 20px;">
      If you didn't create an account with us, you can safely ignore this email.
    </p>
    
    <p style="color: #666666; margin-bottom: 20px;">
      If you're having trouble clicking the button, copy and paste this URL into your web browser:
      <br>
      <a href="${verificationUrl}" style="color: #0070f3; word-break: break-all;">
        ${verificationUrl}
      </a>
    </p>
    
    <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;">
    
    <p style="color: #999999; font-size: 12px; text-align: center;">
      This is an automated message, please do not reply to this email.
      <br>
      Agentity &copy; ${new Date().getFullYear()}
    </p>
  </div>
</body>
</html>
`; 