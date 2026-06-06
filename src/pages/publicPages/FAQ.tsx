import PublicPageHero from "@/components/marketing/PublicPageHero";
import FAQAccordion, { type FAQItem } from "@/components/marketing/FAQAccordion";
import PageTransition from "@/components/shared/PageTransition";

const faqItems: FAQItem[] = [
  {
    category: "Account",
    question: "How do I create a WalletIQ account?",
    answer:
      "Click Get Started, complete registration with your email and phone, verify via OTP, and set your wallet PIN to activate your account.",
  },
  {
    category: "Account",
    question: "Can I sign in with Google?",
    answer:
      "Yes. Use Continue with Google on the login page. If your phone number is missing, you'll be prompted to complete setup.",
  },
  {
    category: "Wallet",
    question: "How do I add money to my wallet?",
    answer:
      "Go to Add Money from your dashboard, enter the amount, and complete payment through our secure gateway.",
  },
  {
    category: "Wallet",
    question: "What happens if my wallet is blocked?",
    answer:
      "Blocked wallets cannot send or withdraw funds. Contact support or review restrictions on the Wallet Details page.",
  },
  {
    category: "Transactions",
    question: "How long do transfers take?",
    answer:
      "Wallet-to-wallet transfers are processed instantly once your PIN is verified and balance is sufficient.",
  },
  {
    category: "Loans",
    question: "How do I request a loan?",
    answer:
      "Navigate to Loans in your dashboard, submit amount and duration, and track approval status in Loan History.",
  },
  {
    category: "Security",
    question: "How do I reset my password?",
    answer:
      "Use Forgot Password on the login page. A reset link will be sent to your registered email address.",
  },
  {
    category: "Agents",
    question: "How do agents perform cash-in?",
    answer:
      "Approved agents can process cash-in from the Agent Dashboard after customer verification.",
  },
];

export default function FAQ() {
  return (
    <PageTransition>
      <PublicPageHero
        badge="FAQ"
        title="Frequently asked"
        highlight="questions"
        description="Find quick answers about accounts, wallets, loans, and security."
      />
      <section className="mx-auto w-11/12 max-w-4xl pb-20">
        <FAQAccordion items={faqItems} />
      </section>
    </PageTransition>
  );
}
