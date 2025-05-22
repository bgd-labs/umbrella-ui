import { useMobileMediaQuery } from "@/hooks/useMediaQuery";
import { useModalsContext } from "@/providers/ModalsProvider/ModalsContext";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { PropsWithChildren } from "react";
import { ModalBody, ModalClose, ModalRoot, ModalTitle, ModalTrigger } from "../Modal/Modal";
import { Block } from "../ui/Block";

export const TermsAndConditionsContentModal = ({ children }: PropsWithChildren) => {
  const isMobile = useMobileMediaQuery();
  const { isTermsAndConditionsContentOpen, setIsTermsAndConditionsContentOpen } = useModalsContext();

  return (
    <ModalRoot open={isTermsAndConditionsContentOpen} onOpenChange={setIsTermsAndConditionsContentOpen}>
      <ModalTrigger asChild>{children}</ModalTrigger>

      <ModalBody className="w-full max-w-(--mobile-container) md:max-w-[1024px]">
        <VisuallyHidden>
          <ModalTitle>Umbrella Info</ModalTitle>
        </VisuallyHidden>
        <Block elevation={isMobile ? 1 : 2} className="relative px-0 not-md:py-5">
          <ModalClose className="absolute top-4 right-4" />

          <div className="h-full max-h-[90vh] overflow-y-auto px-6 md:px-0">
            <div className="mx-auto flex w-full flex-col gap-4 not-md:text-base md:max-w-[728px] md:gap-6 md:pt-14 md:pb-[80px]">
              <div className="flex items-center justify-center">
                <h1 className="text-xl font-bold dark:text-white">Aave Umbrella Interface Terms and Conditions</h1>
              </div>
              <h2 className="font-bold">1. Purpose of the Agreement</h2>
              <p>Welcome to the Aave Umbrella user interface.</p>
              <p>
                Effective Date: <strong>May 19, 2025</strong>
              </p>
              <p>
                The Aave Umbrella user interface is brought to you by BGD Labs Technology LLC (“BGD Labs Technology”,
                “we,” “us,” or “our”). By accessing or using our interface, you agree to comply with and be bound by the
                following Terms and Conditions (the &quot;Agreement&quot;). Please read this Agreement carefully before
                using our interface.
              </p>
              <p>
                The Agreement regulates the use of the Aave Umbrella interface (“<strong>Aave Umbrella</strong>”).
              </p>
              <h2 className="font-bold">2. Acceptance of the Agreement</h2>
              <p>
                By accessing or using the Aave Umbrella interface, you acknowledge that you have read and agree to this
                Agreement, and that you have the legal capacity to enter into a binding agreement with BGD Labs
                Technology LLC. If you do not meet the eligibility requirements to enter into a binding agreement, you
                must not access or use our interface.
              </p>
              <h2 className="font-bold">3. Who We Are</h2>
              <p>
                BGD Labs Technology is a software development company specialised in blockchain technology, specifically
                DeFi and decentralised protocols based on smart contracts.
              </p>
              <h2 className="font-bold">4. Our Professional Engagement with the Aave DAO</h2>
              <p>
                BGD Labs Technology provides software development and security services to the Aave DAO, including the
                design and implementation of smart contract systems such as Umbrella. While we develop and propose
                improvements to Aave protocol infrastructure, the final decision to activate or adopt such systems rests
                exclusively with Aave Governance. BGD Labs does not have the authority to activate or operate smart
                contracts within the Aave ecosystem.
              </p>
              <h2 className="font-bold">5. The Aave DAO</h2>
              <p>“Aave DAO” is a decentralised autonomous organisation (DAO) that governs the Aave Protocol.</p>
              <p>
                The Aave DAO is fully controlled by AAVE token holders, who have the decision-making power over the Aave
                Protocol system, processes, and service provider agreements.
              </p>
              <h2 className="font-bold">6. The Aave Protocol</h2>
              <p>
                Aave is recognized as the world’s largest liquidity software protocol, operating across multiple
                blockchains, including Ethereum. It enables users to supply and borrow on-chain digital assets through
                smart contracts.
              </p>
              <p>Initially launched in 2020, Aave has been enhanced by various supplementary subsystems, including:</p>
              <ul className="list-disc">
                <li className="ml-8">
                  <strong>Aave Governance:</strong> A framework of smart contracts for governance managed by holders of
                  the AAVE token.
                </li>
                <li className="ml-8">
                  <strong>Aave Safety Module (Umbrella):</strong> A safety and protection mechanism designed to
                  safeguard user assets.
                </li>
                <li className="ml-8">
                  <strong>Aave Delivery Infrastructure:</strong> Cross-chain messaging infrastructure for the Aave DAO
                  needs (e.g., governance).
                </li>
                <li className="ml-8">
                  <strong>Supplementary Tools and Infrastructure:</strong> A range of additional tools and
                  infrastructure developed to support the overall functionality of the protocol.
                </li>
              </ul>
              <h2 className="font-bold">7. Description of our interface</h2>
              <p>
                The Aave Umbrella interface is a software application that allows users to build transactions to
                interact with the Umbrella smart contracts deployed by the Aave DAO. These transactions are then
                submitted by the user via their own blockchain wallet. Through the interface, users can build Umbrella
                transactions for the following:
              </p>
              <ul className="list-disc">
                <li className="ml-8">Stake eligible assets;</li>
                <li className="ml-8">Activate cooldown;</li>
                <li className="ml-8">Unstake assets;</li>
                <li className="ml-8">Claim rewards;</li>
              </ul>
              <p>
                Additionally, the Aave Umbrella interface allows the user to visualise aggregated data of their staking
                positions on the Umbrella smart contracts.
              </p>
              <h2 className="font-bold">8. User Acknowledgement and Acceptance</h2>
              <p>
                By accessing or using the Aave Umbrella interface, you acknowledge that you understand and accept the
                following:
              </p>
              <ul className="list-disc">
                <li className="ml-8">
                  You have a comprehensive understanding of blockchain technology and how it works, including the
                  mechanics of transactions, gas fees, smart contracts, cryptographic tokens, and signatures.
                  Additionally, you are representing that you possess the necessary financial and technical
                  sophistication to appreciate the risks associated with using cryptographic and blockchain-based
                  systems, and that you have a practical understanding of the complexities and usage of digital assets.
                </li>
                <li className="ml-8">
                  You have a comprehensive understanding of the functionality and mechanics of the smart contracts,
                  which are owned by the Aave DAO.
                </li>
                <li className="ml-8">
                  You understand the mechanics of staking, cooldown periods, withdrawal windows, and on-chain rewards
                  distribution in the Aave Umbrella system.
                </li>
                <li className="ml-8">
                  You understand the concept of slashing on the Aave Umbrella smart contracts, by which users lose
                  staked funds for those smart contracts to cover a loss on the Aave Protocol.
                </li>
                <li className="ml-8">
                  You understand that all claimable rewards shown on the Aave Umbrella Interface are fully dependent on
                  the Aave DAO and not controllable by the Interface itself.
                </li>
                <li className="ml-8">
                  You understand that the user interface interacting with the Umbrella smart contracts is software that
                  is completely independent of the smart contracts themselves.
                </li>
                <li className="ml-8">
                  While using the Aave Umbrella interface, you recognize that the foundational blockchain technologies
                  employed are both innovative and highly technical, carrying inherent risks. The responsibility to bear
                  any risks of loss resulting from the use of the Aave Umbrella interface lies squarely with you.
                </li>
                <li className="ml-8">
                  It&apos;s paramount to grasp that digital asset markets can be volatile due to various reasons, such
                  as market adoption, speculative tendencies, technological evolution, security protocols, and legal
                  frameworks. The costs and speeds of operations on distributed ledger and blockchain systems can shift
                  suddenly and dramatically.
                </li>
                <li className="ml-8">
                  The Aave Umbrella interface is designed to build interactions with blockchain-based smart contracts
                  using advanced technical systems. However, due to the number of factors involved—including market
                  dynamics, on-chain governance, and third-party infrastructure—outcomes are inherently unpredictable.
                  As such, no specific results or performance guarantees are provided when using the interface.
                </li>
                <li className="ml-8">
                  We neither own nor exert control over any of the digital assets or the foundational blockchains
                  involved in transactions via the Services. Thus, we cannot be held accountable for losses you might
                  sustain while using the Service, particularly losses arising from software malfunctions, system
                  downtimes, or equipment-related issues.
                </li>
              </ul>
              <h2 className="font-bold">9. No Custody or Control Over User Assets</h2>
              <p>
                BGD Labs Technology does not hold custody of any digital assets, private keys, or wallet credentials on
                behalf of users. All transactions initiated through the Aave Umbrella interface are executed directly by
                users through their own self-custodial wallets. BGD Labs Technology has no access to, or control over,
                any user assets or transaction execution. You are solely responsible for managing your own wallet,
                securing your private keys, and reviewing the accuracy and security of any transactions you authorize.
              </p>
              <h2 className="font-bold">10. Modification of the Agreement</h2>
              <p>
                We reserve the right to modify these Terms and Conditions at any time and for any reason at our sole
                discretion. Should any changes be made to these Terms, we will make reasonable efforts to notify you of
                such changes prior to the change becoming effective. Your continued use of the Aave Umbrella interface
                after such notification signifies your acceptance of the modified terms.
              </p>
              <h2 className="font-bold">11. Non-Profit Declaration</h2>
              <p>
                BGD Labs Technology hereby declares that it does not benefit in any way, financially or otherwise, from
                the Aave Umbrella or this interface used to interact with them. Our engagement with the DAO is solely
                focused on providing software development and security services to the Aave DAO, including the design
                and implementation of smart contract systems such as Umbrella.
              </p>
              <h2 className="font-bold">12. No Responsibility for User Assets and Tax Obligations</h2>
              <p>
                The user assumes full responsibility for complying with any and all current and future tax obligations
                associated with their use of the Aave Umbrella interface, including but not limited to taxes, duties,
                and assessments claimed or imposed by any governmental authority. This responsibility includes taxes
                payable as a result of interacting with smart contracts and recovering the assets.
              </p>
              <p>
                Please note that blockchain-based transactions are a relatively new development, and as such, their tax
                treatment is uncertain.
              </p>
              <h2 className="font-bold">13. Disclaimer of Financial Services</h2>
              <p>
                The Aave Umbrella interface is provided solely for the purpose of enabling users to stake supported
                assets, activate cooldowns, claim rewards, and withdraw funds by interacting with the Aave Umbrella
                smart contracts deployed by the Aave DAO. The interface is not intended to provide, and should not be
                considered as, financial or investment advice or services. BGD Labs Technology is not a financial
                institution and does not provide any financial or investment services through the interface. The
                interface with the Aave Umbrella smart contracts is not intended to be used for any financial or
                investment purposes.
              </p>
              <h2 className="font-bold">14. Non-Responsibility of Third-Party Services</h2>
              <p>
                BGD Labs Technology is not responsible for any third-party services used by users in connection with our
                interface, including but not limited to wallets, RPC nodes, or other technologies used to interact with
                supported blockchain networks. We make no representations or warranties concerning the security,
                functionality, or availability of any third-party services, and users assume all risks associated with
                the use of such services. BGD Labs Technology is not responsible for any losses, damages, or liabilities
                arising from the use of third-party services in connection with our interface.
              </p>
              <h2 className="font-bold">15. User Responsibilities</h2>
              <p>
                To access and use the Aave Umbrella interface, you must comply with this Agreement, applicable
                third-party policies, and all applicable laws, rules, and regulations. The following conduct is strictly
                prohibited:
              </p>
              <ul className="list-disc">
                <li className="ml-8">
                  Using the Aave Umbrella interface to engage in or facilitate illegal activities, including but not
                  limited to money laundering, terrorism financing, tax evasion, or any activity in violation of
                  sanctions or financial regulations;
                </li>
                <li className="ml-8">Using the Aave Umbrella interface for unauthorized commercial purposes;</li>
                <li className="ml-8">
                  Uploading or transmitting viruses, worms, Trojan horses, time bombs, cancel bots, spiders, malware or
                  any other type of malicious code that will or may be used in any way that will affect the
                  functionality or operation of the Aave Umbrella interface;
                </li>
                <li className="ml-8">
                  Attempting to or actually copying or making unauthorized use of all or any portion of the Aave
                  Umbrella interface, including by attempting to reverse compile, reformatting or framing, disassemble,
                  reverse engineer any part of the Aave Umbrella interface;
                </li>
                <li className="ml-8">
                  Harvesting or collecting information from the Aave Umbrella interface for any unauthorized purpose;
                </li>
                <li className="ml-8">Using the Aave Umbrella interface under false or fraudulent pretenses;</li>
                <li className="ml-8">Interfering with other users’ access to or use of the Aave Umbrella interface;</li>
                <li className="ml-8">
                  Interfering with or circumventing the security features of the Aave Umbrella interface or any third
                  party’s systems, networks, or resources used in the provision of Aave Umbrella interface;
                </li>
                <li className="ml-8">
                  Engaging in any attack, hack or denial-of-service attempt or interference in relation to the Aave
                  Umbrella interface; or
                </li>
                <li className="ml-8">Engaging in any anticompetitive behavior or other misconduct.</li>
                <li className="ml-8">
                  Engaging in conduct that could jeopardize the security or functionality of the Aave Umbrella
                  interface, or deceive or defraud other users.
                </li>
                <li className="ml-8">
                  Transacting in items that infringe intellectual property rights, including but not limited to
                  copyrights or trademarks;
                </li>
                <li className="ml-8">
                  Using connection methods, such as VPNs or proxies, to bypass geographic restrictions, regulatory
                  requirements, or these terms of service.
                </li>
                <li className="ml-8">
                  Accessing or interacting with the Aave Umbrella interface if you are the target of any sanctions
                  administered or enforced by the U.S. Department of the Treasury’s Office of Foreign Assets Control
                  (OFAC), the United Nations Security Council, the European Union, Her Majesty’s Treasury (UK), or any
                  other sanctions authority in any applicable jurisdiction. This includes if you, your wallet address,
                  or your affiliated entity appears on any sanctions list such as the Specially Designated Nationals and
                  Blocked Persons List (SDN List), the Consolidated Sanctions List (Non-SDN Lists), or equivalent lists.
                  You are also prohibited from using the Aave Umbrella interface if you are located, incorporated, or
                  otherwise resident in a country or territory subject to comprehensive sanctions, including but not
                  limited to Côte d’Ivoire, Cuba, Belarus, Iran, Iraq, Liberia, North Korea, Sudan, and Syria. You are
                  solely responsible for complying with all laws and regulations applicable to your jurisdiction, and
                  BGD Labs shall not be liable for your failure to do so.
                </li>
              </ul>
              <h2 className="font-bold">16. Intellectual Property Rights</h2>
              <p>
                The Aave Umbrella interface and its related software are licensed under the Business Source License 1.1
                (“BSL 1.1”) by the Aave DAO, represented by its governance smart contracts. The full license text and
                terms are publicly available at:{" "}
                <a
                  href="https://github.com/aave-dao/aave-umbrella-ui/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600"
                >
                  https://github.com/aave-dao/aave-umbrella-ui/blob/main/LICENSE
                </a>
                .
              </p>
              <p>
                The Licensed Work is (c) 2025 Aave DAO, and all intellectual property rights in the Aave Umbrella
                interface are owned by the Aave DAO. BGD Labs Technology has contributed to the development of the
                interface in its role as a service provider to the Aave DAO and does not claim ownership of the licensed
                work.
              </p>
              <p>
                You acknowledge that these Terms do not grant you any intellectual property rights whatsoever in the
                Aave Umbrella interface or related software. All rights are reserved by the Aave DAO, subject to the
                license terms outlined above.
              </p>
              <h2 className="font-bold">17. No Investment Advice</h2>
              <p>
                This application and any information provided through it are not intended to be and do not constitute
                investment advice, financial advice, trading advice, or any other advice. BGD Labs Technology does not
                provide any investment advice or recommendations regarding any digital assets or cryptocurrencies. The
                information provided is solely for informational purposes and is not to be relied upon for any purpose.
                You should consult with an investment professional before making any investment decisions.
              </p>
              <h2 className="font-bold">18. NO WARRANTIES</h2>
              <p>
                THE AAVE UMBRELLA INTERFACE BY BGD LABS TECHNOLOGY IS PROVIDED &quot;AS IS&quot; AND &quot;AS
                AVAILABLE,&quot; WITHOUT ANY REPRESENTATIONS OR WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR
                STATUTORY. WE SPECIFICALLY DISCLAIM ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
                PARTICULAR PURPOSE. YOU ACKNOWLEDGE AND AGREE THAT YOUR USE OF OUR PRODUCTS IS AT YOUR OWN RISK. WE DO
                NOT GUARANTEE THAT ACCESS TO ANY OF OUR PRODUCTS WILL BE CONTINUOUS, UNINTERRUPTED, TIMELY, OR SECURE;
                THAT THE INFORMATION CONTAINED IN ANY OF OUR PRODUCTS WILL BE ACCURATE, RELIABLE, COMPLETE, OR CURRENT;
                OR THAT ANY OF OUR PRODUCTS WILL BE FREE FROM ERRORS, DEFECTS, VIRUSES, OR OTHER HARMFUL ELEMENTS. ANY
                ADVICE, INFORMATION, OR STATEMENT THAT WE PROVIDE SHOULD NOT BE CONSIDERED AS CREATING ANY WARRANTY
                CONCERNING OUR PRODUCTS. WE DO NOT ENDORSE, GUARANTEE, OR ASSUME ANY RESPONSIBILITY FOR ANY
                ADVERTISEMENTS, OFFERS, OR STATEMENTS MADE BY THIRD PARTIES CONCERNING ANY OF OUR PRODUCTS.
              </p>
              <h2 className="font-bold">19. Indemnification</h2>
              <p>
                You agree to hold harmless, release, defend, and indemnify us and our officers, directors, employees,
                contractors, agents, and affiliates from and against all claims, damages, obligations, losses,
                liabilities, costs, and expenses arising from: (a) your access and use of the Aave Umbrella interface;
                (b) your violation of any term or condition of this Agreement, the right of any third party, or any
                other applicable law, rule, or regulation; (c) any other party&apos;s access and use of Aave Umbrella
                interface with your assistance or using any device or account that you own or control; (d) any dispute
                between you and any other user of Aave Umbrella interface or any of your own customers or users; (e)
                your breach or alleged breach of the Agreement (including, without limitation, these Terms); (f) your
                violation of the rights of any third party, including any intellectual property right, publicity,
                confidentiality, property, or privacy right; (g) any misrepresentation made by you.
              </p>
              <p>
                We reserve the right to assume, at your expense, the exclusive defense and control of any matter subject
                to indemnification by you. You agree to cooperate with our defense of any claim. You will not in any
                event settle any claim without our prior written consent.
              </p>
              <h2 className="font-bold">20. Contact</h2>
              <p>
                If you have any questions or concerns about this Agreement or any of our Products, please contact us at{" "}
                <a href="mailto:hi@bgdlabs.com" className="text-gray-600">
                  hi@bgdlabs.com
                </a>
                .
              </p>
              <h2 className="font-bold">21. Arbitration Agreement and Waiver of Rights, Including Class Actions</h2>
              <h3 className="font-semibold">
                Agreement to Attempt to Resolve Disputes Through Good Faith Negotiations
              </h3>
              <p>
                Prior to commencing any legal proceeding against us of any kind, including an arbitration as set forth
                below, you and we agree that we will attempt to resolve any Dispute arising out of or relating to the
                agreement or the Services (each, a “Dispute” and, collectively, “Disputes”) by engaging in good faith
                negotiations. In the event of any dispute arising between the parties, the parties shall first refer the
                dispute to the proceedings under Federal Law No. 6 of 2021 on Mediation in Civil and Commercial Disputes
                (the “<strong>Mediation Law</strong>”). If the dispute has not been settled pursuant to the said rules
                within 90 days following the request for mediation or within such other period as the parties may agree
                in writing, such dispute shall thereafter be finally settled by way of arbitration according to the
                Rules of Arbitration of the International Chamber of Commerce (ICC) as detailed in Article 21.
              </p>
              <h3 className="font-semibold">Agreement to Arbitrate</h3>
              <p>
                You and we agree that any Dispute that cannot be resolved through the procedures set forth above will be
                resolved through binding arbitration in accordance with the International Arbitration Rules of the
                International Chamber of Commerce (ICC). The place of arbitration shall be Dubai, United Arab Emirates,
                and the language of the arbitration shall be English. The arbitrator(s) must have experience
                adjudicating matters involving Internet technology, software applications, financial transactions and,
                ideally, blockchain technology. The arbitrator’s award of damages must be consistent with the terms of
                the “Limitation of Liability” subsection of these Terms as to the types and amounts of damages for which
                a party may be held liable. The prevailing party will be entitled to an award of their reasonable
                attorney’s fees and costs. Except as may be required by law, neither a party nor its representatives may
                disclose the existence, content, or results of any arbitration hereunder without the prior written
                consent of both parties.
              </p>
              <p>
                UNLESS YOU TIMELY PROVIDE US WITH AN ARBITRATION OPT-OUT NOTICE (AS DEFINED BELOW IN THE SUBSECTION
                TITLED “YOUR CHOICES”), YOU ACKNOWLEDGE AND AGREE THAT YOU AND WE ARE EACH WAIVING THE RIGHT TO A TRIAL
                BY JURY OR TO PARTICIPATE AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS ACTION OR REPRESENTATIVE
                PROCEEDING. FURTHER, UNLESS BOTH YOU AND WE OTHERWISE AGREE IN WRITING, THE ARBITRATOR MAY NOT
                CONSOLIDATE MORE THAN ONE PERSON’S CLAIMS AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF ANY CLASS OR
                REPRESENTATIVE PROCEEDING.
              </p>
              <p>
                By rejecting any changes to these Terms, you agree that you will arbitrate any Dispute between you and
                us in accordance with the provisions of this section as of the date you first accepted these Terms (or
                accepted any subsequent changes to these Terms).
              </p>
              <h2 className="font-bold">22. Notice</h2>
              <p>
                We may provide any notice to you under this Agreement using commercially reasonable means, including
                using public communication channels. Notices we provide by using public communication channels will be
                effective upon posting.
              </p>
              <h2 className="font-bold">23. Severability</h2>
              <p>
                If any provision of this Agreement shall be determined to be invalid or unenforceable under any rule,
                law, or regulation of any local, state, or federal government agency, such provision will be changed and
                interpreted to accomplish the objectives of the provision to the greatest extent possible under any
                applicable law and the validity or enforceability of any other provision of this Agreement shall not be
                affected.
              </p>
              <h2 className="font-bold">24. Governing law</h2>
              <p>
                These Terms and any separate agreements whereby we provide you Services shall be governed by and
                construed in accordance with the laws of the United Arab Emirates.
              </p>
            </div>
          </div>
        </Block>
      </ModalBody>
    </ModalRoot>
  );
};
