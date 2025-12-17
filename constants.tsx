
import { Lesson } from './types';

export const LESSONS: Lesson[] = [
  {
    id: 'greetings',
    title: 'Hello & Bye!',
    frenchTitle: 'Salutations',
    icon: '👋',
    color: 'bg-pink-400',
    items: [
      { english: 'Hello', french: 'Bonjour', imageUrl: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=300&h=300&fit=crop' },
      { english: 'Goodbye', french: 'Au revoir', imageUrl: 'https://images.unsplash.com/photo-1526666923127-b2970f64514f?w=300&h=300&fit=crop' },
      { english: 'Thank you', french: 'Merci', imageUrl: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=300&h=300&fit=crop' },
      { english: 'Happy', french: 'Content', imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&h=300&fit=crop' }
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
      { english: 'Green', french: 'Vert', imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=300&h=300&fit=crop' },
      { english: 'Black', french: 'Noir', imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=300&h=300&fit=crop' },
      { english: 'White', french: 'Blanc', imageUrl: 'https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=300&h=300&fit=crop' }
    ]
  },
  {
    id: 'numbers',
    title: 'Numbers',
    frenchTitle: 'Les Chiffres',
    icon: '🔢',
    color: 'bg-blue-400',
    items: [
      { english: 'One', french: 'Un', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&h=300&fit=crop&q=1' },
      { english: 'Two', french: 'Deux', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&h=300&fit=crop&q=2' },
      { english: 'Three', french: 'Trois', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&h=300&fit=crop&q=3' },
      { english: 'Four', french: 'Quatre', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&h=300&fit=crop&q=4' },
      { english: 'Five', french: 'Cinq', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&h=300&fit=crop&q=5' },
      { english: 'Six', french: 'Six', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&h=300&fit=crop&q=6' },
      { english: 'Seven', french: 'Sept', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&h=300&fit=crop&q=7' },
      { english: 'Eight', french: 'Huit', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&h=300&fit=crop&q=8' },
      { english: 'Nine', french: 'Neuf', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&h=300&fit=crop&q=9' },
      { english: 'Ten', french: 'Dix', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&h=300&fit=crop&q=10' }
    ]
  },
  {
    id: 'animals',
    title: 'Animals',
    frenchTitle: 'Les Animaux',
    icon: '🐶',
    color: 'bg-orange-400',
    items: [
      { english: 'Dog', french: 'Chien', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop' },
      { english: 'Cat', french: 'Chat', imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop' },
      { english: 'Lion', french: 'Lion', imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=300&h=300&fit=crop' },
      { english: 'Elephant', french: 'Éléphant', imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=300&h=300&fit=crop' },
      { english: 'Monkey', french: 'Singe', imageUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=300&h=300&fit=crop' },
      { english: 'Rabbit', french: 'Lapin', imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&h=300&fit=crop' },
      { english: 'Bird', french: 'Oiseau', imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?w=300&h=300&fit=crop' },
      { english: 'Cow', french: 'Vache', imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=300&h=300&fit=crop' }
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
      { english: 'Milk', french: 'Lait', imageUrl: 'https://images.unsplash.com/photo-1563636619-e9107da4a1bb?w=300&h=300&fit=crop' },
      { english: 'Cookie', french: 'Biscuit', imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=300&fit=crop' },
      { english: 'Robot', french: 'Robot', imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?w=300&h=300&fit=crop' },
      { english: 'Doll', french: 'Poupée', imageUrl: 'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?w=300&h=300&fit=crop' },
      { english: 'Car', french: 'Voiture', imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=300&h=300&fit=crop' }
    ]
  },
  {
    id: 'body',
    title: 'My Body',
    frenchTitle: 'Le Corps',
    icon: '🖐️',
    color: 'bg-yellow-400',
    items: [
      { english: 'Head', french: 'Tête', imageUrl: 'https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?w=300&h=300&fit=crop' },
      { english: 'Eyes', french: 'Yeux', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop' },
      { english: 'Hands', french: 'Mains', imageUrl: 'https://images.unsplash.com/photo-1515511856280-7b23f68d2996?w=300&h=300&fit=crop' },
      { english: 'Feet', french: 'Pieds', imageUrl: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=300&h=300&fit=crop' }
    ]
  }
];

export const SONGS = [
  { id: 'abc', title: 'The ABC Song', icon: '🎵', color: 'bg-purple-400' },
  { id: 'wheels', title: 'Wheels on the Bus', icon: '🚌', color: 'bg-yellow-500' },
  { id: 'twinkle', title: 'Twinkle Twinkle', icon: '⭐', color: 'bg-indigo-400' },
  { id: 'happy', title: 'If You\'re Happy', icon: '😊', color: 'bg-green-400' },
  { id: 'macdonald', title: 'Old MacDonald', icon: '🚜', color: 'bg-red-400' },
  { id: 'shark', title: 'Baby Shark', icon: '🦈', color: 'bg-blue-300' }
];
