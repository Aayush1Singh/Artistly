export function FilterBlock({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Location"
        className="border p-2 rounded"
        onChange={(e) =>
          setFilters((f) => ({ ...f, location: e.target.value }))
        }
      />
      <select
        onChange={(e) =>
          setFilters((f) => ({ ...f, category: e.target.value }))
        }
        className="border p-2 rounded"
      >
        <option value="">All Categories</option>
        <option value="Singer">Singer</option>
        <option value="Dancer">Dancer</option>
        <option value="DJ">DJ</option>
      </select>
    </div>
  );
}
