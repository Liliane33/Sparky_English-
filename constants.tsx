
import { Lesson, Song } from './types.ts';

export const LESSONS: Lesson[] = [
  {
    id: 'greetings',
    title: 'Hello & Bye!',
    frenchTitle: 'Salutations',
    icon: '👋',
    color: 'bg-pink-400',
    items: [
      { english: 'Hello', french: 'Bonjour', imageUrl: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=300&h=300&fit=crop', audioUrl: 'https://www.google.com/logos/fnbx/animal_sounds/dog.mp3' }, // Placeholder for speech
      { english: 'Goodbye', french: 'Au revoir', imageUrl: 'https://images.unsplash.com/photo-1526666923127-b2970f64514f?w=300&h=300&fit=crop' },
      { english: 'Thank you', french: 'Merci', imageUrl: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=300&h=300&fit=crop' }
    ]
  },
  {
    id: 'colors',
    title: 'Colors',
    frenchTitle: 'Les Couleurs',
    icon: '🎨',
    color: 'bg-red-400',
    items: [
      { english: 'Red', french: 'Rouge', imageUrl: 'https://images.unsplash.com/photo-1541336315124-8909bac6078e?w=300&h=300&fit=crop' },
      { english: 'Blue', french: 'Bleu', imageUrl: 'https://images.unsplash.com/photo-1523450001312-daa4e2e17f36?w=300&h=300&fit=crop' },
      { english: 'Yellow', french: 'Jaune', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=300&fit=crop' },
      { english: 'Green', french: 'Vert', imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=300&h=300&fit=crop' }
    ]
  },
  {
    id: 'animals',
    title: 'Animals',
    frenchTitle: 'Les Animaux',
    icon: '🐶',
    color: 'bg-orange-400',
    items: [
      { english: 'Dog', french: 'Chien', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop', audioUrl: 'https://www.google.com/logos/fnbx/animal_sounds/dog.mp3' },
      { english: 'Cat', french: 'Chat', imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop', audioUrl: 'https://www.google.com/logos/fnbx/animal_sounds/cat.mp3' },
      { english: 'Lion', french: 'Lion', imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=300&h=300&fit=crop', audioUrl: 'https://www.google.com/logos/fnbx/animal_sounds/lion.mp3' },
      { english: 'Elephant', french: 'Éléphant', imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=300&h=300&fit=crop', audioUrl: 'https://www.google.com/logos/fnbx/animal_sounds/elephant.mp3' },
      { english: 'Monkey', french: 'Singe', imageUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=300&h=300&fit=crop', audioUrl: 'https://www.google.com/logos/fnbx/animal_sounds/monkey.mp3' }
    ]
  },
  {
    id: 'food',
    title: 'Eat & Play',
    frenchTitle: 'Objets & Nourriture',
    icon: '🍎',
    color: 'bg-green-400',
    items: [
      { english: 'Apple', french: 'Pomme', imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop' },
      { english: 'Banana', french: 'Banane', imageUrl: 'https://images.unsplash.com/photo-1571771894821-ad9902d83f4e?w=300&h=300&fit=crop' },
      { english: 'Pizza', french: 'Pizza', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop' },
      { english: 'Cookie', french: 'Biscuit', imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=300&fit=crop' }
    ]
  }
];

export const SONGS: Song[] = [
  { id: 'abc', title: 'The ABC Song', icon: '🎵', color: 'bg-purple-400', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'wheels', title: 'Wheels on the Bus', icon: '🚌', color: 'bg-yellow-500', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'twinkle', title: 'Twinkle Twinkle', icon: '⭐', color: 'bg-indigo-400', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'shark', title: 'Baby Shark', icon: '🦈', color: 'bg-blue-300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
];
