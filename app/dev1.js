"use client";
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { ...formData };
    setDataList(prevState => [...prevState, newData]);
    setFormData({
      name: '',
      phone: '',
      email: ''
    });
  };

  const handleDelete = (index) => {
    setDataList(prevState => prevState.filter((_, i) => i !== index));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = dataList.filter(data => {
    return data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           data.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
           data.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col mb-4">
          <label className="mb-2">ชื่อ:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="p-2 border border-gray-300 rounded" />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2">เบอร์โทรศัพท์:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="p-2 border border-gray-300 rounded" />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2">อีเมล:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">บันทึก</button>
      </form>
      <div className="mb-4">
        <input type="text" placeholder="ค้นหา" value={searchTerm} onChange={handleSearch} className="p-2 border border-gray-300 rounded" />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ชื่อ</th>
            <th className="px-4 py-2">เบอร์โทรศัพท์</th>
            <th className="px-4 py-2">อีเมล</th>
            <th className="px-4 py-2">ดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{data.name}</td>
              <td className="border px-4 py-2">{data.phone}</td>
              <td className="border px-4 py-2">{data.email}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
