import { useState } from 'react';
import { createCategory } from '../../api/categoryApi';

export default function Category() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(1);
  const [merchantId, setMerchantId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const newCategory = await createCategory({
        name,
        description,
        isActive,
        merchantId,
      });
      setMessage(`Category created with ID: ${newCategory.id}`);
    } catch {
      setMessage('Failed to create category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Active:</label>
        <select
          value={isActive}
          onChange={(e) => setIsActive(Number(e.target.value))}
        >
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>
      </div>
      <div>
        <label>Merchant ID:</label>
        <input
          type="number"
          value={merchantId}
          onChange={(e) => setMerchantId(Number(e.target.value))}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Category'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
