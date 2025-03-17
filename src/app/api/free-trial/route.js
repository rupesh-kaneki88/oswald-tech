import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { corsHeaders } from '@/lib/cors';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, mobile, organization, service } = body;
    
    // Input validation
    if (!name || !email || !service ) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and service are required fields' },
        { status: 400, headers: corsHeaders() }
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
      from: `"Free Trial Form" <${process.env.EMAIL_FROM}>`,
      to: process.env.COMPANY_EMAIL,
      subject: `New Free Trial Form Submission from ${name}`,
      replyTo: email,
      html: `
        <h1>New Free Trial Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${mobile ? `<p><strong>Mobile:</strong> ${mobile}</p>` : ''}
        ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ''}
        <h2>Service Details</h2>
        <p><strong>Service:</strong> ${service}</p>
      `,
    };
    
    // Email content for the user (confirmation email)
    const userMailOptions = {
      from: `"Get2AI Technologies" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Thank you for your interest in our services',
      html: `
        <h1>Thank You for Your Interest</h1>
        <p>Dear ${name},</p>
        <p>Thank you for submitting your details. We have received your request of free trial for the following service:</p>
        <h2>Service Details</h2>
        <p><strong>Service:</strong> ${service}</p>
        <p>We will process your request and get back to you as soon as possible.</p>
        <p>Best regards,</p>
        <p>The Get2AI Technologies Team</p>
      `,
    };
    
    // Send emails
    await transporter.sendMail(companyMailOptions);
    await transporter.sendMail(userMailOptions);
    
    return NextResponse.json(
      { success: true, message: 'Your payment request has been submitted successfully!' },
      { status: 200, headers: corsHeaders() }
    );
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again later.' },
      { status: 500, headers: corsHeaders() }
    );
  } 
}

export async function OPTIONS() {
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders()
    });
  }