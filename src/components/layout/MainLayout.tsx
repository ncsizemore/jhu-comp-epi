import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({
  children,
  editorial = false,
  className = "",
}: {
  children: React.ReactNode;
  editorial?: boolean;
  className?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className={`flex-grow${editorial ? " cipher-site" : ""}`}
      >
        {editorial ? <div className={className}>{children}</div> : children}
      </main>
      <Footer />
    </div>
  );
}
