import { render } from "@react-email/components"

import AccountStatusEmail from "../../emails/account-status"
import ActiveEmail from "../../emails/active"
import ReEngagementEmail from "../../emails/non-active"
import PasswordResetEmail from "../../emails/reset-password"
import VerificationEmail from "../../emails/verify-email"
import WelcomeEmail from "../../emails/welcome"

export type EmailTemplates =
  | "account-status"
  | "active"
  | "non-active"
  | "verify-email-request"
  | "password-reset-request"
  | "welcome"

const emails: Record<EmailTemplates, React.ComponentType<{ data: object }>> = {
  "account-status": AccountStatusEmail,
  active: ActiveEmail,
  "non-active": ReEngagementEmail,
  "verify-email-request": VerificationEmail,
  "password-reset-request": PasswordResetEmail,
  welcome: WelcomeEmail,
}

export async function emailRenderer({
  template,
  data,
}: {
  template: EmailTemplates
  data: object
}) {
  const EmailComponents = emails[template]
  return render(<EmailComponents data={data} />)
}
