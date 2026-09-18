import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from '@react-email/components';

interface QuoteNotificationEmailProps {
  id: string;
  fullName: string;
  companyName: string;
  businessEmail: string;
  phone?: string | null;
  countryRegion: string;
  buyerType: string;
  product: string;
  quantityRequirement: string;
  preferredPackaging?: string | null;
  additionalRequirements?: string | null;
  message: string;
  createdAt: Date | string;
}

export const QuoteNotificationEmail = ({
  id,
  fullName,
  companyName,
  businessEmail,
  phone,
  countryRegion,
  buyerType,
  product,
  quantityRequirement,
  preferredPackaging,
  additionalRequirements,
  message,
  createdAt,
}: QuoteNotificationEmailProps) => {
  const dateString =
    typeof createdAt === 'string'
      ? new Date(createdAt).toLocaleString()
      : createdAt.toLocaleString();

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>VERDECOCO</Heading>
          <Text style={h2}>New B2B Enquiry Received</Text>
          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Quote Request ID:</Text>
            <Text style={value}>{id}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Date & Time:</Text>
            <Text style={value}>{dateString}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={h3}>Customer Details</Text>
          <Section style={section}>
            <Text style={label}>Name:</Text>
            <Text style={value}>{fullName}</Text>

            <Text style={label}>Company:</Text>
            <Text style={value}>{companyName}</Text>

            <Text style={label}>Email:</Text>
            <Text style={value}>{businessEmail}</Text>

            <Text style={label}>Phone/WhatsApp:</Text>
            <Text style={value}>{phone || 'N/A'}</Text>

            <Text style={label}>Country/Region:</Text>
            <Text style={value}>{countryRegion}</Text>

            <Text style={label}>Buyer Type:</Text>
            <Text style={value}>{buyerType}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={h3}>Requirement Details</Text>
          <Section style={section}>
            <Text style={label}>Product:</Text>
            <Text style={value}>{product}</Text>

            <Text style={label}>Quantity:</Text>
            <Text style={value}>{quantityRequirement}</Text>

            <Text style={label}>Preferred Packaging:</Text>
            <Text style={value}>{preferredPackaging || 'N/A'}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={h3}>Message</Text>
          <Text style={text}>{message}</Text>

          {additionalRequirements && (
            <>
              <Text style={h3}>Additional Requirements</Text>
              <Text style={text}>{additionalRequirements}</Text>
            </>
          )}

          <Hr style={hr} />
          
          <Text style={footer}>
            This is an automated notification from the VERDECOCO Enquiry System.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// --- Styles ---

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #e6ebf1',
  borderRadius: '5px',
  maxWidth: '600px',
};

const h1 = {
  color: '#0d5d36', // VERDECOCO Primary Green
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  padding: '0 48px',
  marginTop: '24px',
  marginBottom: '8px',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: '400',
  padding: '0 48px',
  marginTop: '0',
  marginBottom: '24px',
  textAlign: 'center' as const,
};

const h3 = {
  color: '#1a1a1a',
  fontSize: '16px',
  fontWeight: '600',
  padding: '0 48px',
  marginTop: '24px',
  marginBottom: '12px',
};

const section = {
  padding: '0 48px',
};

const label = {
  color: '#666666',
  fontSize: '14px',
  margin: '8px 0 4px',
  fontWeight: '500',
};

const value = {
  color: '#1a1a1a',
  fontSize: '15px',
  margin: '0 0 16px',
};

const text = {
  color: '#333',
  fontSize: '15px',
  lineHeight: '1.5',
  padding: '0 48px',
  margin: '0 0 16px',
  whiteSpace: 'pre-wrap' as const,
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 48px',
  marginTop: '32px',
  textAlign: 'center' as const,
};
