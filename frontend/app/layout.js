
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className=''
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
