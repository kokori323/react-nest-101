import { useState, useEffect } from "react";
import { createRegistrant } from "../api/registrants";
import { getRemainingSeats } from "../api/settings";
import "./RegistrantForm.css";

export default function RegistrantForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [remaining, setRemaining] = useState<number | null>(null);

  const fetchRemaining = async () => {
    try {
      const r = await getRemainingSeats();
      setRemaining(r);
    } catch (err) {
      console.error("Failed to fetch remaining seats", err);
    }
  };

  useEffect(() => {
    fetchRemaining();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (remaining !== null && remaining <= 0) {
      alert("ขออภัย ที่นั่งเต็มแล้ว");
      return;
    }
    try {
      await createRegistrant(form);
      alert("ลงทะเบียนสำเร็จ!");
      setForm({ firstName: "", lastName: "", email: "", phone: "" });
      fetchRemaining();
      window.location.reload(); 
    } catch (err: any) {
      alert(err.response?.data?.message || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="registrant-form-container premium-card">
      <div className="form-header">
        <h2 className="form-title">ลงทะเบียนเข้าร่วมงาน</h2>
        <p className="form-subtitle">กรุณากรอกข้อมูลให้ครบถ้วนเพื่อสำรองที่นั่ง</p>
        {remaining !== null && (
          <div className={`seat-badge ${remaining > 0 ? 'available' : 'full'}`}>
            {remaining > 0 ? `เหลือที่นั่งว่าง ${remaining} ที่` : 'ที่นั่งเต็มแล้ว'}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="premium-form">
        <div className="form-grid">
          <div className="form-group">
            <label>ชื่อ</label>
            <input
              name="firstName"
              placeholder="กรอกชื่อ"
              value={form.firstName}
              onChange={handleChange}
              className="premium-input"
              required
            />
          </div>
          <div className="form-group">
            <label>นามสกุล</label>
            <input
              name="lastName"
              placeholder="กรอกนามสกุล"
              value={form.lastName}
              onChange={handleChange}
              className="premium-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>อีเมล</label>
          <input
            name="email"
            type="email"
            placeholder="example@mail.com"
            value={form.email}
            onChange={handleChange}
            className="premium-input"
            required
          />
        </div>

        <div className="form-group">
          <label>เบอร์โทรศัพท์</label>
          <input
            name="phone"
            type="text"
            placeholder="08XXXXXXXX"
            value={form.phone}
            onChange={handleChange}
            className="premium-input"
            required
          />
        </div>

        <button 
          type="submit"
          disabled={remaining !== null && remaining <= 0}
          className={`premium-button submit-btn ${remaining !== null && remaining <= 0 ? 'disabled' : ''}`}
        >
          {remaining !== null && remaining <= 0 ? 'ที่นั่งเต็มแล้ว' : 'ลงทะเบียนตอนนี้'}
        </button>
      </form>
    </div>
  );
}
