import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-soft p-4">
      <div className="text-center space-y-4">
        <h1 className="font-heading font-extrabold text-7xl text-brand-dark">404</h1>
        <p className="text-gray-600">The medical resource or page you requested could not be located.</p>
        <Link to="/" className="btn-primary text-sm !py-2.5 !px-6">Return to Home</Link>
      </div>
    </div>
  );
}
