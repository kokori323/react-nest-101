// src/pages/RegistrationPage.tsx

import RegistrantForm from "../components/RegistrantForm";
import RegistrantTable from "../components/RegistrantTable";
import { useAuth } from "../context/AuthContext";
import "./RegistrationPage.css";

export default function RegistrationPage() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="registration-page">
      <div className="registration-container">
        {isLoggedIn && (
          <section className="registration-form-section">
            <RegistrantForm />
          </section>
        )}

        <section className="registration-table-section">
          <div className="section-header">
            <h2 className="section-title">👥 ผู้ลงทะเบียนล่าสุด</h2>
          </div>
          <RegistrantTable />
        </section>
      </div>
    </div>
  );
}
