import { CreateShortUrl, UrlTable, UsageBar } from "../components/dashboard";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <UsageBar />
      <CreateShortUrl />
      <UrlTable />
    </div>
  );
};
