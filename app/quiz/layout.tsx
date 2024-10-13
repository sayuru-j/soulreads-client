export default function Layout({
  children,
}: {
  children: React.ReactNode;
  types: string;
}) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
