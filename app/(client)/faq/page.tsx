import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    question: "What is Desi Manwar Private Limited?",
    answer:
      "Desi Manwar is an India-based export-import company focused on delivering premium food commodities such as Indian Rice, Brazilian sugar (ICUMSA 45), Indian Spices (Whole & Ground), Edible Oils, and Specialty Blends. We are committed to bridging cultures through global trade of high-quality agricultural products.",
  },
  {
    question: "What sets Desi Manwar apart from other exporters?",
    answer:
      "We combine consistent product quality with responsive customer service, certified sourcing, transparent documentation, and a deep understanding of global market dynamics. Our direct relationships with farmers and streamlined logistics ensure reliability and excellence in every transaction.",
  },
  {
    question: "How experienced is your company in international trade?",
    answer:
      "Our leadership team brings extensive experience in global trade and supply chain management, with a proven track record of successful international transactions and strong relationships with partners worldwide.",
  },
  {
    question: "What products do you export, and what are your key markets?",
    answer: `
      <p><strong>Grains:</strong> Basmati & Non-Basmati Rice</p>
      <p><strong>Spices:</strong> Red Chili Powder, Turmeric, Cumin, Coriander, Black Pepper, etc.</p>
      <p><strong>Oils:</strong> Palm Oil, Mustard Oil, Soybean Oil</p>
      <p><strong>Millets:</strong> Ragi, Foxtail Millet, Quinoa</p>
      <p>Custom spice blends</p>
      <p>Brazilian Sugar (ICUMSA 45)</p>
      <p><strong>Key Markets:</strong> USA, UAE, Brazil, Europe, Africa, and parts of Asia.</p>
    `,
  },
  {
    question: "What is your minimum order quantity (MOQ)?",
    answer:
      "Our standard Minimum Order Quantity (MOQ) is one Full Container Load (FCL), which is approximately 25 metric tons (MT). For specific products, trial quantities from 1 kg are considered. Please contact us for more details.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various secure payment methods including TT/Bank Transfer, Letter of Credit (LC - non-transferable), Standby Letter of Credit (SBLC). For product samples, PayPal is also accepted.",
  },
  {
    question: "How do you ensure product quality before shipment?",
    answer:
      "We ensure product quality through certified sourcing from reputable farms, rigorous in-house quality checks, and independent third-party laboratory tests. We comply with international standards like FSSAI, APEDA, and ISO, and conduct SGS inspection for all shipments.",
  },
  {
    question: "Do you handle customs documentation and taxes?",
    answer:
      "Yes, we meticulously handle all export documentation required for seamless international shipping. Import duties and local taxes in the destination country are typically the buyer’s responsibility, unless specifically agreed upon under DDP (Delivered Duty Paid) terms.",
  },
  {
    question: "What are your shipping options and estimated delivery times?",
    answer:
      "We offer flexible shipping options including sea freight, air freight, and courier services. Estimated delivery times are: USA/Europe: 18–25 days; Asia: 10–15 days. Samples are typically delivered within 5–7 days.",
  },
  {
    question: "Can I request product samples? Are they free or paid?",
    answer:
      "Yes, product samples can be requested. Samples are generally paid for, and the buyer is responsible for covering all shipping costs.",
  },
  {
    question: "Do you offer private labeling or custom packaging?",
    answer:
      "Yes, we offer comprehensive private labeling and custom packaging services. We provide flexible options including 1kg, 5kg, and 10kg packaging. Our team will work closely with you to support your brand design and specifications.",
  },
  {
    question: "How can I contact your sales team for bulk inquiries?",
    answer:
      "For all bulk inquiries and detailed discussions, please contact our dedicated sales team directly via our <a href='/contact' class='text-primary hover:underline'>Contact Us</a> page. We are ready to assist you with personalized solutions.",
  },
];


export default function FAQPage() {
  return (
    <div>
      {/* Header Section */}
      <section
        className="relative h-[300px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/faq.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl mt-2">
            Your questions, answered.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
