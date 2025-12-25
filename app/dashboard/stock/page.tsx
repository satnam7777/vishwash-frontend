"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { useRef } from "react";

/* =========================
   CHART DATA (IMAGE-LIKE)
========================= */
const chartData = [
  { date: "Jun '25", value: 31 },
  { date: "Jul '25", value: 33 },
  { date: "Aug '25", value: 34 },
  { date: "Sep '25", value: 32 },
  { date: "Oct '25", value: 31 },
  { date: "Nov '25", value: 30 },
  { date: "Dec '25", value: 33 },
  { date: "Jan '26", value: 32 },
  { date: "Feb '26", value: 34 },
  { date: "Mar '26", value: 35 },
  { date: "Apr '26", value: 38 },
];

/* =========================
   MANY STOCKS (SLIDER TEST)
========================= */
const topCards = [
  { name: "Apple", value: 410.5, change: -1.1 },
  { name: "Meta", value: 157.36, change: -0.1 },
  { name: "Google", value: 743.76, change: 0.95 },
  { name: "Tesla", value: 234.09, change: -1.1 },
  { name: "Microsoft", value: 389.21, change: 1.25 },
  { name: "Amazon", value: 182.45, change: 0.85 },
  { name: "Netflix", value: 612.77, change: 1.72 },
  { name: "Nvidia", value: 495.64, change: 2.45 },
  { name: "Adobe", value: 563.12, change: -0.42 },
  { name: "Intel", value: 43.18, change: 0.18 },
  { name: "AMD", value: 164.22, change: 1.05 },
  { name: "PayPal", value: 61.34, change: -0.65 },
  { name: "Uber", value: 72.19, change: 0.92 },
  { name: "Airbnb", value: 148.88, change: -0.31 },
];

export default function DashboardPage() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="p-8 space-y-8">
      {/* ================= TOP SLIDER ================= */}
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pr-16"
        >
          {topCards.map((item, i) => (
            <Card key={i} className="min-w-[260px] shrink-0 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">Total Share</p>
                <p className="text-xl font-bold">${item.value}</p>
                <p
                  className={`flex items-center text-sm mt-2 ${
                    item.change > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.change > 0 ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  )}
                  {item.change}%
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          onClick={scrollRight}
          size="icon"
          variant="outline"
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full shadow"
        >
          <ChevronRight />
        </Button>
      </div>

      {/* ================= MAIN SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= CHART ================= */}
        <Card className="lg:col-span-2 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Total Investment</h2>
              <Button variant="outline" size="sm">Last 7 Days</Button>
            </div>

            <div className="flex gap-16 mb-8">
              <div>
                <p className="text-sm text-muted-foreground">Invested Value</p>
                <p className="text-lg font-bold">
                  $1,279.95 <span className="text-green-500 text-sm">▲ 1.22%</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Returns</p>
                <p className="text-lg font-bold">
                  $22,543.87 <span className="text-green-500 text-sm">▲ 10.14%</span>
                </p>
              </div>
            </div>

            {/* IMAGE-MATCHING AREA CHART */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ left: -10, right: 10 }}>
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="4 8"
                    vertical={false}
                    stroke="#e5e7eb"
                    opacity={0.6}
                  />

                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis hide domain={[28, 40]} />

                  <Tooltip
                    cursor={{ stroke: "#e5e7eb", strokeDasharray: "3 6" }}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #e5e7eb",
                      fontSize: 12,
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#chartFill)"
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ================= MY STOCKS ================= */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">My Stocks</h2>
              <Button variant="outline" size="sm">Monthly</Button>
            </div>

            <div className="space-y-5">
              {topCards.slice(0, 6).map((stock, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold">
                      {stock.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium leading-none">{stock.name}</p>
                      <p className="text-sm text-muted-foreground">{20 + i * 5} Shares</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">${stock.value}</p>
                    <p
                      className={`flex items-center justify-end text-sm ${
                        stock.change > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stock.change > 0 ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {Math.abs(stock.change)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
