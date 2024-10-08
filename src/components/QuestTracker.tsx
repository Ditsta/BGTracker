import React, { useEffect } from 'react'
import { CheckCircle, XCircle, Lock, Unlock } from 'lucide-react'
import { Quest } from '../types'

interface QuestTrackerProps {
  quests: Quest[]
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>
  campaignName: string
}

const QuestTracker: React.FC<QuestTrackerProps> = ({ quests, setQuests, campaignName }) => {
  useEffect(() => {
    console.log('Quests in QuestTracker:', quests)
  }, [quests])

  const toggleQuestStatus = (id: number, status: 'isUnlocked' | 'isCompleted' | 'isExpired') => {
    setQuests(quests.map(quest =>
      quest.id === id ? { ...quest, [status]: !quest[status] } : quest
    ))
  }

  if (quests.length === 0) {
    return <div>No quests available. Please check if quests are being loaded correctly.</div>
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quest Tracker</h2>
      <div className="space-y-4">
        {quests.map((quest) => (
          <div key={quest.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{quest.id} - {quest.name}</h3>
            <p className="text-gray-600">Monster Element: {quest.monsterElement}</p>
            <p className="text-gray-600">Monster Trophy: {quest.monsterTrophy}</p>
            <div className="mt-2 flex space-x-2">
              <button
                className={`p-2 rounded ${quest.isUnlocked ? 'bg-green-100' : 'bg-red-100'}`}
                onClick={() => toggleQuestStatus(quest.id, 'isUnlocked')}
                title={quest.isUnlocked ? "Unlocked" : "Locked"}
              >
                {quest.isUnlocked ? (
                  <Unlock className="text-green-500" />
                ) : (
                  <Lock className="text-red-500" />
                )}
              </button>
              <button
                className={`p-2 rounded ${quest.isCompleted ? 'bg-green-100' : 'bg-red-100'}`}
                onClick={() => toggleQuestStatus(quest.id, 'isCompleted')}
                title={quest.isCompleted ? "Completed" : "Not Completed"}
              >
                {quest.isCompleted ? (
                  <CheckCircle className="text-green-500" />
                ) : (
                  <XCircle className="text-red-500" />
                )}
              </button>
              <button
                className={`p-2 rounded ${quest.isExpired ? 'bg-red-100' : 'bg-green-100'}`}
                onClick={() => toggleQuestStatus(quest.id, 'isExpired')}
                title={quest.isExpired ? "Expired" : "Not Expired"}
              >
                {quest.isExpired ? (
                  <XCircle className="text-red-500" />
                ) : (
                  <CheckCircle className="text-green-500" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestTracker