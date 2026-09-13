import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-soft p-4">
      <div className="text-center space-y-4">
        <h1 className="font-heading font-extrabold text-7xl text-rose-600">403</h1>
        <h2 className="font-heading font-bold text-2xl text-brand-dark">Restricted Portal Area</h2>
        <p className="text-gray-600">You do not have the required role privileges to view this section.</p>
        <Link to="/login" className="btn-primary text-sm !py-2.5 !px-6">Sign In with Permitted Account</Link>
      </div>
    </div>
  );
}
