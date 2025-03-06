// pages/api/contact.js or app/api/contact/route.js (depending on your Next.js version)

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, organization, message } = body;
    
    // Input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }
    
    // Configure nodemailer transport (update with your email service details)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    // Email content for the company
    const companyMailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_FROM}>`,
      to: process.env.COMPANY_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };
    
    // Email content for the user (confirmation email)
    const userMailOptions = {
      from: `"Osvan Technologies" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Thank you for contacting Osvan Technologies',
      html: `
        <h1>Thank You for Reaching Out</h1>
        <p>Dear ${name},</p>
        <p>Thank you for contacting Osvan Technologies. We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p>Best regards,</p>
        <p>The Osvan Technologies Team</p>
      `,
    };
    
    // Send emails
    await transporter.sendMail(companyMailOptions);
    await transporter.sendMail(userMailOptions);
    
    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}