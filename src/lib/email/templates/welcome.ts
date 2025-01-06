import { EmailTemplateProps } from '../../types/email';

export const welcomeTemplate = ({ name }: EmailTemplateProps): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Agentity!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
    <h1 style="color: #333333; margin-bottom: 20px;">Welcome to Agentity! 🎉</h1>
    
    <p style="color: #666666; margin-bottom: 20px;">Hi ${name},</p>
    
    <p style="color: #666666; margin-bottom: 20px;">
      Welcome to Agentity! We're excited to have you on board. Here are a few things you can do to get started:
    </p>
    
    <ul style="color: #666666; margin-bottom: 20px;">
      <li style="margin-bottom: 10px;">Complete your profile</li>
      <li style="margin-bottom: 10px;">Explore our features</li>
      <li style="margin-bottom: 10px;">Check out our documentation</li>
      <li style="margin-bottom: 10px;">Join our community</li>
    </ul>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.NEXTAUTH_URL}/dashboard" 
         style="display: inline-block; background-color: #0070f3; color: white; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold;">
        Go to Dashboard
      </a>
    </div>
    
    <p style="color: #666666; margin-bottom: 20px;">
      If you have any questions or need help getting started, our support team is here to help.
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