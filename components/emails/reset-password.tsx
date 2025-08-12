import * as React from 'react';
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
} from '@react-email/components';

interface ForgotPasswordEmailProps {
    username: string;
    resetUrl: string;
    userEmail: string;
}

const ForgotPasswordEmail = ({ username, resetUrl, userEmail }: ForgotPasswordEmailProps) => {
    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Preview>Reset your password - Action required</Preview>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] shadow-sm max-w-[580px] mx-auto p-[40px]">
                        <Section>
                            <Heading className="text-[24px] font-bold text-gray-900 mb-[24px] text-center">
                                Reset Your Password
                            </Heading>

                            <Text className="text-[16px] text-gray-700 mb-[16px] leading-[24px]">
                                Hello {username},
                            </Text>

                            <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                                We received a request to reset the password for your account associated with <strong>{userEmail}</strong>. If you didn&#39;t make this request, you can safely ignore this email.
                            </Text>

                            <Text className="text-[16px] text-gray-700 mb-[32px] leading-[24px]">
                                To reset your password, click the button below:
                            </Text>

                            <Section className="text-center mb-[32px]">
                                <Button
                                    href={resetUrl ? resetUrl : "#"}
                                    className="bg-black text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                                >
                                    Reset Password
                                </Button>
                            </Section>

                            <Text className="text-[14px] text-gray-600 mb-[16px] leading-[20px]">
                                This link will expire in 24 hours for security reasons.
                            </Text>

                            <Text className="text-[16px] text-gray-700 mb-[8px] leading-[24px]">
                                Best regards,
                                <br />
                                The Support Team
                            </Text>
                        </Section>

                        {/* Footer */}
                        <Section className="border-t border-solid border-gray-200 pt-[24px] mt-[40px]">
                            <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                                © {new Date().getFullYear()} Egomsom Digital. All rights reserved.
                            </Text>
                            <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                                <a href="#" className="text-gray-500 underline">Unsubscribe</a> |
                                <a href="#" className="text-gray-500 underline ml-[4px]">Privacy Policy</a>
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default ForgotPasswordEmail;