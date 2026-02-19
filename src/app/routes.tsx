import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import UserDashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CookiesPage from "./pages/CookiesPage";
import LoginPage from "./pages/LoginPage";

function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-20">
      <div className="text-center">
        <h1
          className="font-['Poppins'] text-[72px] text-[#2563EB]"
          style={{ fontWeight: 700 }}
        >
          404
        </h1>
        <p className="text-[20px] text-[#6B7280]">Page not found</p>
        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-[#2563EB] px-8 py-3 text-white"
          style={{ fontWeight: 600 }}
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "search", Component: SearchPage },
      { path: "property/:id", Component: PropertyDetailsPage },
      { path: "dashboard", Component: UserDashboard },
      { path: "owner-dashboard", Component: OwnerDashboard },
      { path: "login", Component: LoginPage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
      { path: "blog", Component: BlogPage },
      { path: "privacy", Component: PrivacyPage },
      { path: "terms", Component: TermsPage },
      { path: "cookies", Component: CookiesPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
