export const metadata = {
  title: "Manager Dashboard | Artistly",
  description:
    "Manage artist applications, view stats, and track platform performance on the Artistly manager dashboard.",
};
export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
