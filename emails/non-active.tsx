import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://bookworm.famlam.ca"

interface ReEngagementEmailProps {
  data: {
    fullName?: string
  }
}

export const ReEngagementEmail = ({
  data: { fullName },
}: ReEngagementEmailProps) => {
  const year = new Date().getFullYear()
  const previewText = `We miss you, ${fullName}! Come back and explore what's new.`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Section style={logo}>
              <Img
                src={`${baseUrl}/favicon.ico`}
                alt="HHN"
                width={40}
                height={40}
              />
            </Section>

            <Section style={sectionsBorders}>
              <Row>
                <Column style={sectionBorder} />
                <Column style={sectionCenter} />
                <Column style={sectionBorder} />
              </Row>
            </Section>

            <Section style={content}>
              <Heading>We Miss You, {fullName}!</Heading>

              <Text className="text-base leading-6 text-gray-700">
                We noticed it&apos;s been a while since your last visit.
                We&apos;ve been busy adding new features and content that we
                think you&apos;ll love.
              </Text>

              <Section style={{ height: "30px" }} />

              <Text className="mt-4 text-base leading-6 text-gray-700">
                Here&apos;s what you&apos;ve been missing:
              </Text>

              <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
                <li>New books added to our collection</li>
                <li>Improved reservation system</li>
                <li>Personalized reading recommendations</li>
              </ul>

              <Button style={returnButton} href={`${baseUrl}/dashboard`}>
                Return to Platform
              </Button>

              <Section style={{ height: "30px" }} />

              <Text>
                We hope to see you back soon!
                <br />
                The HHN Team
              </Text>
            </Section>

            <Section style={sectionsBorders}>
              <Row>
                <Column style={sectionBorder} />
                <Column style={sectionCenter} />
                <Column style={sectionBorder} />
              </Row>
            </Section>

            <Section style={footer}>
              <Row>
                <Column
                  align="right"
                  style={{ width: "50%", paddingRight: "8px" }}
                >
                  <Link href={baseUrl}>
                    <Img
                      src={`${baseUrl}/favicon.ico`}
                      alt="Website"
                      width={25}
                      height={25}
                    />
                  </Link>
                </Column>
                <Column
                  align="left"
                  style={{ width: "50%", paddingLeft: "8px" }}
                >
                  <Link href="https://github.com/SlickYeet/bookworm">
                    <Img
                      src={`https://github.com/favicon.ico`}
                      alt="Github"
                      width={25}
                      height={25}
                    />
                  </Link>
                </Column>
              </Row>

              <Text style={footerLinksWrapper}>
                <Link href={`${baseUrl}/about`} style={footerLinks}>
                  About
                </Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Link
                  href="https://lasse.famlam.ca#projects"
                  style={footerLinks}
                >
                  Projects
                </Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Link href="https://docs.famlam.ca" style={footerLinks}>
                  Docs
                </Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Link
                  href={`https://lasse.famlam.ca#contact`}
                  style={footerLinks}
                >
                  Contact
                </Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Link
                  href={`https://lasse.famlam.ca#contact`}
                  style={footerLinks}
                >
                  Support
                </Link>
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  lineHeight: "14px",
                  paddingTop: "10px",
                  paddingBottom: "30px",
                }}
              >
                © {year} HHN™, All Rights Reserved <br />
                You&apos;re receiving this email because you&apos;re a
                registered user.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

ReEngagementEmail.PreviewProps = {
  data: {
    fullName: "SlickYeet",
  },
} as ReEngagementEmailProps

export default ReEngagementEmail

const fontFamily = "Inter,Inter,Arial,sans-serif"

const main = {
  backgroundColor: "#ffffff",
  color: "#0a0a0a",
  fontWeight: 500,
  fontFamily,
}

const container = {
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "500px",
}

const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: "15px 30px",
  marginBottom: "10px",
  backgroundColor: "#f5f5f5",
}

const content = {
  padding: 30,
  marginBottom: 10,
  backgroundColor: "#f5f5f5",
  fontSize: 16,
}

const returnButton = {
  display: "block",
  marginTop: "20px",
  borderRadius: "4px",
  backgroundColor: "#E7C9A5",
  padding: "12px 24px",
  textAlign: "center" as const,
  fontSize: "16px",
  fontWeight: 500,
  color: "#0a0a0a",
  textDecoration: "none",
  cursor: "pointer",
}

const footer = {
  backgroundColor: "#f5f5f5",
  maxWidth: "580px",
  margin: "10px auto",
}

const footerLinksWrapper = {
  margin: "8px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
}

const footerLinks = {
  color: "#0a0a0a",
}

const sectionsBorders = {
  width: "100%",
  display: "flex",
}

const sectionBorder = {
  borderBottom: "1px solid #e6e6e6",
  width: "249px",
}

const sectionCenter = {
  borderBottom: "1px solid #E7C9A5",
  width: "102px",
}
