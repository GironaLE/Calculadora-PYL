import { useState } from 'react';

export default function TechosRegistrables() {
  const [superficie, setSuperficie] = useState(100);
  const [formato, setFormato] = useState('600x600');

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Techos Registrables
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border p-6 max-w-md">
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Superficie (m²)
          </label>

          <input
            type="number"
            value={superficie}
            onChange={(e) =>
              setSuperficie(Number(e.target.value))
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Formato
          </label>

          <select
            value={formato}
            onChange={(e) => setFormato(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="600x600">
              600 x 600
            </option>

            <option value="1200x600">
              1200 x 600
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
