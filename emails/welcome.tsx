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

interface WelcomeEmailProps {
  data: {
    fullName?: string
    email?: string
  }
}

export const WelcomeEmail = ({
  data: { fullName, email },
}: WelcomeEmailProps) => {
  const year = new Date().getFullYear()
  const previewText = `Welcome to our platform, ${fullName}!`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Section style={logo} data-darkreader-inline-bgcolor="">
              <Img
                src={`${baseUrl}/favicon.ico`}
                alt="HHN"
                width={40}
                height={40}
              />
            </Section>

            <Section style={sectionsBorders} data-darkreader-inline-bgcolor="">
              <Row>
                <Column style={sectionBorder} />
                <Column style={sectionCenter} />
                <Column style={sectionBorder} />
              </Row>
            </Section>

            <Section style={content} data-darkreader-inline-bgcolor="">
              <Heading data-darkreader-inline-color="">
                Welcome to Our Platform, {fullName}!
              </Heading>

              <Text
                className="text-base leading-6 text-gray-700"
                data-darkreader-inline-color=""
              >
                We&apos;re excited to have you on board! Your account has been
                successfully created with {email}.
              </Text>

              <Section style={{ height: "30px" }} />

              <Text
                className="mt-4 text-base leading-6 text-gray-700"
                data-darkreader-inline-color=""
              >
                Here are a few things you can do to get started:
              </Text>

              <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
                <li>Complete your profile</li>
                <li>Browse available books</li>
                <li>Reserve books online</li>
              </ul>

              <Button style={getStartedButton} href={`${baseUrl}/onboarding`}>
                Get Started
              </Button>

              <Section style={{ height: "30px" }} />

              <Text data-darkreader-inline-color="">
                Sincerely,
                <br />
                The HHN Team
              </Text>
            </Section>

            <Section style={sectionsBorders} data-darkreader-inline-bgcolor="">
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
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

WelcomeEmail.PreviewProps = {
  data: {
    fullName: "SlickYeet",
    email: "lasse@famlam.ca",
  },
} as WelcomeEmailProps

export default WelcomeEmail

const fontFamily = "Inter,Inter,Arial,sans-serif"

const main = {
  backgroundColor: "#fffff",
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

const getStartedButton = {
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
