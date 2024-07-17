import { useFetchAdminPropertiesAnalysisQuery } from "@/api/services/admin.service";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  LineChart,
  Line,
  LabelList,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "gray",
  "tomato",
  "",
];

const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
].map((month) => month.slice(0, 3));

const ChartContainer = () => {
  const {
    data: analysis,
    isLoading,
    isError,
  } = useFetchAdminPropertiesAnalysisQuery();

  if (isLoading) {
    return;
  }
  if (isError) {
    return <div>Some Error Occured</div>;
  }

  if (
    !analysis?.locationDistribution &&
    !analysis?.propertyStatusDistribution
  ) {
    return <div></div>;
  }

  const propertiesByMonthData = analysis?.propertiesByMonth?.map(
    (item: any, idx: number) => ({
      month: monthNames[idx],
      count: item.count,
    })
  );

  return (
    <div className="flex flex-col gap-6">
      {/* First col */}
      <div
        className="grid grid-flow-row sm:grid-cols-2 lg:grid-cols-3 gap-4"
        data-aos="fade-up"
        data-aos-delay={100}
      >
        <div className="rounded-lg bg-background py-4 px-6">
          <h2>Property Type Distribution</h2>
          <div className="flex flex-col gap-2 items-center md:items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analysis.propertyTypeDistribution}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {analysis.propertyTypeDistribution.map(
                    (itm: any, index: any) => (
                      <Cell
                        key={index + itm._id}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {analysis.propertyTypeDistribution.map(
                (itm: any, index: number) => (
                  <div
                    key={itm._id + index}
                    style={{ background: `${COLORS[index]}` }}
                    className="px-3 py-1 rounded-md "
                  >
                    {itm._id}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-background py-4 px-6">
          <h2>Property Status Distribution</h2>
          <div className="flex flex-col gap-2 items-center md:items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analysis.propertyStatusDistribution}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {analysis.propertyStatusDistribution.map(
                    (itm: any, index: any) => (
                      <Cell
                        key={index + itm._id}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-2">
              {analysis.propertyStatusDistribution.map(
                (itm: any, index: number) => (
                  <div
                    key={itm._id + index}
                    style={{ background: `${COLORS[index]}` }}
                    className="px-3 py-1 rounded-md "
                  >
                    {itm._id}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-background py-4 px-6">
          <h2>Location Distribution</h2>
          <div className="flex flex-col gap-2 items-center md:items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analysis.locationDistribution}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {analysis.locationDistribution.map((itm: any, index: any) => (
                    <Cell key={index + itm._id} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-2">
              {analysis.locationDistribution.map((itm: any, index: number) => (
                <div
                  key={itm._id + index}
                  style={{ background: `${COLORS[index]}` }}
                  className="px-3 py-1 rounded-md "
                >
                  {itm._id}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Second col */}
      <div className="w-full flex flex-col gap-4 overflow-x-scroll rounded-lg bg-background py-4 pr-6">
        <h2 className="pl-6">Properties Posted by Month</h2>
        <div className="min-w-[600px]">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={propertiesByMonthData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: "#8884d8" }} />
              <YAxis tick={{ fill: "#8884d8" }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              >
                <LabelList
                  dataKey="month"
                  position="top"
                  style={{ fill: "#8884d8", fontWeight: "bold" }}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;
