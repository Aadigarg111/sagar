// Mock data for SAGAR Platform Demo
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  reputation: number;
  avatar?: string;
  joinDate: Date;
}

export interface Report {
  id: number;
  type: 'flood' | 'storm' | 'erosion' | 'pollution' | 'tsunami' | 'cyclone' | 'high_tide' | 'oil_spill' | 'beach_closure' | 'coastal_landslide';
  location: { lat: number; lng: number; address: string };
  description: string;
  timestamp: Date;
  verified: boolean;
  reporter: User;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'verified' | 'resolved' | 'false_alarm';
  images?: string[];
  upvotes: number;
  downvotes: number;
}

export interface Alert {
  id: number;
  type: 'weather' | 'emergency' | 'evacuation' | 'safety' | 'tsunami' | 'cyclone' | 'flood_warning' | 'beach_closure';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  coordinates: { lat: number; lng: number };
  title: string;
  description: string;
  timestamp: Date;
  verified: boolean;
  status: 'active' | 'resolved' | 'expired';
  affectedArea: number; // in km²
  estimatedImpact: number; // number of people
}

export interface Prediction {
  id: number;
  type: 'flood_risk' | 'tsunami_probability' | 'cyclone_intensity' | 'storm_surge' | 'erosion_rate' | 'high_tide_warning';
  location: { lat: number; lng: number; address: string };
  confidence: number; // 0-100
  probability: number; // 0-100
  timeframe: '24h' | '3d' | '1w' | '1m';
  description: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
}

export interface Analytics {
  totalReports: number;
  verifiedReports: number;
  activeAlerts: number;
  predictionsGenerated: number;
  userEngagement: number;
  responseTime: number; // in minutes
  accuracy: number; // percentage
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@sagar.gov.in',
    role: 'admin',
    reputation: 1250,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    joinDate: new Date('2023-01-15')
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    role: 'moderator',
    reputation: 890,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: new Date('2023-03-20')
  },
  {
    id: 3,
    name: 'Anita Patel',
    email: 'anita.patel@example.com',
    role: 'user',
    reputation: 450,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    joinDate: new Date('2023-06-10')
  },
  {
    id: 4,
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    role: 'user',
    reputation: 320,
    joinDate: new Date('2023-08-05')
  }
];

// Mock Reports - Coastal Focus
export const mockReports: Report[] = [
  {
    id: 1,
    type: 'flood',
    location: { lat: 13.0827, lng: 80.2707, address: 'Marina Beach, Chennai' },
    description: 'Heavy flooding observed near Marina Beach due to high tide and heavy rainfall. Water level rising rapidly.',
    timestamp: new Date('2024-01-15T14:30:00'),
    verified: true,
    reporter: mockUsers[2],
    severity: 'high',
    status: 'verified',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop'
    ],
    upvotes: 45,
    downvotes: 2
  },
  {
    id: 2,
    type: 'erosion',
    location: { lat: 19.0760, lng: 72.8777, address: 'Juhu Beach, Mumbai' },
    description: 'Severe coastal erosion observed. Beach area reduced by 15 meters in past month.',
    timestamp: new Date('2024-01-15T16:45:00'),
    verified: true,
    reporter: mockUsers[1],
    severity: 'high',
    status: 'verified',
    images: ['https://images.unsplash.com/photo-1506905925346-04b8e4686397?w=400&h=300&fit=crop'],
    upvotes: 23,
    downvotes: 1
  },
  {
    id: 3,
    type: 'storm',
    location: { lat: 22.5726, lng: 88.3639, address: 'Digha Beach, West Bengal' },
    description: 'Strong coastal storm with 8-foot waves. Beach access restricted for safety.',
    timestamp: new Date('2024-01-15T18:20:00'),
    verified: true,
    reporter: mockUsers[3],
    severity: 'medium',
    status: 'verified',
    upvotes: 12,
    downvotes: 0
  },
  {
    id: 4,
    type: 'pollution',
    location: { lat: 12.9716, lng: 77.5946, address: 'Kovalam Beach, Kerala' },
    description: 'Oil spill detected near Kovalam Beach. Marine life affected. Cleanup operations initiated.',
    timestamp: new Date('2024-01-15T19:10:00'),
    verified: true,
    reporter: mockUsers[0],
    severity: 'critical',
    status: 'verified',
    upvotes: 34,
    downvotes: 3
  },
  {
    id: 5,
    type: 'high_tide',
    location: { lat: 28.7041, lng: 77.1025, address: 'Chandrabhaga Beach, Odisha' },
    description: 'Unusually high tide causing flooding in beachside properties. Water level 2 meters above normal.',
    timestamp: new Date('2024-01-15T20:00:00'),
    verified: true,
    reporter: mockUsers[1],
    severity: 'high',
    status: 'verified',
    images: ['https://images.unsplash.com/photo-1506905925346-04b8e4686397?w=400&h=300&fit=crop'],
    upvotes: 67,
    downvotes: 1
  },
  {
    id: 6,
    type: 'cyclone',
    location: { lat: 15.9129, lng: 80.1864, address: 'Bhimunipatnam Beach, Andhra Pradesh' },
    description: 'Cyclone warning issued. Coastal areas evacuated. Wind speeds reaching 120 km/h.',
    timestamp: new Date('2024-01-15T21:15:00'),
    verified: true,
    reporter: mockUsers[2],
    severity: 'critical',
    status: 'verified',
    upvotes: 89,
    downvotes: 2
  },
  {
    id: 7,
    type: 'tsunami',
    location: { lat: 11.2588, lng: 75.7804, address: 'Kozhikode Beach, Kerala' },
    description: 'Tsunami warning after undersea earthquake. Coastal areas on high alert.',
    timestamp: new Date('2024-01-15T22:30:00'),
    verified: true,
    reporter: mockUsers[0],
    severity: 'critical',
    status: 'verified',
    upvotes: 156,
    downvotes: 1
  },
  {
    id: 8,
    type: 'beach_closure',
    location: { lat: 18.5204, lng: 73.8567, address: 'Alibaug Beach, Maharashtra' },
    description: 'Beach closed due to dangerous rip currents. Multiple rescue operations conducted.',
    timestamp: new Date('2024-01-15T23:45:00'),
    verified: true,
    reporter: mockUsers[3],
    severity: 'high',
    status: 'verified',
    upvotes: 45,
    downvotes: 0
  },
  {
    id: 9,
    type: 'erosion',
    location: { lat: 20.2961, lng: 85.8245, address: 'Puri Beach, Odisha' },
    description: 'Rapid beach erosion threatening temple structures. Emergency measures needed.',
    timestamp: new Date('2024-01-16T01:20:00'),
    verified: false,
    reporter: mockUsers[1],
    severity: 'high',
    status: 'pending',
    upvotes: 78,
    downvotes: 3
  },
  {
    id: 10,
    type: 'flood',
    location: { lat: 16.1667, lng: 81.1333, address: 'Kakinada Beach, Andhra Pradesh' },
    description: 'Flash flood from heavy rains inundating coastal settlements. Relief operations underway.',
    timestamp: new Date('2024-01-16T02:10:00'),
    verified: true,
    reporter: mockUsers[2],
    severity: 'high',
    status: 'verified',
    upvotes: 92,
    downvotes: 1
  },
  {
    id: 11,
    type: 'oil_spill',
    location: { lat: 19.2183, lng: 72.9781, address: 'Versova Beach, Mumbai' },
    description: 'Oil spill from cargo ship affecting 2km of coastline. Marine cleanup teams deployed.',
    timestamp: new Date('2024-01-16T03:30:00'),
    verified: true,
    reporter: mockUsers[0],
    severity: 'critical',
    status: 'verified',
    upvotes: 134,
    downvotes: 2
  },
  {
    id: 12,
    type: 'storm',
    location: { lat: 14.4225, lng: 74.4414, address: 'Gokarna Beach, Karnataka' },
    description: 'Severe coastal storm with 10-foot waves. Beach huts damaged. Tourists evacuated.',
    timestamp: new Date('2024-01-16T04:45:00'),
    verified: true,
    reporter: mockUsers[3],
    severity: 'high',
    status: 'verified',
    upvotes: 67,
    downvotes: 1
  },
  {
    id: 13,
    type: 'pollution',
    location: { lat: 17.6868, lng: 83.2185, address: 'Rushikonda Beach, Visakhapatnam' },
    description: 'Plastic waste accumulation on beach. Cleanup drive organized by local community.',
    timestamp: new Date('2024-01-16T05:15:00'),
    verified: false,
    reporter: mockUsers[1],
    severity: 'medium',
    status: 'pending',
    upvotes: 23,
    downvotes: 0
  },
  {
    id: 14,
    type: 'high_tide',
    location: { lat: 21.1458, lng: 72.7612, address: 'Dandi Beach, Gujarat' },
    description: 'Spring tide causing flooding in low-lying coastal areas. Salt pans affected.',
    timestamp: new Date('2024-01-16T06:20:00'),
    verified: true,
    reporter: mockUsers[2],
    severity: 'medium',
    status: 'verified',
    upvotes: 34,
    downvotes: 1
  },
  {
    id: 15,
    type: 'coastal_landslide',
    location: { lat: 15.2993, lng: 74.1240, address: 'Anjuna Beach, Goa' },
    description: 'Coastal cliff collapse near Anjuna Beach. Road access blocked. No casualties.',
    timestamp: new Date('2024-01-16T07:30:00'),
    verified: true,
    reporter: mockUsers[0],
    severity: 'high',
    status: 'verified',
    upvotes: 56,
    downvotes: 2
  },
  {
    id: 16,
    type: 'cyclone',
    location: { lat: 12.9141, lng: 74.8560, address: 'Malpe Beach, Karnataka' },
    description: 'Cyclone approaching from Arabian Sea. Fishing boats called back to shore.',
    timestamp: new Date('2024-01-16T08:45:00'),
    verified: true,
    reporter: mockUsers[3],
    severity: 'high',
    status: 'verified',
    upvotes: 89,
    downvotes: 1
  },
  {
    id: 17,
    type: 'flood',
    location: { lat: 10.8505, lng: 76.2711, address: 'Cherai Beach, Kerala' },
    description: 'Heavy monsoon rains causing coastal flooding. Backwater levels rising rapidly.',
    timestamp: new Date('2024-01-16T09:10:00'),
    verified: true,
    reporter: mockUsers[1],
    severity: 'high',
    status: 'verified',
    upvotes: 45,
    downvotes: 0
  },
  {
    id: 18,
    type: 'erosion',
    location: { lat: 20.2961, lng: 85.8245, address: 'Konark Beach, Odisha' },
    description: 'Beach erosion threatening UNESCO World Heritage Sun Temple. Emergency protection needed.',
    timestamp: new Date('2024-01-16T10:25:00'),
    verified: true,
    reporter: mockUsers[2],
    severity: 'critical',
    status: 'verified',
    upvotes: 178,
    downvotes: 3
  },
  {
    id: 19,
    type: 'beach_closure',
    location: { lat: 18.5204, lng: 73.8567, address: 'Kashid Beach, Maharashtra' },
    description: 'Beach closed due to jellyfish bloom. Swimming prohibited for safety.',
    timestamp: new Date('2024-01-16T11:40:00'),
    verified: true,
    reporter: mockUsers[0],
    severity: 'medium',
    status: 'verified',
    upvotes: 28,
    downvotes: 1
  },
  {
    id: 20,
    type: 'tsunami',
    location: { lat: 13.0827, lng: 80.2707, address: 'Mahabalipuram Beach, Tamil Nadu' },
    description: 'Tsunami warning after earthquake in Andaman Sea. Coastal evacuation in progress.',
    timestamp: new Date('2024-01-16T12:55:00'),
    verified: true,
    reporter: mockUsers[3],
    severity: 'critical',
    status: 'verified',
    upvotes: 203,
    downvotes: 1
  },
  {
    id: 21,
    type: 'storm',
    location: { lat: 16.1667, lng: 81.1333, address: 'Ramakrishna Beach, Visakhapatnam' },
    description: 'Severe thunderstorm with lightning strikes near beach. Tourists advised to seek shelter.',
    timestamp: new Date('2024-01-16T13:15:00'),
    verified: true,
    reporter: mockUsers[1],
    severity: 'high',
    status: 'verified',
    upvotes: 67,
    downvotes: 2
  },
  {
    id: 22,
    type: 'pollution',
    location: { lat: 19.2183, lng: 72.9781, address: 'Aksa Beach, Mumbai' },
    description: 'Sewage discharge into sea causing water contamination. Beach water quality poor.',
    timestamp: new Date('2024-01-16T14:30:00'),
    verified: true,
    reporter: mockUsers[2],
    severity: 'high',
    status: 'verified',
    upvotes: 89,
    downvotes: 4
  },
  {
    id: 23,
    type: 'high_tide',
    location: { lat: 15.9129, lng: 80.1864, address: 'Rishikonda Beach, Andhra Pradesh' },
    description: 'King tide causing flooding in beachside resorts. Guests relocated to safer areas.',
    timestamp: new Date('2024-01-16T15:45:00'),
    verified: true,
    reporter: mockUsers[0],
    severity: 'medium',
    status: 'verified',
    upvotes: 42,
    downvotes: 1
  },
  {
    id: 24,
    type: 'cyclone',
    location: { lat: 11.2588, lng: 75.7804, address: 'Bekal Beach, Kerala' },
    description: 'Cyclone intensifying over Arabian Sea. Coastal areas preparing for landfall.',
    timestamp: new Date('2024-01-16T16:20:00'),
    verified: true,
    reporter: mockUsers[3],
    severity: 'critical',
    status: 'verified',
    upvotes: 156,
    downvotes: 2
  },
  {
    id: 25,
    type: 'erosion',
    location: { lat: 22.5726, lng: 88.3639, address: 'Tajpur Beach, West Bengal' },
    description: 'Rapid beach erosion threatening coastal road. Traffic diverted to alternative route.',
    timestamp: new Date('2024-01-16T17:35:00'),
    verified: false,
    reporter: mockUsers[1],
    severity: 'high',
    status: 'pending',
    upvotes: 73,
    downvotes: 1
  }
];

// Mock Alerts - Coastal Focus
export const mockAlerts: Alert[] = [
  {
    id: 1,
    type: 'cyclone',
    severity: 'high',
    location: 'Chennai and surrounding coastal areas',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    title: 'Cyclone Warning - Heavy Rains Expected',
    description: 'Cyclone approaching from Bay of Bengal. Heavy rains and strong winds expected for next 48 hours. Stay indoors and avoid coastal areas.',
    timestamp: new Date('2024-01-15T12:00:00'),
    verified: true,
    status: 'active',
    affectedArea: 150,
    estimatedImpact: 500000
  },
  {
    id: 2,
    type: 'tsunami',
    severity: 'critical',
    location: 'Mumbai Coastal Areas',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    title: 'Tsunami Warning - Coastal Evacuation',
    description: 'Tsunami warning issued after undersea earthquake. All coastal areas evacuated. Emergency services deployed. Updates every 15 minutes.',
    timestamp: new Date('2024-01-15T15:30:00'),
    verified: true,
    status: 'active',
    affectedArea: 50,
    estimatedImpact: 200000
  },
  {
    id: 3,
    type: 'flood_warning',
    severity: 'high',
    location: 'Kerala Coastal Districts',
    coordinates: { lat: 10.8505, lng: 76.2711 },
    title: 'Coastal Flood Warning',
    description: 'Heavy monsoon rains causing coastal flooding. Backwater levels rising rapidly. Avoid low-lying coastal areas.',
    timestamp: new Date('2024-01-15T18:00:00'),
    verified: true,
    status: 'active',
    affectedArea: 75,
    estimatedImpact: 300000
  },
  {
    id: 4,
    type: 'beach_closure',
    severity: 'medium',
    location: 'Goa Beaches',
    coordinates: { lat: 15.2993, lng: 74.1240 },
    title: 'Beach Closure - Dangerous Conditions',
    description: 'All beaches closed due to dangerous rip currents and high waves. Swimming strictly prohibited.',
    timestamp: new Date('2024-01-15T20:30:00'),
    verified: true,
    status: 'active',
    affectedArea: 25,
    estimatedImpact: 50000
  },
  {
    id: 5,
    type: 'evacuation',
    severity: 'critical',
    location: 'Odisha Coastal Areas',
    coordinates: { lat: 20.2961, lng: 85.8245 },
    title: 'Cyclone Evacuation Order',
    description: 'Super cyclone approaching. Mandatory evacuation of all coastal areas within 10km of shoreline.',
    timestamp: new Date('2024-01-15T22:00:00'),
    verified: true,
    status: 'active',
    affectedArea: 200,
    estimatedImpact: 800000
  }
];

// Mock Predictions - Coastal Focus
export const mockPredictions: Prediction[] = [
  {
    id: 1,
    type: 'flood_risk',
    location: { lat: 13.0827, lng: 80.2707, address: 'Chennai Coastal Areas' },
    confidence: 85,
    probability: 78,
    timeframe: '24h',
    description: 'High probability of coastal flooding due to heavy rainfall and high tide. Storm surge expected.',
    timestamp: new Date('2024-01-15T21:00:00'),
    severity: 'high',
    recommendations: [
      'Evacuate low-lying coastal areas',
      'Stock emergency supplies',
      'Avoid beach activities',
      'Monitor tide levels and weather updates'
    ]
  },
  {
    id: 2,
    type: 'tsunami_probability',
    location: { lat: 19.0760, lng: 72.8777, address: 'Mumbai Coastal Zone' },
    confidence: 72,
    probability: 45,
    timeframe: '3d',
    description: 'Elevated tsunami risk due to undersea seismic activity. Coastal areas on alert.',
    timestamp: new Date('2024-01-15T21:00:00'),
    severity: 'high',
    recommendations: [
      'Prepare evacuation routes',
      'Stock emergency supplies',
      'Avoid coastal activities',
      'Monitor official tsunami warnings'
    ]
  },
  {
    id: 3,
    type: 'cyclone_intensity',
    location: { lat: 22.5726, lng: 88.3639, address: 'West Bengal Coastal Areas' },
    confidence: 90,
    probability: 85,
    timeframe: '1w',
    description: 'Super cyclone forming in Bay of Bengal. Expected to intensify to Category 4-5.',
    timestamp: new Date('2024-01-15T21:00:00'),
    severity: 'critical',
    recommendations: [
      'Complete coastal evacuation',
      'Secure all coastal infrastructure',
      'Prepare emergency response teams',
      'Monitor cyclone track updates'
    ]
  },
  {
    id: 4,
    type: 'erosion_rate',
    location: { lat: 20.2961, lng: 85.8245, address: 'Puri-Konark Coast, Odisha' },
    confidence: 78,
    probability: 92,
    timeframe: '1m',
    description: 'Accelerated coastal erosion threatening heritage sites. Beach width reducing by 2-3 meters per month.',
    timestamp: new Date('2024-01-15T21:00:00'),
    severity: 'high',
    recommendations: [
      'Implement immediate protection measures',
      'Relocate vulnerable structures',
      'Install erosion control barriers',
      'Monitor erosion patterns continuously'
    ]
  },
  {
    id: 5,
    type: 'storm_surge',
    location: { lat: 10.8505, lng: 76.2711, address: 'Kerala Coastal Districts' },
    confidence: 82,
    probability: 68,
    timeframe: '24h',
    description: 'Storm surge warning for Kerala coast. Water levels may rise 3-4 meters above normal.',
    timestamp: new Date('2024-01-15T21:00:00'),
    severity: 'high',
    recommendations: [
      'Evacuate low-lying coastal settlements',
      'Move fishing boats to safer harbors',
      'Secure coastal infrastructure',
      'Prepare for power outages'
    ]
  },
  {
    id: 6,
    type: 'high_tide_warning',
    location: { lat: 15.2993, lng: 74.1240, address: 'Goa Coastal Areas' },
    confidence: 95,
    probability: 88,
    timeframe: '24h',
    description: 'Spring tide with king tide conditions. Beach flooding expected during high tide periods.',
    timestamp: new Date('2024-01-15T21:00:00'),
    severity: 'medium',
    recommendations: [
      'Avoid beach activities during high tide',
      'Move vehicles from beach parking',
      'Monitor tide charts',
      'Prepare for minor coastal flooding'
    ]
  }
];

// Mock Analytics
export const mockAnalytics: Analytics = {
  totalReports: 1247,
  verifiedReports: 892,
  activeAlerts: 8,
  predictionsGenerated: 156,
  userEngagement: 94.2,
  responseTime: 12.5,
  accuracy: 87.3
};

// Mock Statistics for Dashboard
export const mockStats = {
  reportsToday: 23,
  alertsActive: 8,
  predictionsGenerated: 12,
  responseTime: '12.5 min',
  accuracy: '87.3%',
  userEngagement: '94.2%',
  reportsThisWeek: 156,
  reportsThisMonth: 647,
  verifiedThisWeek: 134,
  falseAlarmsThisWeek: 8
};

// Mock Chart Data
export const mockChartData = {
  reportsOverTime: [
    { date: '2024-01-09', reports: 45, verified: 38 },
    { date: '2024-01-10', reports: 52, verified: 44 },
    { date: '2024-01-11', reports: 38, verified: 32 },
    { date: '2024-01-12', reports: 61, verified: 51 },
    { date: '2024-01-13', reports: 47, verified: 39 },
    { date: '2024-01-14', reports: 55, verified: 46 },
    { date: '2024-01-15', reports: 42, verified: 35 }
  ],
  reportTypes: [
    { type: 'Flood', count: 234, color: '#3B82F6' },
    { type: 'Erosion', count: 189, color: '#EF4444' },
    { type: 'Storm', count: 156, color: '#F59E0B' },
    { type: 'Pollution', count: 134, color: '#8B5CF6' },
    { type: 'Tsunami', count: 89, color: '#10B981' },
    { type: 'Cyclone', count: 67, color: '#06B6D4' },
    { type: 'High Tide', count: 45, color: '#F97316' },
    { type: 'Oil Spill', count: 23, color: '#84CC16' },
    { type: 'Beach Closure', count: 18, color: '#EC4899' },
    { type: 'Coastal Landslide', count: 12, color: '#6366F1' }
  ],
  severityDistribution: [
    { severity: 'Critical', count: 12, color: '#DC2626' },
    { severity: 'High', count: 45, color: '#EA580C' },
    { severity: 'Medium', count: 123, color: '#D97706' },
    { severity: 'Low', count: 234, color: '#16A34A' }
  ]
};
