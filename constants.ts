
import { WorkoutPlan } from './types';

export const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: 'wp-1',
    title: 'Full Body Ignition',
    description: 'A high-intensity beginner routine to jumpstart your metabolism.',
    difficulty: 'beginner',
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    exercises: [
      { id: 'ex-1', name: 'Jumping Jacks', category: 'Cardio', sets: 3, reps: '45 sec', image: 'https://picsum.photos/400/300', description: 'Start with feet together and arms at sides. Jump to spread legs and bring arms above head.' },
      { id: 'ex-2', name: 'Push-ups', category: 'Strength', sets: 3, reps: '10-15', image: 'https://picsum.photos/400/301', description: 'Keep core tight, lower chest to floor, and push back up.' },
      { id: 'ex-3', name: 'Squats', category: 'Strength', sets: 3, reps: '15-20', image: 'https://picsum.photos/400/302', description: 'Sit back into hips, keeping knees over ankles and chest up.' }
    ]
  },
  {
    id: 'wp-2',
    title: 'Core Crusher Pro',
    description: 'Advanced abdominal conditioning for a rock-solid midsection.',
    difficulty: 'advanced',
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80',
    exercises: [
      { id: 'ex-4', name: 'Plank Hold', category: 'Core', sets: 3, reps: '60 sec', image: 'https://picsum.photos/400/303', description: 'Maintain a straight line from head to heels while resting on forearms.' },
      { id: 'ex-5', name: 'Leg Raises', category: 'Core', sets: 4, reps: '20', image: 'https://picsum.photos/400/304', description: 'Lay flat, lift legs to 90 degrees without bending knees.' }
    ]
  },
  {
    id: 'wp-3',
    title: 'Lean & Toned',
    description: 'Targeted intermediate movements for muscle definition.',
    difficulty: 'intermediate',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80',
    exercises: [
      { id: 'ex-6', name: 'Lunges', category: 'Legs', sets: 3, reps: '12 per leg', image: 'https://picsum.photos/400/305', description: 'Step forward and drop back knee towards the floor.' }
    ]
  }
];

export const MOCK_CHART_DATA = [
  { day: 'Mon', calories: 1800, weight: 82.5 },
  { day: 'Tue', calories: 2100, weight: 82.3 },
  { day: 'Wed', calories: 1600, weight: 82.2 },
  { day: 'Thu', calories: 1950, weight: 82.0 },
  { day: 'Fri', calories: 2300, weight: 81.8 },
  { day: 'Sat', calories: 2500, weight: 81.9 },
  { day: 'Sun', calories: 1800, weight: 81.7 },
];
