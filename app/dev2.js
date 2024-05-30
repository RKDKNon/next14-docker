"use client";
import { useState, useEffect } from "react";

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
  const [selectedGeography, setSelectedGeography] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [amphurses, setAmphurses] = useState([]);
  const [selectedAmphurse, setSelectedAmphurse] = useState([]);
  const [ambons, setAmbons] = useState([]);
  const [selectedAmbons, setSelectedAmbons] = useState([]);

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
        // console.log('data', data.provinces)
        setProvinces(data.provinces);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    const getAmphurse = async () => {
      try {
        const data = await fetchAmphurse();
        // console.log('data', data.amphurse)
        setAmphurses(data.amphurse);
      } catch (error) {
        console.error("Error fetching amphurse:", error);
      }
    };

    const getAmbons = async () => {
      try {
        const data = await fetchAmbons();
        console.log("data", data.ambons);
        setAmbons(data.ambons);
      } catch (error) {
        console.error("Error fetching amphurse:", error);
      }
    };

    getGeographies();
    getProvinces();
    getAmphurse();
    getAmbons();
  }, []);

  const handleGeographyChange = (event) => {
    const selectedValue = event.target.value;
    const selectedObject = JSON.parse(selectedValue);
    console.log("selectedObject", selectedObject);
    setSelectedGeography(selectedObject);

    console.log("Selected Geography:", selectedObject);
  };
  const handleProvinceChange = (event) => {
    const selectedValue = event.target.value;
    const selectedObject = JSON.parse(selectedValue);

    setSelectedProvinces(selectedObject);

    console.log("Selected Province:", selectedObject);
  };
  const handleAmphurseChange = (event) => {
    const selectedValue = event.target.value;
    const selectedObject = JSON.parse(selectedValue);

    setSelectedAmphurse(selectedObject);

    console.log("Selected Amphurse:", selectedObject);
  };
  const handleAmbonsChange = (event) => {
    const selectedValue = event.target.value;
    const selectedObject = JSON.parse(selectedValue);

    setSelectedAmbons(selectedObject);

    console.log("Selected Ambons:", selectedObject);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl mb-4">
        ทดสอบเล่นกับ Array ภูมิภาค จังหวัด อำเภอ ตำบล
      </h2>
      <select
        className="border border-gray-300 rounded-lg p-2"
        onChange={handleGeographyChange}
      >
        <option value="">เลือกภูมิภาค</option>
        {geographies.map((geographie) => (
          <option key={geographie.id} value={JSON.stringify(geographie)}>
            {geographie.name}
          </option>
        ))}
      </select>
      <div className="mt-4">
        <p>
          คุณเลือกภูมิภาค:{" "}
          {selectedGeography ? selectedGeography.name : "ยังไม่ได้เลือก"}
        </p>
        <p>
          ID ของภูมิภาค:{" "}
          {selectedGeography ? selectedGeography.id : "ยังไม่ได้เลือก"}
        </p>
      </div>
      <hr />
      <select
        className="border border-gray-300 rounded-lg p-2"
        onChange={handleProvinceChange}
      >
        <option value="">เลือกจังหวัด</option>
        {provinces.map((province) => (
          <option key={province.id} value={JSON.stringify(province)}>
            {province.name_th}
          </option>
        ))}
      </select>
      <div className="mt-4">
        <p>
          คุณเลือกจังหวัด:{" "}
          {selectedProvinces ? selectedProvinces.name_th : "ยังไม่ได้เลือก"}
        </p>
        <p>
          ID ของจังหวัด:{" "}
          {selectedProvinces ? selectedProvinces.id : "ยังไม่ได้เลือก"}
        </p>
      </div>
      <hr />

      <select
        className="border border-gray-300 rounded-lg p-2"
        onChange={handleAmphurseChange}
      >
        <option value="">เลือกอำเภอ</option>
        {amphurses.map((item) => (
          <option key={item.id} value={JSON.stringify(item)}>
            {item.name_th}
          </option>
        ))}
      </select>

      <div className="mt-4">
        <p>
          คุณเลือกอำเภอ:{" "}
          {selectedAmphurse ? selectedAmphurse.name_th : "ยังไม่ได้เลือก"}
        </p>
        <p>
          ID ของอำเภอ:{" "}
          {selectedAmphurse ? selectedAmphurse.id : "ยังไม่ได้เลือก"}
        </p>
      </div>
      <hr />

      <select
        className="border border-gray-300 rounded-lg p-2"
        onChange={handleAmbonsChange}
      >
        <option value="">เลือกตำบล</option>
        {ambons.map((item) => (
          <option key={item.id} value={JSON.stringify(item)}>
            {item.name_th}
          </option>
        ))}
      </select>
      <div className="mt-4">
        <p>
          คุณเลือกตำบล:{" "}
          {selectedAmbons ? selectedAmbons.name_th : "ยังไม่ได้เลือก"}
        </p>
        <p>
          ID ของตำบล: {selectedAmbons ? selectedAmbons.id : "ยังไม่ได้เลือก"}
        </p>
      </div>
      <hr />
    </div>
  );
}
