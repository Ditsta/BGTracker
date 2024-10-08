import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface Resource {
  id: number
  name: string
  quantity: number
}

interface ResourceTrackerProps {
  resources: Resource[]
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>
  campaignName: string
}

const ResourceTracker: React.FC<ResourceTrackerProps> = ({ resources, setResources, campaignName }) => {
  const [newResource, setNewResource] = useState({ name: '', quantity: 0 })

  const addResource = () => {
    setResources([...resources, { ...newResource, id: Date.now() }])
    setNewResource({ name: '', quantity: 0 })
  }

  const updateResourceQuantity = (id: number, change: number) => {
    setResources(resources.map(resource =>
      resource.id === id ? { ...resource, quantity: Math.max(0, resource.quantity + change) } : resource
    ))
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Resource Tracker</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Resource Name"
          className="border p-2 mr-2"
          value={newResource.name}
          onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="border p-2 mr-2"
          value={newResource.quantity}
          onChange={(e) => setNewResource({ ...newResource, quantity: parseInt(e.target.value) || 0 })}
        />
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded"
          onClick={addResource}
        >
          Add Resource
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{resource.name}</h3>
            <div className="flex items-center justify-between mt-2">
              <button
                className="bg-red-100 p-2 rounded"
                onClick={() => updateResourceQuantity(resource.id, -1)}
              >
                <Minus className="text-red-500" />
              </button>
              <span className="text-xl font-bold">{resource.quantity}</span>
              <button
                className="bg-green-100 p-2 rounded"
                onClick={() => updateResourceQuantity(resource.id, 1)}
              >
                <Plus className="text-green-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResourceTracker