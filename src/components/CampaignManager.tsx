import React, { useState, useEffect } from 'react'
import { Users, Compass, Backpack } from 'lucide-react'
import CharacterTracker from './CharacterTracker'
import QuestTracker from './QuestTracker'
import ResourceTracker from './ResourceTracker'
import { defaultQuests } from '../data/questData'
import { Character, Quest, Resource } from '../types'

interface CampaignManagerProps {
  campaignName: string
}

const CampaignManager: React.FC<CampaignManagerProps> = ({ campaignName }) => {
  const [activeTab, setActiveTab] = useState('characters')
  const [characters, setCharacters] = useState<Character[]>([])
  const [quests, setQuests] = useState<Quest[]>([])
  const [resources, setResources] = useState<Resource[]>([])

  useEffect(() => {
    console.log('CampaignManager useEffect triggered')
    const savedCharacters = localStorage.getItem(`${campaignName}-characters`)
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters))
    }
    const savedQuests = localStorage.getItem(`${campaignName}-quests`)
    if (savedQuests) {
      console.log('Loading saved quests:', JSON.parse(savedQuests))
      setQuests(JSON.parse(savedQuests))
    } else {
      console.log('No saved quests, using default quests:', defaultQuests)
      setQuests(defaultQuests)
    }
    const savedResources = localStorage.getItem(`${campaignName}-resources`)
    if (savedResources) {
      setResources(JSON.parse(savedResources))
    }
  }, [campaignName])

  useEffect(() => {
    localStorage.setItem(`${campaignName}-characters`, JSON.stringify(characters))
  }, [campaignName, characters])

  useEffect(() => {
    if (quests.length > 0) {  // Only save if quests are loaded
      console.log('Saving quests to localStorage:', quests)
      localStorage.setItem(`${campaignName}-quests`, JSON.stringify(quests))
    }
  }, [campaignName, quests])

  useEffect(() => {
    localStorage.setItem(`${campaignName}-resources`, JSON.stringify(resources))
  }, [campaignName, resources])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Campaign: {campaignName}</h2>
      <nav className="bg-indigo-500 text-white mb-4">
        <ul className="flex">
          <li>
            <button
              className={`flex items-center px-4 py-2 ${activeTab === 'characters' ? 'bg-indigo-700' : ''}`}
              onClick={() => setActiveTab('characters')}
            >
              <Users className="mr-2" /> Characters
            </button>
          </li>
          <li>
            <button
              className={`flex items-center px-4 py-2 ${activeTab === 'quests' ? 'bg-indigo-700' : ''}`}
              onClick={() => setActiveTab('quests')}
            >
              <Compass className="mr-2" /> Quests
            </button>
          </li>
          <li>
            <button
              className={`flex items-center px-4 py-2 ${activeTab === 'resources' ? 'bg-indigo-700' : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              <Backpack className="mr-2" /> Resources
            </button>
          </li>
        </ul>
      </nav>
      {activeTab === 'characters' && (
        <CharacterTracker
          characters={characters}
          setCharacters={setCharacters}
          campaignName={campaignName}
        />
      )}
      {activeTab === 'quests' && (
        <QuestTracker
          quests={quests}
          setQuests={setQuests}
          campaignName={campaignName}
        />
      )}
      {activeTab === 'resources' && (
        <ResourceTracker
          resources={resources}
          setResources={setResources}
          campaignName={campaignName}
        />
      )}
    </div>
  )
}

export default CampaignManager