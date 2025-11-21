import QuoteForm from './QuoteForm';

export default function GetAQuotePage() {
  return (
    <div>
      {/* Header Section */}
      <section
        className="relative h-[300px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/get_a_quote.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Get a Quote</h1>
          <p className="text-lg md:text-xl mt-2">
            Fill out the form below to get a quote for your order.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <QuoteForm />
        </div>
      </section>
    </div>
  );
}
