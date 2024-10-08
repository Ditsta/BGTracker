import React, { useState } from 'react'
import { Sword, Users, Compass, Backpack, PlusCircle } from 'lucide-react'
import CampaignManager from './components/CampaignManager'

function App() {
  const [campaigns, setCampaigns] = useState<string[]>([])
  const [activeCampaign, setActiveCampaign] = useState<string | null>(null)
  const [newCampaignName, setNewCampaignName] = useState('')

  const addCampaign = () => {
    if (newCampaignName && !campaigns.includes(newCampaignName)) {
      setCampaigns([...campaigns, newCampaignName])
      setActiveCampaign(newCampaignName)
      setNewCampaignName('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-indigo-600 text-white p-4">
        <h1 className="text-2xl font-bold">Primal: The Awakening Campaign Tracker</h1>
      </header>
      <main className="flex-grow p-4">
        {activeCampaign ? (
          <CampaignManager campaignName={activeCampaign} />
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Select or Create a Campaign</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="New Campaign Name"
                className="border p-2 mr-2"
                value={newCampaignName}
                onChange={(e) => setNewCampaignName(e.target.value)}
              />
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded inline-flex items-center"
                onClick={addCampaign}
              >
                <PlusCircle className="mr-2" /> Create Campaign
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns.map((campaign) => (
                <button
                  key={campaign}
                  className="bg-white p-4 rounded shadow hover:bg-indigo-100"
                  onClick={() => setActiveCampaign(campaign)}
                >
                  {campaign}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
      {activeCampaign && (
        <footer className="bg-indigo-600 text-white p-2 text-center">
          <button onClick={() => setActiveCampaign(null)} className="underline">
            Back to Campaign Selection
          </button>
        </footer>
      )}
    </div>
  )
}

export default App