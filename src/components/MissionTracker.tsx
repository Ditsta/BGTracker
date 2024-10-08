import React, { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

interface Mission {
  id: number
  name: string
  description: string
  completed: boolean
}

interface MissionTrackerProps {
  missions: Mission[]
  setMissions: React.Dispatch<React.SetStateAction<Mission[]>>
  campaignName: string
}

const MissionTracker: React.FC<MissionTrackerProps> = ({ missions, setMissions, campaignName }) => {
  const [newMission, setNewMission] = useState({ name: '', description: '' })

  const addMission = () => {
    setMissions([...missions, { ...newMission, id: Date.now(), completed: false }])
    setNewMission({ name: '', description: '' })
  }

  const toggleMissionStatus = (id: number) => {
    setMissions(missions.map(mission =>
      mission.id === id ? { ...mission, completed: !mission.completed } : mission
    ))
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mission Tracker</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Mission Name"
          className="border p-2 mr-2"
          value={newMission.name}
          onChange={(e) => setNewMission({ ...newMission, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mission Description"
          className="border p-2 mr-2"
          value={newMission.description}
          onChange={(e) => setNewMission({ ...newMission, description: e.target.value })}
        />
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded"
          onClick={addMission}
        >
          Add Mission
        </button>
      </div>
      <div className="space-y-4">
        {missions.map((mission) => (
          <div key={mission.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{mission.name}</h3>
              <p className="text-gray-600">{mission.description}</p>
            </div>
            <button
              className={`p-2 rounded ${mission.completed ? 'bg-green-100' : 'bg-red-100'}`}
              onClick={() => toggleMissionStatus(mission.id)}
            >
              {mission.completed ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <XCircle className="text-red-500" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MissionTracker