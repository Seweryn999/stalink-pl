import Image from "next/image";

export default function AiServicesSection() {
  const services = [
    {
      title: "Chatbot",
      description:
        "Inteligentny chatbot dostępny 24/7 do obsługi klientów, odpowiada na pytania i automatyzuje konwersacje.",
      img: "/images/aisection3.png",
    },
    {
      title: "System umawiania spotkań",
      description:
        "Automatyczny system rezerwacji terminów zintegrowany z kalendarzem, który przypomina o wizytach.",
      img: "/images/aisection2.png",
    },
    {
      title: "System ocen z powiadomieniami",
      description:
        "System zachęcający klientów do zostawiania opinii w Google z powiadomieniami dla właściciela o nowych ocenach.",
      img: "/images/aisection.png",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
          Usługi Automatyzacji AI
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
            >
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
