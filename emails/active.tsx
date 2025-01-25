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

interface ActiveEmailProps {
  data: {
    fullName?: string
    daysActive?: number
    streak?: number
    nextMilestone?: number
  }
}

export const ActiveEmail = ({
  data: { fullName, daysActive = 30, streak = 7, nextMilestone = 50 },
}: ActiveEmailProps) => {
  const year = new Date().getFullYear()
  const previewText = `Great job staying active, ${fullName}!`

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
              <Heading>Amazing Work, {fullName}! 🎉</Heading>

              <Text className="text-base leading-6 text-gray-700">
                You&apos;ve been crushing it! You&apos;ve maintained an active
                presence for {daysActive} days, with an impressive {streak}-day
                streak. Keep up the fantastic work!
              </Text>

              <Section style={{ height: "30px" }} />

              <Text className="mt-4 text-base leading-6 text-gray-700">
                Here&apos;s what you&apos;ve achieved:
              </Text>

              <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
                <li>{daysActive} days of consistent activity</li>
                <li>{streak} day streak - you&apos;re on fire! 🔥</li>
                <li>
                  Only {nextMilestone - daysActive} days until your next
                  milestone!
                </li>
              </ul>

              <Button style={getStartedButton} href={`${baseUrl}/dashboard`}>
                View Your Progress
              </Button>

              <Section style={{ height: "30px" }} />

              <Text>
                Stay motivated!
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
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

ActiveEmail.PreviewProps = {
  data: {
    fullName: "SlickYeet",
    daysActive: 30,
    streak: 7,
    nextMilestone: 50,
  },
} as ActiveEmailProps

export default ActiveEmail

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
