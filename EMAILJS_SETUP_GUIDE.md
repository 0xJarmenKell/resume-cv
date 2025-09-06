# EmailJS Setup Guide for Portfolio Contact Form

## Overview

Your portfolio now includes a professional contact form powered by EmailJS. This guide will help you set up EmailJS to receive emails from your contact form.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Custom SMTP** (for business emails)
4. Follow the connection wizard
5. **Important**: Copy your **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

```html
Subject: New Contact Form Submission - {{service_type}} From: {{from_name}}
({{from_email}}) Company: {{company}} Phone: {{phone}} Service Type:
{{service_type}} Priority: {{priority}} Budget: {{budget}} Timeline:
{{timeline}} Submission Date: {{submission_date}} Subject: {{subject}} Message:
{{message}} --- Reply directly to: {{from_email}}
```

4. **Template Settings**:

   - **Template Name**: `contact_form_template`
   - **Subject**: `New Contact Form Submission - {{service_type}}`
   - **To Email**: Your email address (where you want to receive messages)
   - **From Name**: `{{from_name}}`
   - **From Email**: Use your verified email address
   - **Reply To**: `{{from_email}}`

5. **Important**: Copy your **Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. **Important**: Copy your **Public Key** (you'll need this later)

## Step 5: Configure Your Website

1. Open the file: `assets/js/contact.js`
2. Find the `EMAILJS_CONFIG` object at the top:

```javascript
const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY", // Replace with your Public Key
  serviceId: "YOUR_SERVICE_ID", // Replace with your Service ID
  templateId: "YOUR_TEMPLATE_ID", // Replace with your Template ID
};
```

3. Replace the placeholder values with your actual EmailJS credentials:
   - `YOUR_EMAILJS_PUBLIC_KEY` → Your Public Key from Step 4
   - `YOUR_SERVICE_ID` → Your Service ID from Step 2
   - `YOUR_TEMPLATE_ID` → Your Template ID from Step 3

## Step 6: Test Your Contact Form

1. Open your website
2. Navigate to the Contact section
3. Fill out the form completely
4. Submit the form
5. Check your email for the test message

## Troubleshooting

### Common Issues:

1. **"EmailJS library not loaded" error**:

   - Check your internet connection
   - Ensure the EmailJS CDN is loading properly

2. **"Failed to send message" error**:

   - Verify your EmailJS credentials are correct
   - Check if your EmailJS service is active
   - Ensure your email template is published

3. **Not receiving emails**:

   - Check your spam/junk folder
   - Verify the "To Email" in your template
   - Ensure your EmailJS service is properly connected

4. **Form validation errors**:
   - Make sure all required fields are filled
   - Check email format is correct

### Testing Configuration:

Open your browser's developer console (F12) and look for these messages:

- `✅ "EmailJS initialized successfully"` - Configuration is correct
- `⚠️ "EmailJS configuration incomplete"` - Check your credentials
- `❌ "EmailJS library not loaded"` - Check internet connection

## Features of Your Contact Form

### Form Fields:

- **Basic Info**: Name, Email, Company, Phone
- **Project Details**: Service Type, Priority, Subject, Message
- **Planning**: Budget Range, Timeline
- **Validation**: Real-time email validation, required field checking
- **User Experience**: Character counter, loading states, success/error messages

### Service Types Available:

- Web Development
- System Administration
- Cybersecurity Consulting
- Bug Bounty & Security Testing
- Penetration Testing
- Technical Support
- General Inquiry
- Other

### Form Features:

- **Responsive Design**: Works on all devices
- **Real-time Validation**: Immediate feedback for users
- **Professional Appearance**: Matches your portfolio design
- **Anti-spam**: Built-in validation and rate limiting
- **Analytics Ready**: Google Analytics event tracking (if implemented)

## Security Considerations

1. **Public Key**: Safe to expose in client-side code
2. **Service/Template IDs**: Safe to expose in client-side code
3. **Private Keys**: Never put these in client-side code
4. **Rate Limiting**: EmailJS has built-in rate limiting
5. **Spam Protection**: Consider adding reCAPTCHA for additional protection

## Upgrading EmailJS Plan

The free plan includes:

- 200 emails/month
- 2 email services
- EmailJS branding

Paid plans offer:

- More emails per month
- Remove EmailJS branding
- Priority support
- Advanced features

## Support

- **EmailJS Documentation**: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **EmailJS Support**: Available through their dashboard
- **This Implementation**: Check the console for detailed error messages

## Backup Contact Method

If EmailJS fails, users can still contact you directly via:

- Email: youssefyousry994@gmail.com
- Phone: +201023783671
- Social media links in your portfolio

---

**Next Steps After Setup:**

1. Test the form thoroughly
2. Monitor your EmailJS usage in the dashboard
3. Consider adding Google Analytics for form tracking
4. Optionally add reCAPTCHA for spam protection
5. Set up email filters/labels for better organization
