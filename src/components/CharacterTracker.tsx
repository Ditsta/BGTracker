import React, { useState } from 'react'
import { Sword, Shield, Heart } from 'lucide-react'

interface Character {
  id: number
  name: string
  class: string
  health: number
  attack: number
  defense: number
}

interface CharacterTrackerProps {
  characters: Character[]
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
  campaignName: string
}

const CharacterTracker: React.FC<CharacterTrackerProps> = ({ characters, setCharacters, campaignName }) => {
  const [newCharacter, setNewCharacter] = useState<Omit<Character, 'id'>>({
    name: '',
    class: '',
    health: 100,
    attack: 10,
    defense: 5
  })

  const addCharacter = () => {
    if (characters.length < 4) {
      setCharacters([...characters, { ...newCharacter, id: Date.now() }])
      setNewCharacter({ name: '', class: '', health: 100, attack: 10, defense: 5 })
    } else {
      alert('Maximum of 4 characters reached for this campaign.')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Character Tracker</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Character Name"
          className="border p-2 mr-2"
          value={newCharacter.name}
          onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Character Class"
          className="border p-2 mr-2"
          value={newCharacter.class}
          onChange={(e) => setNewCharacter({ ...newCharacter, class: e.target.value })}
        />
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded"
          onClick={addCharacter}
          disabled={characters.length >= 4}
        >
          Add Character
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((character) => (
          <div key={character.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{character.name}</h3>
            <p className="text-gray-600">{character.class}</p>
            <div className="mt-2">
              <p className="flex items-center">
                <Heart className="mr-2 text-red-500" /> Health: {character.health}
              </p>
              <p className="flex items-center">
                <Sword className="mr-2 text-blue-500" /> Attack: {character.attack}
              </p>
              <p className="flex items-center">
                <Shield className="mr-2 text-green-500" /> Defense: {character.defense}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CharacterTracker