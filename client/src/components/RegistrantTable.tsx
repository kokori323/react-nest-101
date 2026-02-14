// src/components/RegistrantTable.tsx
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useEffect, useState, useMemo } from "react";
import { getRegistrants, getRegistrantCount } from "../api/registrants";
import { getSettings } from "../api/settings";
import { useAuth } from "../context/AuthContext";
import "./RegistrantTable.css";

interface Registrant {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const columnHelper = createColumnHelper<Registrant>();

export default function RegistrantTable() {
  const { user } = useAuth();
  const [registrants, setRegistrants] = useState<Registrant[]>([]);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // สำหรับแสดงผลในช่อง input ทันที
  const [search, setSearch] = useState(""); // สำหรับใช้กรองข้อมูล (หน่วงเวลา)
  const [totalSeats, setTotalSeats] = useState(0);

  const columns = useMemo(() => {
    const cols = [
      columnHelper.accessor("firstName", {
        header: "ชื่อ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("lastName", {
        header: "นามสกุล",
        cell: (info) => info.getValue(),
      }),
    ];

    if (user?.role === "admin") {
      cols.push(
        columnHelper.accessor("email", {
          header: "อีเมล",
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("phone", {
          header: "เบอร์โทร",
          cell: (info) => info.getValue(),
        })
      );
    }

    return cols;
  }, [user]);

  const load = async () => {
    try {
      const res = await getRegistrants();
      const counter = await getRegistrantCount();
      const settings = await getSettings();

      setRegistrants(res.items || []);
      setCount(counter);
      if (settings) {
        setTotalSeats(settings.totalSeats);
      }
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Debounce การค้นหา เพื่อไม่ให้กรองทุกครั้งที่พิมพ์
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filtered = useMemo(() => {
    return registrants.filter((r) =>
      `${r.firstName} ${r.lastName} ${user?.role === 'admin' ? (r.phone || '') : ''}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [registrants, search, user?.role]);

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="registrant-table-container premium-card">
      <div className="table-header">
        <div className="stats-container">
          <div className="stat-box blue">
            <span className="stat-value">{count}</span>
            <span className="stat-label">ลงทะเบียนแล้ว</span>
          </div>
          <div className="stat-box green">
            <span className="stat-value">{totalSeats - count}</span>
            <span className="stat-label">ที่นั่งว่าง</span>
          </div>
        </div>

        <div className="search-container">
          <input
            className="premium-input"
            placeholder="ค้นหาชื่อ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="premium-table">
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="header-content">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="empty-row">
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
