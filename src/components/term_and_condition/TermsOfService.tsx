import Link from "next/link";
import React from "react";

const TermsOfService = () => {
  return (
    <div className="p-6 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-4">TERMS OF SERVICE</h1>

      <ol className="list-decimal list-inside space-y-6">
        <li>
          <span className="text-xl font-semibold mb-4">Introduction: </span>
          These Terms of Service ("Terms") govern your access and use of the
          Atsur platform, including our website (atsur.art) and any associated
          applications or services (collectively, the "Platform"). By accessing
          or using the Platform, you agree to be bound by these Terms.
        </li>
        <li>
          <span className="text-xl font-semibold">About Us: </span>
          Atsur is an online platform that connects artists with art
          enthusiasts. We provide a platform for artists to showcase and sell
          their artwork, and for art enthusiasts to discover and purchase unique
          pieces. We act as an independent contractor and do not assume
          liability for the products or services offered on our platform.
        </li>

        <li>
          <span className="text-xl font-semibold">User Accounts: </span>
          To use the Platform to its full potential, you may create an account.
          You must be at least 18 years old to create an account. You are
          responsible for maintaining the confidentiality of your account
          credentials and are fully responsible for all activities that occur
          under your account.
        </li>

        <li>
          <span className="text-xl font-semibold">Privacy Policy: </span>
          Atsur is committed to protecting your privacy. Our Privacy Policy
          explains how we collect, use, and disclose your personal information.
          You can find the Privacy Policy{" "}
          <Link
            href="/terms-and-condition/data-privacy"
            className="text-blue-600 underline"
          >
            [link to Privacy Policy here]
          </Link>
          .
        </li>

        <li>
          <span className="text-xl font-semibold">Acceptable Use Policy: </span>
          You agree to use the Platform in a lawful and respectful manner.
          Prohibited activities include, but are not limited to:
          <ul className="list-disc  ml-8">
            <li>Uploading or sharing illegal content</li>
            <li>Infringing on the intellectual property rights of others</li>
            <li>Engaging in harassing or abusive behavior</li>
            <li>Providing false or misleading information</li>
            <li>Using the Platform for any unauthorized commercial purposes</li>
          </ul>
          Atsur reserves the right to remove or modify content that violates
          these Terms, at our sole discretion.
        </li>

        <li>
          <span className="text-xl font-semibold">Intellectual Property: </span>
          All content uploaded to the Platform by artists remains the property
          of the artists. By uploading content, you grant Atsur a non-exclusive,
          worldwide license to display and promote your artwork on the Platform.
          Atsur retains all ownership and intellectual property rights to the
          Platform itself, including its design, code, and content.
        </li>

        <li>
          <span className="text-xl font-semibold">Disclaimers: </span>
          Atsur strives to provide a reliable and secure platform, but we cannot
          guarantee uninterrupted, error-free service. Your use of the Atsur
          platform is at your own risk. Atsur does not guarantee the
          availability, performance, or security of the Platform. You use the
          Platform at your own risk.
        </li>

        <li>
          <span className="text-xl font-semibold">
            Limitation of Liability:{" "}
          </span>
          Atsur shall not be liable for any damages arising from your use of the
          Platform, including, but not limited to, direct, indirect, incidental,
          consequential, or punitive damages.
        </li>

        <li>
          <span className="text-xl font-semibold">Indemnification: </span>
          You agree to indemnify and hold Atsur harmless from any claims,
          losses, or liabilities arising from your use of the Platform,
          including any violation of these Terms.
        </li>

        <li>
          <span className="text-xl font-semibold">Termination: </span>
          Atsur may terminate your access to the Platform at any time for any
          reason, with or without notice. You may also terminate your account at
          any time.
        </li>

        <li>
          <span className="text-xl font-semibold">
            Updates to these Terms:{" "}
          </span>
          Atsur may update these Terms from time to time. We will notify you of
          any material changes by posting a notice on the Platform or by
          contacting you directly. Your continued use of the Platform after such
          changes constitutes your agreement to the revised Terms.
        </li>

        <li>
          <span className="text-xl font-semibold">
            Governing Law and Dispute Resolution:
          </span>
          These Terms shall be governed by and construed in accordance with the
          laws of the Federal Republic of Nigeria. Any dispute arising out of or
          relating to these Terms shall be submitted to arbitration in
          accordance with the Arbitration and Conciliation Act, Cap A10, Laws of
          the Federal Republic of Nigeria. The arbitration shall be conducted in
          Lagos, Nigeria.
        </li>

        <li>
          <span className="text-xl font-semibold">Severability: </span>
          If any provision of these Terms is held to be invalid or
          unenforceable, such provision shall be struck and the remaining
          provisions shall remain in full force and effect.
        </li>

        <li>
          <span className="text-xl font-semibold">Third-Party Services: </span>
          Atsur may integrate with third-party services. We are not responsible
          for the content, privacy practices, or terms of service of these third
          parties. Your use of such services may be subject to their own terms
          and conditions.
        </li>

        <li>
          <span className="text-xl font-semibold">Entire Agreement: </span>
          These Terms of Service constitute the entire agreement between you and
          Atsur regarding your use of the Atsur platform. By accessing or using
          the platform, you agree to be bound by these terms. IF YOU DO NOT
          AGREE TO THESE TERMS, PLEASE REFRAIN FROM USING THE PLATFORM.
        </li>

        <li>
          <span className="text-xl font-semibold">Contact Us: </span>
          If you have any questions about these Terms,{" "}
          <Link
            href="https://www.atsur.art/contact"
            className="text-blue-600 underline"
          >
            please contact us
          </Link>
          .
        </li>
      </ol>
    </div>
  );
};

export default TermsOfService;
