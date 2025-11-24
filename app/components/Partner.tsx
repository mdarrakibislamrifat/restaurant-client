import Image from "next/image";

const Partner = () => {
  const partners = [
    { id: 1, icon: "/partner/image61.png" },
    { id: 2, icon: "/partner/image62.png" },
    { id: 3, icon: "/partner/image63.png" },
    { id: 4, icon: "/partner/image64.png" },
    { id: 5, icon: "/partner/image65.png" },
    { id: 6, icon: "/partner/image66.png" },
  ];

  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="w-full py-40  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-red-500 font-medium mb-2 tracking-wide uppercase">
            Partners & Clients
          </p>
          <h2 className="text-4xl font-bold text-gray-900">
            We work with the best people
          </h2>
        </div>

        {/* Marquee Carousel */}
        <div className="relative w-[1350px] mx-auto overflow-hidden">
          <div className="flex whitespace-nowrap animate-scroll">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="min-w-[200px] h-32 flex items-center justify-center px-4"
              >
                <Image
                  src={partner.icon}
                  alt="partner logo"
                  width={115}
                  height={130}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 5s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Partner;
