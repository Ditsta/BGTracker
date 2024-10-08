import React, { useState } from 'react'
import { Sword, Shield, Heart } from 'lucide-react'

interface Character {
  id: number
  name: string
  class: string
  materials: { name: string; amount: number }[]
  plants: { name: string; amount: number }[]
  elements: { name: string; amount: number }[]
  skills: { name: string; isLearned: boolean }[]
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
    materials: [],
    plants: [],
    elements: [],
    skills: [],
  })

  const addCharacter = () => {
    if (characters.length < 4) {
      // Add the character with default values for materials, plants, elements, and skills
      setCharacters([...characters, { 
        ...newCharacter, 
        id: Date.now(),
        materials: newCharacter.materials.length > 0 ? newCharacter.materials : [{ name: "bones", amount: 1 }],
        plants: newCharacter.plants.length > 0 ? newCharacter.plants : [{ name: "nillea", amount: 2 }],
        elements: newCharacter.elements.length > 0 ? newCharacter.elements : [{ name: "Fire", amount: 4 }],
        skills: newCharacter.skills.length > 0 ? newCharacter.skills : [{ name: "A1", isLearned: false }]
      }])
  
      // Reset newCharacter state after adding the character
      setNewCharacter({ 
        name: '', 
        class: '', 
        materials: [{ name: "bones", amount: 1 }], 
        plants: [{ name: "nillea", amount: 2 }], 
        elements: [{ name: "Fire", amount: 4 }], 
        skills: [{ name: "A1", isLearned: false }]
      })
    } else {
      alert('Maximum of 4 characters reached for this campaign.')
    }
  }

  const modifyCharacterAmount = (characterId: number, type: 'materials' | 'plants' | 'elements', index: number, amountChange: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === characterId
          ? {
              ...character,
              [type]: character[type].map((item, itemIndex) =>
                itemIndex === index
                  ? { ...item, amount: Math.max(0, item.amount + amountChange) } // Ensure amount doesn't go below 0
                  : item
              ),
            }
          : character
      )
    );
  };

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
              {character.materials.map((material, materialIndex) => (
              <div key={materialIndex} className="flex items-center">
                <p>Material: {material.name} (Amount: {material.amount})</p>
                <button
                  className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => modifyCharacterAmount(character.id, 'materials', materialIndex, 1)}
                >
                  +
                </button>
                <button
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => modifyCharacterAmount(character.id, 'materials', materialIndex, -1)}
                >
                  -
                </button>
              </div>
              ))}
              
              {character.plants.map((plant, plantIndex) => (
                <div key={plantIndex} className="flex items-center">
                  <p>Plant: {plant.name} (Amount: {plant.amount})</p>
                  <button
                    className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                    onClick={() => modifyCharacterAmount(character.id, 'plants', plantIndex, 1)}
                  >
                    +
                  </button>
                  <button
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => modifyCharacterAmount(character.id, 'plants', plantIndex, -1)}
                  >
                    -
                  </button>
                </div>
              ))}

              {/* Elements */}
              {character.elements.map((element, elementIndex) => (
                    <div key={elementIndex} className="flex items-center">
                      <p>Element: {element.name} (Amount: {element.amount})</p>
                      <button
                        className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                        onClick={() => modifyCharacterAmount(character.id, 'elements', elementIndex, 1)}
                      >
                        +
                      </button>
                      <button
                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => modifyCharacterAmount(character.id, 'elements', elementIndex, -1)}
                      >
                        -
                      </button>
                    </div>
                    ))}

              {character.skills.map((skill, index) => (
                <p key={index} className="flex items-center">
                  Skill: {skill.name} (Learned: {skill.isLearned ? 'Yes' : 'No'})
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CharacterTracker