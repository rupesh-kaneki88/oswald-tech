import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, mobile, service, amount } = body;
    
    // Input validation
    if (!name || !email || !service || !amount) {
      return NextResponse.json(
        { success: false, message: 'Name, email, service, and amount are required fields' },
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
      from: `"Payment Form" <${process.env.EMAIL_FROM}>`,
      to: process.env.COMPANY_EMAIL,
      subject: `New Payment Form Submission from ${name}`,
      replyTo: email,
      html: `
        <h1>New Payment Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${mobile ? `<p><strong>Mobile:</strong> ${mobile}</p>` : ''}
        <h2>Service Details</h2>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Amount:</strong> $${amount}</p>
        <p><strong>Payment Status:</strong> Pending</p>
      `,
    };
    
    // Email content for the user (confirmation email)
    const userMailOptions = {
      from: `"Osvan Technologies" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Thank you for your payment submission',
      html: `
        <h1>Thank You for Your Payment Submission</h1>
        <p>Dear ${name},</p>
        <p>Thank you for submitting your payment details. We have received your payment request for the following service:</p>
        <h2>Service Details</h2>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Amount:</strong> $${amount}</p>
        <p><strong>Payment Status:</strong> Pending</p>
        <p>We will process your payment and get back to you as soon as possible.</p>
        <p>Best regards,</p>
        <p>The Net2AI Technologies Team</p>
      `,
    };
    
    // Send emails
    await transporter.sendMail(companyMailOptions);
    await transporter.sendMail(userMailOptions);
    
    return NextResponse.json(
      { success: true, message: 'Your payment request has been submitted successfully!' },
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
