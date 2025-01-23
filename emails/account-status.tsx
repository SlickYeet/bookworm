import {
  Body,
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

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://demo.famlam.ca"

interface PasswordResetEmailProps {
  data: {
    name?: string
    message?: string
    status?: "APPROVED" | "REJECTED"
  }
}

export const PasswordResetEmail = ({
  data: { name, message, status },
}: PasswordResetEmailProps) => {
  const year = new Date().getFullYear()

  return (
    <Html>
      <Head />
      <Preview>Account Status Change</Preview>
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
              Account Status Change
            </Heading>

            <Text data-darkreader-inline-color="">
              Hi, {name}. You&apos;re account status has been updated.
              <br />
              Please review the message below.
            </Text>

            <Section style={{ height: "30px" }} />

            <Section>
              <Text style={messageText}>You are been {status} by an admin</Text>
            </Section>

            <Section style={{ height: "30px" }} />

            <Text data-darkreader-inline-color="">
              {status === "APPROVED"
                ? "You can now browse our whole catalog of books and borrow them at any time. Happy reading!"
                : "Please read the message below for more information."}
            </Text>

            {status === "REJECTED" && <Text>{message}</Text>}

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
              <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
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
              <Link href="https://lasse.famlam.ca#projects" style={footerLinks}>
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
    </Html>
  )
}

PasswordResetEmail.PreviewProps = {
  data: {
    name: "SlickYeet",
    message:
      "This is an optional message the admin can leave for the user with instructions or a reason for the status change.",
    status: "REJECTED",
  },
} as PasswordResetEmailProps

export default PasswordResetEmail

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
  textAlign: "center" as const,
  backgroundColor: "#f5f5f5",
  fontSize: 16,
}

const messageText = {
  fontWeight: "bold",
  fontSize: "36px",
  lineHeight: "40px",
  margin: "10px 0",
  textAlign: "center" as const,
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
  borderBottom: "1px solid #2463eb",
  width: "102px",
}
