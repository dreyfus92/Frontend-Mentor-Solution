import "./globals.css";
import "@fontsource/nunito/300.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/800.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon-32x32.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
