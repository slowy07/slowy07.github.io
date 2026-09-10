import { motion } from "framer-motion";
import datas from "../data/RequestData.json";

type Request = {
  name: string;
  nominal: number;
};

export function formatRp(nominal: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nominal);
}

const requests = datas as Request[];

export default function Requests() {
  const total = requests.reduce((sum, r) => sum + r.nominal, 0);

  return (
    <motion.div
      className="w-full h-full"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="lg:grid grid-cols-12 h-full flex flex-col gap-3 lg:gap-0 p-3 lg:p-4">
        {/* Sidebar */}
        <div className="lg:col-span-3 lg:pr-4">
          <div className="sys-panel h-full">
            <div className="sys-head px-3 py-1.5">
              <span>DIRECTORY / REQUESTS</span>
            </div>
            <div className="p-3 text-xs space-y-3">
              <div className="border-t border-net-line pt-2 text-net-gray space-y-1">
                <p>REQUESTS: {requests.length}</p>
                <p>STATUS: ONLINE</p>
                <p>TOTAL: {formatRp(total)}</p>
              </div>
              <div className="border-t border-net-line pt-2 text-net-gray text-[10px] space-y-1">
                <p>SOURCE: STATIC JSON</p>
                <p>UPDATE: REBUILD TO REFRESH</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="lg:col-span-9 h-full min-h-0">
          <div className="sys-panel h-full flex flex-col">
            <div className="sys-head px-3 py-1.5 flex items-center justify-between">
              <span className="text-net-ink">MEMBER REQUESTS</span>
              <span>CHANNEL: 04</span>
            </div>

            <div className="well flex-1 overflow-y-auto scrollbar-thin min-h-0 p-4 md:p-6">
              {requests.length === 0 ? (
                <p className="text-net-gray text-xs">NO REQUESTS YET.</p>
              ) : (
                <div className="space-y-1">
                  <div className="flex text-net-gray text-[10px] px-2 pb-1 border-b border-net-line">
                    <span className="flex-1">MEMBER</span>
                    <span>NOMINAL</span>
                  </div>
                  {requests.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-baseline gap-3 px-2 py-2 text-xs border-b border-net-line/40"
                    >
                      <span className="flex-1 min-w-0">
                        [{String(index + 1).padStart(2, "0")}]{" "}
                        <span className="text-net-ink glow uppercase">
                          {req.name}
                        </span>
                      </span>
                      <span className="text-net-ink whitespace-nowrap">
                        {formatRp(req.nominal)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}