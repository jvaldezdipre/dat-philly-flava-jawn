import "@/styles/index.css";

export const metadata = {
  title: "DaPhillyFlavaJawn",
  description: "Real Philly Water Ice. Served in Columbia, SC.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
