import A5 from "../Images/A5.jpg";
import f2 from "../Images/f2.webp";
import f3 from "../Images/f3.jpg";
import f4 from "../Images/f4.webp";
import { Users, Sprout, TrendingUp, Award } from "lucide-react";

const ServicesBanner = () => {
  return (
    <div className="mt-20">
      <div className="relative overflow-hidden rounded-[40px]">
        {/* Background Image */}

        <img src={A5} alt="Farmers" className="w-full h-[520px] object-cover" />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent"></div>

        {/* Glass Card */}

        <div className="absolute left-10 bottom-10 bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md text-white">
          <span className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-sm">
            <Award size={16} />
            AI Powered Farming
          </span>

          <h2 className="text-4xl font-bold mt-6 leading-tight">
            Growing Smarter,
            <br />
            Harvesting Better.
          </h2>

          <p className="mt-5 text-white/90 leading-7">
            KrishiConnect combines Artificial Intelligence, disease prediction,
            weather forecasting and soil analysis to help farmers maximize
            productivity.
          </p>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-6 mt-8">
            <div>
              <Users className="mb-2" />

              <h3 className="text-2xl font-bold">10K+</h3>

              <p className="text-sm text-white/80">Farmers</p>
            </div>

            <div>
              <Sprout className="mb-2" />

              <h3 className="text-2xl font-bold">120+</h3>

              <p className="text-sm text-white/80">Crops</p>
            </div>

            <div>
              <TrendingUp className="mb-2" />

              <h3 className="text-2xl font-bold">97%</h3>

              <p className="text-sm text-white/80">Accuracy</p>
            </div>
          </div>

          {/* Floating Avatars */}

          <div className="flex items-center mt-8">
            <img
              src={f2}
              alt=""
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />

            <img
              src={f3}
              alt=""
              className="-ml-3 w-10 h-10 rounded-full border-2 border-white object-cover"
            />

            <img
              src={f4}
              alt=""
              className="-ml-3 w-10 h-10 rounded-full border-2 border-white object-cover"
            />

            <span className="ml-4 text-sm">
              Trusted by farmers across India
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesBanner;
