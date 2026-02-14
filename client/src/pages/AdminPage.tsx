import { useState, useEffect } from "react";
import RegistrantTable from "../components/RegistrantTable";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { getSettings, updateSettings } from "../api/settings";
import "./AdminPage.css";

export default function AdminPage() {
  const { isLoggedIn, user } = useAuth();
  const [totalSeats, setTotalSeats] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getSettings();
        if (settings) {
          setTotalSeats(settings.totalSeats);
        }
      } catch (err) {
        console.error("Failed to fetch settings", err);
      }
    };
    if (isLoggedIn && user?.role === 'admin') {
      fetchSettings();
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn) return <Navigate to="/login" />;
  if (user?.role !== 'admin') return <Navigate to="/" />;

  const handleUpdateSeats = async () => {
    setIsSaving(true);
    try {
      await updateSettings({ totalSeats });
      alert("อัปเดตจำนวนที่นั่งสำเร็จ!");
      window.location.reload();
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการอัปเดต");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">จัดการที่นั่งและข้อมูลผู้ลงทะเบียน</p>
      </div>

      <div className="admin-content">
        <div className="settings-section premium-card">
          <h2 className="section-title">⚙️ การตั้งค่าระบบ</h2>
          <div className="settings-form">
            <div className="form-group">
              <label>จำนวนที่นั่งทั้งหมด</label>
              <input
                type="number"
                value={totalSeats}
                onChange={(e) => setTotalSeats(parseInt(e.target.value) || 0)}
                className="premium-input"
              />
            </div>
            <button
              onClick={handleUpdateSeats}
              disabled={isSaving}
              className={`premium-button save-btn ${isSaving ? 'disabled' : ''}`}
            >
              {isSaving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
            </button>
          </div>
        </div>

        <div className="table-section">
          <h2 className="section-title">📊 รายชื่อผู้ลงทะเบียน</h2>
          <RegistrantTable />
        </div>
      </div>
    </div>
  );
}
