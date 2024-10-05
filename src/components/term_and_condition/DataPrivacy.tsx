import Link from "next/link";
import React from "react";

const DataPrivacyPolicy = () => {
  return (
    <div className="p-6 bg-white ">
      <h1 className="text-3xl font-bold mb-4">DATA PRIVACY POLICY</h1>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Introduction</h2>
      <p className="mb-4">
        At Atsur Ltd and Atsur Technologies Limited (collectively, "Atsur,"
        "Company," "we," "us," or "our"), we understand the importance of
        protecting your privacy and security. We are committed to being
        transparent, accountable, and confidential regarding your personal data.
        This Privacy Policy explains how Atsur collects, uses, and discloses
        your personal information when you use our website, atsur.art (the
        "Site").
      </p>
      <p className="mb-4">
        By accessing or using our Site, you acknowledge that you have read,
        understood, and agree to our collection, storage, use, and disclosure of
        your personal information as described in this Privacy Policy and our
        Terms of Service. This Data Policy outlines Atsur's practices regarding
        the collection, use, and protection of user data. By using the Atsur
        platform, you consent to the collection and processing of your data as
        described in this policy.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Data Collection</h2>
      <p className="mb-4">
        Atsur collects personal information when you interact with our platform.
        This includes data you provide directly, like your name, email, phone
        number, payment information, and Artwork information (e.g., titles,
        descriptions, images). We also gather information indirectly through
        your actions on the platform, such as browsing history, artwork
        interactions, and support requests. This information helps us provide a
        better user experience, improve our platform, and ensure secure
        transactions.
      </p>
      <p className="mb-4">We may collect this data:</p>
      <ul className="list-decimal   mb-4">
        <li className="ml-8">
          Directly, when you actively provide information, such as creating an
          account, registering artwork, contacting our support team, or
          interacting with platform features.
        </li>
        <li className="ml-8">
          Indirectly, through technology like cookies, which track your online
          activity on our website. This helps us understand how you use the
          platform and improve your experience.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Data Usage</h2>
      <p className="mb-4">Atsur uses the information collected to:</p>
      <ul className="list-decimal ml-8 mb-4">
        <li>
          Improve Atsur's features and functionality, enhancing it and making it
          a better experience for all users.
        </li>
        <li>
          Process payments and transactions, ensuring a smooth buying and
          selling process on the platform.
        </li>
        <li>
          Keep you informed, sending you updates about your account, new
          features, and promotions related to Atsur.
        </li>
        <li>
          Understand your needs and tailor Atsur to better meet your needs and
          preferences.
        </li>
        <li>
          Protect our platform, safeguarding Atsur from security threats and
          preventing fraudulent activities.
        </li>
      </ul>
      <p className="mb-4">
        We adhere to relevant laws and regulations regarding data privacy and
        protection.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Data Sharing</h2>
      <p className="mb-4">
        We prioritize the security and confidentiality of your data and take
        measures to ensure that any third-party sharing complies with applicable
        laws and regulations. Atsur may share your personal information with:
      </p>
      <ul className="list-decimal ml-8 mb-4">
        <li>
          <strong>Third-party service providers:</strong> We work with trusted
          partners who help us operate the Atsur platform. These partners may
          have access to your information to fulfill their specific roles, such
          as processing payments or storing data securely. We require these
          partners to adhere to strict data privacy and security standards.
        </li>
        <li>
          <strong>Law enforcement or regulatory authorities:</strong> In certain
          circumstances, we may be legally obligated to share your information
          with law enforcement agencies or regulatory bodies.
        </li>
        <li>
          <strong>Other Users:</strong> Profile information and public posts you
          make on Atsur will be visible to other users of the platform.
        </li>
        <li>
          <strong>Third-Party Businesses:</strong> We may partner with other
          companies to offer products or services through our platform. These
          partners may have access to your information to fulfill their role.
        </li>
        <li>
          <strong>Affiliated Companies:</strong> Atsur may share your
          information with other companies under common ownership for business
          purposes, such as marketing or analytics.
        </li>
        <li>
          <strong>In Special Circumstances:</strong> We may share your
          information in cases involving a merger, sale of assets,
          reorganization, financing, or change of control. We may also share
          information if required by law or to protect the security of our
          platform.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Data Security</h2>
      <p className="mb-4">
        Atsur prioritizes the security of your personal information. We
        implement robust measures to protect your data from unauthorized access,
        disclosure, alteration, or destruction. As an Atsur User, you have the
        right to:
      </p>
      <ul className="list-decimal ml-8 mb-4">
        <li>View and review the personal information we hold about you.</li>
        <li>Request corrections if you find any inaccuracies in your data.</li>
        <li>
          Request the deletion of your personal information from our systems,
          subject to legal requirements.
        </li>
        <li>
          Object to certain uses of your data, especially for marketing
          purposes.
        </li>
        <li>
          Withdraw consent you have given us to process your data for specific
          purposes.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Information</h2>
      <p className="mb-4">
        For any questions or concerns regarding this Privacy Policy or your
        personal data, please{" "}
        <Link href="https://www.atsur.art/contact" className="text-blue-600">
          contact us
        </Link>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Consent</h2>
      <p className="mb-4">
        By using the Atsur platform, you acknowledge that you have read and
        understood this Privacy Policy and consent to the collection, use, and
        disclosure of your personal information as described.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Changes to this Privacy Policy
      </h2>
      <p className="mb-4">
        Atsur reserves the right to update this Privacy Policy periodically to
        reflect changes in our practices or legal requirements. If we make
        material changes to this Policy, we will notify you by posting a
        prominent notice on our website or by contacting you directly. We
        encourage you to review this Privacy Policy regularly for updates.
      </p>

      <p className="text-gray-600 italic">
        Created on 18th September 2024. Last Updated 24th September 2024.
      </p>
    </div>
  );
};

export default DataPrivacyPolicy;
