import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ChangePasswordModal from "./ChangePasswordModal";

const ProtectedRoute = ({ role, children }) => {
  const { user, loading, fetchUser } = useContext(AuthContext);
  const [, setTick] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-soft">
        <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role && user.role !== "admin") return <Navigate to="/unauthorized" replace />;

  // First-login gate: admin-created accounts get a constant default password and
  // must set their own password before they can use the portal.
  if (user.mustChangePassword) {
    return (
      <div className="min-h-screen bg-brand-soft">
        <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 text-center">
          <h1 className="font-heading text-xl font-extrabold text-brand-dark">
            Set a new password
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your account was created with a default password. Please choose a
            new password to continue.
          </p>
        </div>

        <ChangePasswordModal
          open
          dismissable={false}
          title="First Login — Set Password"
          subtitle="Replace the default password with your own."
          onChanged={async () => {
            await fetchUser();
            setTick((t) => t + 1);
          }}
        />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
