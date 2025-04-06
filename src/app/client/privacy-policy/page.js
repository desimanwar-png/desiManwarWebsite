import Link from 'next/link'
import React from 'react'

function PrivacyPolicyPage() {
  return (
    <div className="px-4 lg:px-20">
      <div className="min-h-screen px-6 py-10 md:px-16 lg:px-32 bg-primary-base text-secondary-dark dark:bg-secondary-dark dark:text-gray-100">
        <h1 className="text-4xl font-bold text-secondary-base dark:text-white mb-6">
          PRIVACY POLICY
        </h1>

        <p className="mb-4 text-justify">
          Desi Manwar Private Limited (the “Company”) is committed to
          maintaining robust privacy protections for its users. Our Privacy
          Policy (“Privacy Policy”) is designed to help you understand how we
          collect, use, and safeguard the information you provide to us and to
          assist you in making informed decisions when using our Service.
        </p>

        <p className="mb-4">
          For purposes of this Agreement -
          <br />
        </p>
        <ul className="list-disc pl-6">
          <li>
            <strong>Site</strong> refers to the Company’s website, which can be
            accessed at{' '}
            <span className="text-secondary-base dark:text-accent-base">
              URL, coming soon
            </span>
            .
          </li>
          <li>
            <strong>Service</strong> refers to the Company’s services accessed
            via the Site, in which users can explore and engage in export trade
            for various products such as sugar, rice, spices, and other goods.
          </li>
          <li>
            The terms <strong>we, us </strong> and <strong>our</strong> refer to
            the Company.
          </li>
          <li>
            <strong>You</strong> refers to you, as a user of our Site or our
            Service.
          </li>
        </ul>

        <p className="mb-6 text-justify">
          By accessing our Site or our Service, you accept our Privacy Policy
          and{' '}
          <span className="text-secondary-base dark:text-accent-base underline">
            <Link href={'/client/terms-and-conditions'}>Terms of Use</Link>
          </span>{' '}
          and you consent to our collection, storage, use, and disclosure of
          your Personal Information as described in this Privacy Policy.
        </p>

        {/* Section I */}
        <h2 className="text-2xl font-semibold text-secondary-dark dark:text-accent-base mt-10 mb-4">
          I. INFORMATION WE COLLECT
        </h2>
        <p className="mb-4 text-justify">
          We collect Non-Personal Information and Personal Information.
          <strong>Non-Personal Information</strong> includes details that cannot
          personally identify you, such as browser type, referring/exit pages,
          IP address, time and date of access, and website interactions.
          <strong>Personal Information</strong> includes details such as your
          name, email address, phone number, company name, shipping address, and
          billing details, which you provide when registering on our Site or
          using our Service.
        </p>

        <h3 className="text-xl text-secondary-base font-medium mt-6 mb-2">
          1. Information collected via Technology
        </h3>
        <p className="text-justify">
          We use cookies and similar technologies to enhance your experience.
          This may include tracking -
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Website traffic patterns</li>
          <li>User preferences</li>
          <li>Interaction history</li>
        </ul>
        <p className="text-justify">
          Persistent cookies remain on your device after you close your session,
          while session cookies expire upon closing your browser.
        </p>

        <h3 className="text-xl text-secondary-base font-medium mt-6 mb-2">
          2. Information you provide us by registering for an account
        </h3>
        <p className="mb-4">
          To use certain features, you may be required to create an account,
          providing personal information such as name, email, contact number,
          and company details.
        </p>

        <h3 className="text-xl text-secondary-base font-medium mt-6 mb-2">
          3. Children’s Privacy
        </h3>
        <p className="mb-6 text-justify">
          Our Site and Service are not directed at children under 13. We do not
          knowingly collect personal information from children under 13. If you
          believe we have done so, please contact us at{' '}
          <span className="text-secondary-base dark:text-accent-base">
            desimanwar@gmail.com
          </span>
          .
        </p>

        {/* Section II */}
        <h2 className="text-2xl text-secondary-dark dark:text-accent-base font-semibold mt-10 mb-4">
          II. HOW WE USE AND SHARE INFORMATION
        </h2>
        <p className="mb-4">
          <strong>Personal Information - </strong>
          <br />
          We do not sell, trade, rent, or otherwise share your Personal
          Information with third parties without your consent, except as
          required for -
        </p>
        <ul className="list-disc list-inside mb-4 ml-4">
          <li>
            Providing our services (e.g., order processing, logistics, payment
            processing)
          </li>
          <li>Customer support and account management</li>
          <li>Compliance with legal obligations</li>
        </ul>
        <p className="mb-4">
          We may share Personal Information with third-party service providers
          who assist us in operating our Site and business, provided they use
          the data only for our specified purposes.
        </p>

        <p className="mb-6 text-justify">
          <strong>Non-Personal Information - </strong>
          We use Non-Personal Information to improve our Service, analyze
          trends, and optimize user experience. This information may be shared
          with partners and advertisers. In case of a business transfer (merger,
          acquisition, asset sale), your Personal Information may be transferred
          to the new owner.
        </p>

        {/* Section III */}
        <h2 className="text-2xl text-secondary-dark dark:text-accent-base font-semibold mt-10 mb-4">
          III. HOW WE PROTECT INFORMATION
        </h2>
        <p className="mb-6 text-justify">
          We implement security measures such as encryption, firewalls, and
          secure socket layer technology (SSL) to safeguard your information.
          However, no method is 100% secure. By using our Service, you
          acknowledge these risks.
        </p>

        {/* Section IV */}
        <h2 className="text-2xl text-secondary-dark dark:text-accent-base font-semibold mt-10 mb-4">
          IV. YOUR RIGHTS REGARDING THE USE OF YOUR PERSONAL INFORMATION
        </h2>
        <p className="mb-6 text-justify">
          You can opt out of marketing communications by following the
          unsubscribe link in emails or adjusting preferences in your account
          settings. However, we may still send important service-related
          communications.
        </p>

        {/* Section V */}
        <h2 className="text-2xl text-secondary-dark dark:text-accent-base font-semibold mt-10 mb-4">
          V. LINKS TO OTHER WEBSITES
        </h2>
        <p className="mb-6 text-justify">
          Our Site may contain links to third-party websites. We are not
          responsible for their privacy practices, and we encourage users to
          read their privacy policies before using those sites.
        </p>

        {/* Section VI */}
        <h2 className="text-2xl text-secondary-dark dark:text-accent-base font-semibold mt-10 mb-4">
          VI. CHANGES TO OUR PRIVACY POLICY
        </h2>
        <p className="mb-6 text-justify">
          We reserve the right to modify this Privacy Policy. Significant
          changes will be communicated via email or a prominent notice on our
          Site 30 days before taking effect. Non-material changes take effect
          immediately. Please review this policy periodically.
        </p>

        {/* Section VII */}
        <h2 className="text-2xl text-secondary-dark dark:text-accent-base font-semibold mt-10 mb-4">
          VII. CONTACT US
        </h2>
        <p className="mb-4 text-justify">
          If you have any questions regarding this Privacy Policy or the
          practices of this Site, please contact us by sending an email to{' '}
          <a
            href="mailto:desimanwar@gmail.com"
            className="text-secondary-base dark:text-accent-base underline"
          >
            desimanwar@gmail.com
          </a>
          .
        </p>
        <div className="flex gap-x-4">
          <p className="text-sm mt-4 text-secondary-dark/50 dark:text-primary-base/50">
            Last Updated: 07/02/2025
          </p>
          <p className="text-sm mt-4 text-secondary-dark/50 dark:text-primary-base/50">
            Download PDF (coming soon ...)
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
