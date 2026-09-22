import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Filter, Layers, AlertCircle, Users, CheckCircle2 } from 'lucide-react';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';
import { JHARKHAND_DISTRICTS } from '../../data/mockData';

// Custom Leaflet Pin Marker Icons
const createCustomIcon = (colorHex) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="background-color: ${colorHex}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px;">•</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'CRITICAL': return '#B91C1C';
    case 'HIGH': return '#D97706';
    case 'MEDIUM': return '#0F766E';
    default: return '#64748B';
  }
};

// District Coordinates Center Map Matrix for Jharkhand
const DISTRICT_COORDINATES = {
  "Ranchi": [23.3441, 85.3096],
  "Dumka": [24.2676, 87.2498],
  "East Singhbhum": [22.8046, 86.2029],
  "Dhanbad": [23.7957, 86.4304],
  "Hazaribagh": [23.9925, 85.3637],
  "Bokaro": [23.6693, 86.1511],
  "Deoghar": [24.4826, 86.6960],
  "Giridih": [24.1868, 86.3023],
  "Ramgarh": [23.6300, 85.5147],
  "Palamu": [24.0379, 84.0722],
  "Gumla": [23.0428, 84.5422],
  "West Singhbhum": [22.5638, 85.8118],
  "Sahebganj": [25.2425, 87.6419],
  "Chatra": [24.2144, 84.8722],
  "Garhwa": [24.1620, 83.8078],
  "Godda": [24.8291, 87.2081],
  "Jamtara": [23.9632, 86.8016],
  "Khunti": [23.0754, 85.2787],
  "Koderma": [24.4674, 85.5938],
  "Latehar": [23.7436, 84.5028],
  "Lohardaga": [23.4372, 84.6806],
  "Pakur": [24.6366, 87.8480],
  "Saraikela Kharsawan": [22.7001, 85.9281],
  "Simdega": [22.6146, 84.5085]
};

export const JharkhandMap = ({ problems = [] }) => {
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProblems = problems.filter(prob => {
    if (selectedDistrict !== 'All' && prob.district !== selectedDistrict) return false;
    if (selectedPriority !== 'All' && prob.priority !== selectedPriority) return false;
    if (selectedCategory !== 'All' && prob.category !== selectedCategory) return false;
    return true;
  });

  const centerCoordinates = [23.6102, 85.2799]; // Center of Jharkhand

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden space-y-4 p-6">
      
      {/* Map Control Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#0F766E]/10 text-[#0F766E] text-xs font-black px-2.5 py-0.5 rounded-md border border-[#0F766E]/20 uppercase">
              INTERACTIVE GIS MAP
            </span>
            <span className="text-xs font-bold text-slate-500">Jharkhand State Spatial Distribution</span>
          </div>
          <h3 className="text-xl font-black text-[#0F2747]">Societal Problem Map Tracker</h3>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* District Filter */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-[#0F2747] focus:ring-2 focus:ring-[#0F766E]"
          >
            <option value="All">All Districts ({problems.length})</option>
            {JHARKHAND_DISTRICTS.map(dist => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-[#0F2747] focus:ring-2 focus:ring-[#0F766E]"
          >
            <option value="All">All Priorities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Leaflet Map Rendering Area */}
      <div className="h-[450px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative">
        <MapContainer 
          center={centerCoordinates} 
          zoom={8} 
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredProblems.map((prob) => {
            const distCoords = DISTRICT_COORDINATES[prob.district] || [23.3441 + (Math.random() - 0.5) * 0.5, 85.3096 + (Math.random() - 0.5) * 0.5];
            const markerLat = prob.latitude || distCoords[0] + (Math.random() - 0.5) * 0.1;
            const markerLng = prob.longitude || distCoords[1] + (Math.random() - 0.5) * 0.1;
            const markerIcon = createCustomIcon(getPriorityColor(prob.priority));

            return (
              <Marker key={prob.id} position={[markerLat, markerLng]} icon={markerIcon}>
                <Popup>
                  <div className="p-2 space-y-2 max-w-xs">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1">
                      <span className="font-mono text-[10px] font-bold text-slate-500">#{prob.id}</span>
                      <PriorityBadge priority={prob.priority} />
                    </div>
                    
                    <h4 className="font-extrabold text-xs text-[#0F2747] leading-tight">{prob.title}</h4>
                    
                    <div className="text-[11px] text-slate-600 space-y-1">
                      <p className="flex items-center gap-1 font-semibold">
                        <MapPin className="w-3 h-3 text-[#0F766E]" /> {prob.village || prob.district}, Jharkhand
                      </p>
                      <p className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-amber-600" /> {prob.affectedPeople} Citizens Affected
                      </p>
                    </div>

                    <div className="pt-1 flex items-center justify-between">
                      <StatusBadge status={prob.status} />
                      <a 
                        href={`/problem/${prob.id}`} 
                        className="text-[11px] font-bold text-[#0F766E] hover:underline"
                      >
                        View Details →
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Map Legend Footer */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 gap-3">
        <span className="font-bold text-[#0F2747]">Priority Color Legend:</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-700"></span> Critical</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-600"></span> High</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#0F766E]"></span> Medium</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-500"></span> Low</span>
        </div>
        <span className="font-semibold text-slate-500">Showing {filteredProblems.length} plotted reports</span>
      </div>
    </div>
  );
};
