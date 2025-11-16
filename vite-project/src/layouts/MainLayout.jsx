import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
