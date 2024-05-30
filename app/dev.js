"use client";
import { useState, useEffect } from "react";
import Select from 'react-select';

async function fetchGeographies() {
  const response = await fetch("http://localhost:3000/api-geographies");
  if (!response.ok) {
    throw new Error("cannot fetch geographies");
  } else {
    const data = await response.json();
    return data;
  }
}

async function fetchProvinces() {
  const response = await fetch("http://localhost:3000/api-provinces");
  if (!response.ok) {
    throw new Error("cannot fetch provinces");
  } else {
    const data = await response.json();
    return data;
  }
}

async function fetchAmphurse() {
  const response = await fetch("http://localhost:3000/api-amphurse");
  if (!response.ok) {
    throw new Error("cannot fetch amphurse");
  } else {
    const data = await response.json();
    return data;
  }
}

async function fetchAmbons() {
  const response = await fetch("http://localhost:3000/api-ambons");
  if (!response.ok) {
    throw new Error("cannot fetch ambons");
  } else {
    const data = await response.json();
    return data;
  }
}

export default function Home() {
  const [geographies, setGeographies] = useState([]);
  const [selectedGeography, setSelectedGeography] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState(null);
  const [amphurses, setAmphurses] = useState([]);
  const [filteredAmphurses, setFilteredAmphurses] = useState([]);
  const [selectedAmphurse, setSelectedAmphurse] = useState(null);
  const [ambons, setAmbons] = useState([]);
  const [filteredAmbons, setFilteredAmbons] = useState([]);
  const [selectedAmbons, setSelectedAmbons] = useState(null);

  useEffect(() => {
    const getGeographies = async () => {
      try {
        const data = await fetchGeographies();
        setGeographies(data.geographies);
      } catch (error) {
        console.error("Error fetching geographies:", error);
      }
    };
    const getProvinces = async () => {
      try {
        const data = await fetchProvinces();
        setProvinces(data.provinces);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    const getAmphurse = async () => {
      try {
        const data = await fetchAmphurse();
        setAmphurses(data.amphurse);
      } catch (error) {
        console.error("Error fetching amphurse:", error);
      }
    };

    const getAmbons = async () => {
      try {
        const data = await fetchAmbons();
        setAmbons(data.ambons);
      } catch (error) {
        console.error("Error fetching ambons:", error);
      }
    };

    getGeographies();
    getProvinces();
    getAmphurse();
    getAmbons();
  }, []);

  const handleGeographyChange = (selectedOption) => {
    setSelectedGeography(selectedOption);
    // กรองจังหวัดตามภูมิภาคที่เลือก
    const filteredProvinces = provinces.filter(province => province.geography_id === selectedOption.value);
    setFilteredProvinces(filteredProvinces);
    setSelectedProvinces(null);
    setFilteredAmphurses([]);
    setSelectedAmphurse(null);
    setFilteredAmbons([]);
    setSelectedAmbons(null);
  };

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvinces(selectedOption);
    // กรองอำเภอตามจังหวัดที่เลือก
    const filteredAmphurses = amphurses.filter(amphurse => amphurse.province_id === selectedOption.value);
    setFilteredAmphurses(filteredAmphurses);
    setSelectedAmphurse(null);
    setFilteredAmbons([]);
    setSelectedAmbons(null);
  };

  const handleAmphurseChange = (selectedOption) => {
    setSelectedAmphurse(selectedOption);
    // กรองตำบลตามอำเภอที่เลือก
    console.log('ambons', ambons)
    const filteredAmbons = ambons.filter(ambon => ambon.amphure_id === selectedOption.value);
    console.log('filteredAmbons', filteredAmbons)
    setFilteredAmbons(filteredAmbons);
    setSelectedAmbons(null);
  };

  const handleAmbonsChange = (selectedOption) => {
    setSelectedAmbons(selectedOption);
  };

  const geographyOptions = geographies.map((geographie) => ({
    value: geographie.id,
    label: geographie.name
  }));

  const provinceOptions = filteredProvinces.map((province) => ({
    value: province.id,
    label: province.name_th
  }));

  const amphurseOptions = filteredAmphurses.map((item) => ({
    value: item.id,
    label: item.name_th
  }));

  const ambonsOptions = filteredAmbons.map((item) => ({
    value: item.id,
    label: item.name_th,
    zip_code: item.zip_code
  }));

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl mb-4">
        ทดสอบเล่นกับ Array ภูมิภาค จังหวัด อำเภอ ตำบล
      </h2>
      <Select
        className="w-64 mb-4"
        value={selectedGeography}
        onChange={handleGeographyChange}
        options={geographyOptions}
        placeholder="เลือกภูมิภาค"
      />
      <div className="mt-4">
        <p>คุณเลือกภูมิภาค: {selectedGeography ? selectedGeography.label : "ยังไม่ได้เลือก"}</p>
        <p>ID ของภูมิภาค: {selectedGeography ? selectedGeography.value : "ยังไม่ได้เลือก"}</p>
      </div>
      <hr />
      <Select
        className="w-64 mb-4"
        value={selectedProvinces}
        onChange={handleProvinceChange}
        options={provinceOptions}
        placeholder="เลือกจังหวัด"
        isDisabled={!selectedGeography}
      />
      <div className="mt-4">
        <p>คุณเลือกจังหวัด: {selectedProvinces ? selectedProvinces.label : "ยังไม่ได้เลือก"}</p>
        <p>ID ของจังหวัด: {selectedProvinces ? selectedProvinces.value : "ยังไม่ได้เลือก"}</p>
      </div>
      <hr />
      <Select
        className="w-64 mb-4"
        value={selectedAmphurse}
        onChange={handleAmphurseChange}
        options={amphurseOptions}
        placeholder="เลือกอำเภอ"
        isDisabled={!selectedProvinces}
      />
      <div className="mt-4">
        <p>คุณเลือกอำเภอ: {selectedAmphurse ? selectedAmphurse.label : "ยังไม่ได้เลือก"}</p>
        <p>ID ของอำเภอ: {selectedAmphurse ? selectedAmphurse.value : "ยังไม่ได้เลือก"}</p>
      </div>
      <hr />
      <Select
        className="w-64 mb-4"
        value={selectedAmbons}
        onChange={handleAmbonsChange}
        options={ambonsOptions}
        placeholder="เลือกตำบล"
        isDisabled={!selectedAmphurse}
      />
      <div className="mt-4">
        <p>คุณเลือกตำบล: {selectedAmbons ? selectedAmbons.label : "ยังไม่ได้เลือก"}</p>
        <p>รหัสไปรษณีย์: {selectedAmbons ? selectedAmbons.zip_code : "ยังไม่ได้เลือก"}</p>
        <p>ID ของตำบล: {selectedAmbons ? selectedAmbons.value : "ยังไม่ได้เลือก"}</p>
      </div>
      <hr />
    </div>
  );
}
