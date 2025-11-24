import Image from "next/image";
import bgPicture from "../../public/Bg.png";

const TeamMembers = () => {
  const teamMembers = [
    {
      name: "Mark Henry",
      role: "Owner",
      image: "/mark.png",
    },
    {
      name: "Lucky Helen",
      role: "Chef",
      image: "/mark.png",
    },
    {
      name: "Moon Henry",
      role: "Founder",
      image: "/mark.png",
    },
    {
      name: "Tom Monrow",
      role: "Specialist",
      image: "/mark.png",
    },
  ];

  return (
    <div className="w-full bg-gray-50">
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgPicture.src}), linear-gradient(to top, #B92B27, #B92B27)`,
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 flex flex-col items-center pt-20 pb-32 md:pb-48 px-4 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Team Member</h1>
          <p className="text-sm md:text-base opacity-90 max-w-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
            aperiam, aut molestias inventore nobis temporibus.
          </p>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="relative z-20 -mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col items-center text-center"
            >
              <div className="w-full aspect-[4/5] relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              <div className="p-4 w-full">
                <h3 className="text-base text-gray-900 font-semibold">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-xs mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
