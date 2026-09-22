import React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Preview,
  Section,
  Text,
  Link,
  Tailwind,
} from '@react-email/components';

interface CustomerInvitationEmailProps {
  companyName: string;
  inviteUrl: string;
}

export const CustomerInvitationEmail = ({
  companyName,
  inviteUrl,
}: CustomerInvitationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Invitation to VERDECOCO Customer Portal</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans my-auto mx-auto p-4">
          <Container className="bg-white border border-solid border-gray-200 rounded my-10 mx-auto p-8 w-[465px]">
            <Heading className="text-black text-2xl font-normal text-center p-0 my-8 mx-0">
              Welcome to <strong>VERDECOCO</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hello,
            </Text>
            <Text className="text-black text-sm leading-6">
              You have been invited to set up a Customer Portal account for <strong>{companyName}</strong> on VERDECOCO.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Link
                href={inviteUrl}
                className="bg-green-700 rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
              >
                Accept Invitation & Set Password
              </Link>
            </Section>
            <Text className="text-black text-sm leading-6">
              This invitation link is one-time use and will expire in 7 days.
            </Text>
            <Text className="text-black text-sm leading-6">
              If you have any issues, please reply to this email to contact support.
            </Text>
            <Text className="text-gray-500 text-xs leading-4 mt-8">
              VERDECOCO Admin
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
