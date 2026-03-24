export interface EVDatabaseEntry {
  id: string;
  make: string;
  model: string;
  year: number;
  batteryCapacity: number; // Net/Usable capacity in kWh
  wltpRange: number; // WLTP range in km
  chemistry: 'NMC' | 'LFP' | 'NCA' | 'NCMA';
  baseDegration: number;
  efficiency: number; // Wh/km
  estimatedFleet: number;
  image?: string;
}

export const EV_DATABASE: EVDatabaseEntry[] = [
  // TESLA
  { id: 'tesla-model3-lr', make: 'Tesla', model: 'Model 3 Long Range', year: 2024, batteryCapacity: 75.0, wltpRange: 602, chemistry: 'NCA', baseDegration: 1.4, efficiency: 14.5, estimatedFleet: 25000 },
  { id: 'tesla-model3-sr', make: 'Tesla', model: 'Model 3 Standard Range', year: 2024, batteryCapacity: 50.0, wltpRange: 430, chemistry: 'NCA', baseDegration: 1.4, efficiency: 14.8, estimatedFleet: 18000 },
  { id: 'tesla-modely-lr', make: 'Tesla', model: 'Model Y Long Range', year: 2024, batteryCapacity: 75.0, wltpRange: 533, chemistry: 'NCA', baseDegration: 1.4, efficiency: 16.5, estimatedFleet: 22104 },
  { id: 'tesla-modelx-lr', make: 'Tesla', model: 'Model X Long Range', year: 2024, batteryCapacity: 100.0, wltpRange: 580, chemistry: 'NCA', baseDegration: 1.5, efficiency: 18.0, estimatedFleet: 8500 },
  
  // VOLKSWAGEN
  { id: 'vw-id4-pro', make: 'Volkswagen', model: 'ID.4 Pro (77 kWh)', year: 2024, batteryCapacity: 77.0, wltpRange: 522, chemistry: 'NMC', baseDegration: 1.5, efficiency: 17.0, estimatedFleet: 12300 },
  { id: 'vw-id4-std', make: 'Volkswagen', model: 'ID.4 Standard (52 kWh)', year: 2024, batteryCapacity: 52.0, wltpRange: 385, chemistry: 'NMC', baseDegration: 1.6, efficiency: 17.2, estimatedFleet: 9800 },
  { id: 'vw-id5-pro', make: 'Volkswagen', model: 'ID.5 Pro (77 kWh)', year: 2024, batteryCapacity: 77.0, wltpRange: 480, chemistry: 'NMC', baseDegration: 1.5, efficiency: 17.8, estimatedFleet: 7200 },
  { id: 'vw-idbuzz', make: 'Volkswagen', model: 'ID.Buzz Standard (82 kWh)', year: 2024, batteryCapacity: 82.0, wltpRange: 415, chemistry: 'NMC', baseDegration: 1.8, efficiency: 19.7, estimatedFleet: 4100 },
  
  // AUDI
  { id: 'audi-q4-40', make: 'Audi', model: 'Q4 e-tron 40', year: 2024, batteryCapacity: 77.0, wltpRange: 520, chemistry: 'NMC', baseDegration: 1.5, efficiency: 18.0, estimatedFleet: 7300 },
  { id: 'audi-q4-50', make: 'Audi', model: 'Q4 e-tron 50', year: 2024, batteryCapacity: 82.0, wltpRange: 600, chemistry: 'NMC', baseDegration: 1.5, efficiency: 18.5, estimatedFleet: 8900 },
  { id: 'audi-a6-etron', make: 'Audi', model: 'A6 e-tron', year: 2024, batteryCapacity: 100.0, wltpRange: 756, chemistry: 'NMC', baseDegration: 1.4, efficiency: 16.0, estimatedFleet: 5600 },
  { id: 'audi-e-tron-55', make: 'Audi', model: 'e-tron 55', year: 2024, batteryCapacity: 95.0, wltpRange: 451, chemistry: 'NMC', baseDegration: 1.6, efficiency: 20.0, estimatedFleet: 6200 },
  
  // BMW
  { id: 'bmw-i4-edrive40', make: 'BMW', model: 'i4 eDrive40', year: 2024, batteryCapacity: 80.7, wltpRange: 590, chemistry: 'NMC', baseDegration: 1.4, efficiency: 16.5, estimatedFleet: 4100 },
  { id: 'bmw-i3-std', make: 'BMW', model: 'i3 Standard', year: 2024, batteryCapacity: 42.0, wltpRange: 301, chemistry: 'NMC', baseDegration: 2.0, efficiency: 17.5, estimatedFleet: 15200 },
  { id: 'bmw-ix3-std', make: 'BMW', model: 'iX3 Standard', year: 2024, batteryCapacity: 80.0, wltpRange: 460, chemistry: 'NMC', baseDegration: 1.6, efficiency: 18.8, estimatedFleet: 5800 },
  { id: 'bmw-ix-xdrive50', make: 'BMW', model: 'iX xDrive50', year: 2024, batteryCapacity: 111.5, wltpRange: 630, chemistry: 'NMC', baseDegration: 1.6, efficiency: 19.0, estimatedFleet: 3200 },
  
  // HYUNDAI
  { id: 'hyundai-ioniq5-77', make: 'Hyundai', model: 'IONIQ 5 (77 kWh)', year: 2024, batteryCapacity: 77.4, wltpRange: 507, chemistry: 'NMC', baseDegration: 1.4, efficiency: 17.8, estimatedFleet: 6200 },
  { id: 'hyundai-ioniq5-58', make: 'Hyundai', model: 'IONIQ 5 (58 kWh)', year: 2024, batteryCapacity: 58.0, wltpRange: 385, chemistry: 'NMC', baseDegration: 1.5, efficiency: 17.6, estimatedFleet: 4800 },
  { id: 'hyundai-kona-64', make: 'Hyundai', model: 'Kona Electric (64 kWh)', year: 2024, batteryCapacity: 64.0, wltpRange: 484, chemistry: 'NMC', baseDegration: 1.8, efficiency: 15.4, estimatedFleet: 11200 },
  { id: 'hyundai-kona-39', make: 'Hyundai', model: 'Kona Electric (39 kWh)', year: 2024, batteryCapacity: 39.0, wltpRange: 305, chemistry: 'NMC', baseDegration: 2.0, efficiency: 15.6, estimatedFleet: 8900 },
  { id: 'hyundai-ioniq6-std', make: 'Hyundai', model: 'IONIQ 6 Standard', year: 2024, batteryCapacity: 53.0, wltpRange: 408, chemistry: 'NMC', baseDegration: 1.5, efficiency: 15.2, estimatedFleet: 3400 },
  
  // KIA
  { id: 'kia-ev6-77', make: 'Kia', model: 'EV6 (77 kWh)', year: 2024, batteryCapacity: 77.4, wltpRange: 528, chemistry: 'NMC', baseDegration: 1.4, efficiency: 17.2, estimatedFleet: 5400 },
  { id: 'kia-niro-64', make: 'Kia', model: 'Niro EV (64 kWh)', year: 2024, batteryCapacity: 64.0, wltpRange: 460, chemistry: 'NMC', baseDegration: 1.7, efficiency: 16.5, estimatedFleet: 6800 },
  { id: 'kia-soul-64', make: 'Kia', model: 'Soul EV (64 kWh)', year: 2024, batteryCapacity: 64.0, wltpRange: 450, chemistry: 'NMC', baseDegration: 1.8, efficiency: 16.8, estimatedFleet: 5200 },
  { id: 'kia-picanto-39', make: 'Kia', model: 'e-Picanto (39 kWh)', year: 2024, batteryCapacity: 39.0, wltpRange: 305, chemistry: 'NMC', baseDegration: 2.1, efficiency: 15.7, estimatedFleet: 2800 },
  
  // RENAULT
  { id: 'renault-zoe-50', make: 'Renault', model: 'Zoe ZE50 (52 kWh)', year: 2024, batteryCapacity: 52.0, wltpRange: 395, chemistry: 'NMC', baseDegration: 2.1, efficiency: 17.0, estimatedFleet: 28400 },
  { id: 'renault-5-52', make: 'Renault', model: '5 E-Tech (52 kWh)', year: 2024, batteryCapacity: 52.0, wltpRange: 400, chemistry: 'NMC', baseDegration: 1.9, efficiency: 16.5, estimatedFleet: 8200 },
  { id: 'renault-megane-60', make: 'Renault', model: 'Mégane E-Tech (60 kWh)', year: 2024, batteryCapacity: 60.0, wltpRange: 450, chemistry: 'NMC', baseDegration: 1.6, efficiency: 16.8, estimatedFleet: 5900 },
  { id: 'renault-scenic-87', make: 'Renault', model: 'Scénic E-Tech (87 kWh)', year: 2024, batteryCapacity: 87.0, wltpRange: 625, chemistry: 'NMC', baseDegration: 1.5, efficiency: 17.2, estimatedFleet: 4100 },
  
  // SKODA
  { id: 'skoda-enyaq-80', make: 'Škoda', model: 'Enyaq iV 80', year: 2024, batteryCapacity: 77.0, wltpRange: 544, chemistry: 'NMC', baseDegration: 1.5, efficiency: 17.5, estimatedFleet: 9850 },
  { id: 'skoda-enyaq-60', make: 'Škoda', model: 'Enyaq iV 60', year: 2024, batteryCapacity: 60.0, wltpRange: 430, chemistry: 'NMC', baseDegration: 1.6, efficiency: 17.4, estimatedFleet: 8200 },
  { id: 'skoda-citigo-36', make: 'Škoda', model: 'Citigo e iV (36 kWh)', year: 2024, batteryCapacity: 36.0, wltpRange: 265, chemistry: 'NMC', baseDegration: 2.2, efficiency: 16.0, estimatedFleet: 4500 },
  
  // NISSAN
  { id: 'nissan-leaf-40', make: 'Nissan', model: 'Leaf (40 kWh)', year: 2024, batteryCapacity: 40.0, wltpRange: 270, chemistry: 'NMC', baseDegration: 2.7, efficiency: 17.0, estimatedFleet: 32000 },
  { id: 'nissan-leaf-60', make: 'Nissan', model: 'Leaf (62 kWh)', year: 2024, batteryCapacity: 62.0, wltpRange: 435, chemistry: 'NMC', baseDegration: 2.3, efficiency: 17.2, estimatedFleet: 8900 },
  { id: 'nissan-ariya-63', make: 'Nissan', model: 'Ariya (63 kWh)', year: 2024, batteryCapacity: 63.0, wltpRange: 452, chemistry: 'NMC', baseDegration: 1.6, efficiency: 16.5, estimatedFleet: 3200 },
  
  // PEUGEOT
  { id: 'peugeot-e208-50', make: 'Peugeot', model: 'e-208 (50 kWh)', year: 2024, batteryCapacity: 50.0, wltpRange: 362, chemistry: 'NMC', baseDegration: 1.9, efficiency: 17.3, estimatedFleet: 7800 },
  { id: 'peugeot-e2008-50', make: 'Peugeot', model: 'e-2008 (50 kWh)', year: 2024, batteryCapacity: 50.0, wltpRange: 340, chemistry: 'NMC', baseDegration: 2.0, efficiency: 18.5, estimatedFleet: 6500 },
  { id: 'peugeot-e5008-98', make: 'Peugeot', model: 'e-5008 (98 kWh)', year: 2024, batteryCapacity: 98.0, wltpRange: 625, chemistry: 'NMC', baseDegration: 1.5, efficiency: 18.2, estimatedFleet: 2100 },
  
  // CITROËN
  { id: 'citroen-e-c3-44', make: 'Citroën', model: 'e-C3 (44 kWh)', year: 2024, batteryCapacity: 44.0, wltpRange: 320, chemistry: 'LFP', baseDegration: 1.2, efficiency: 17.5, estimatedFleet: 5600 },
  { id: 'citroen-e-c4-54', make: 'Citroën', model: 'e-C4 (54 kWh)', year: 2024, batteryCapacity: 54.0, wltpRange: 380, chemistry: 'LFP', baseDegration: 1.3, efficiency: 17.8, estimatedFleet: 4200 },
  
  // FORD
  { id: 'ford-mustang-mach-e-71', make: 'Ford', model: 'Mustang Mach-E (71 kWh)', year: 2024, batteryCapacity: 71.0, wltpRange: 540, chemistry: 'NMC', baseDegration: 1.5, efficiency: 17.5, estimatedFleet: 3800 },
  { id: 'ford-e-transit-68', make: 'Ford', model: 'E-Transit (68 kWh)', year: 2024, batteryCapacity: 68.0, wltpRange: 338, chemistry: 'NMC', baseDegration: 2.1, efficiency: 20.1, estimatedFleet: 1200 },
  
  // VOLVO
  { id: 'volvo-xc40-82', make: 'Volvo', model: 'XC40 Recharge (82 kWh)', year: 2024, batteryCapacity: 82.0, wltpRange: 528, chemistry: 'NMC', baseDegration: 1.5, efficiency: 18.5, estimatedFleet: 5200 },
  { id: 'volvo-c40-82', make: 'Volvo', model: 'C40 Recharge (82 kWh)', year: 2024, batteryCapacity: 82.0, wltpRange: 540, chemistry: 'NMC', baseDegration: 1.5, efficiency: 18.2, estimatedFleet: 2800 },
  
  // FIAT
  { id: 'fiat-500e-42', make: 'Fiat', model: '500e (42 kWh)', year: 2024, batteryCapacity: 42.0, wltpRange: 300, chemistry: 'NMC', baseDegration: 2.0, efficiency: 16.7, estimatedFleet: 6800 },
  { id: 'fiat-600e-54', make: 'Fiat', model: '600e (54 kWh)', year: 2024, batteryCapacity: 54.0, wltpRange: 380, chemistry: 'NMC', baseDegration: 1.8, efficiency: 17.2, estimatedFleet: 3400 },
  
  // JEEP
  { id: 'jeep-wrangler-82', make: 'Jeep', model: 'Wrangler 4xe (82 kWh)', year: 2024, batteryCapacity: 17.3, wltpRange: 85, chemistry: 'NMC', baseDegration: 1.8, efficiency: 22.0, estimatedFleet: 1800 },
  
  // MINI
  { id: 'mini-cooper-54', make: 'Mini', model: 'Cooper SE (54 kWh)', year: 2024, batteryCapacity: 54.0, wltpRange: 405, chemistry: 'NMC', baseDegration: 1.9, efficiency: 16.8, estimatedFleet: 4100 },
  
  // CHEVROLET (Europe)
  { id: 'chevrolet-bolt-66', make: 'Chevrolet', model: 'Bolt EV (66 kWh)', year: 2024, batteryCapacity: 66.0, wltpRange: 479, chemistry: 'NMC', baseDegration: 1.7, efficiency: 16.5, estimatedFleet: 2200 },
  
  // MG
  { id: 'mg-4-51', make: 'MG', model: 'MG4 (51 kWh)', year: 2024, batteryCapacity: 51.0, wltpRange: 370, chemistry: 'LFP', baseDegration: 1.1, efficiency: 17.3, estimatedFleet: 9200 },
  { id: 'mg-zs-72', make: 'MG', model: 'ZS EV (72 kWh)', year: 2024, batteryCapacity: 72.0, wltpRange: 520, chemistry: 'LFP', baseDegration: 1.2, efficiency: 17.5, estimatedFleet: 7100 },
  
  // SAIC (MAXUS EV80)
  { id: 'maxus-ev80-52', make: 'Maxus', model: 'EV80 (52 kWh)', year: 2024, batteryCapacity: 52.0, wltpRange: 380, chemistry: 'NMC', baseDegration: 2.0, efficiency: 18.5, estimatedFleet: 800 },
  
  // DACIA
  { id: 'dacia-spring-45', make: 'Dacia', model: 'Spring (45 kWh)', year: 2024, batteryCapacity: 45.0, wltpRange: 305, chemistry: 'NMC', baseDegration: 2.2, efficiency: 17.0, estimatedFleet: 12500 },
  
  // LADA
  { id: 'lada-vesta-54', make: 'Lada', model: 'Vesta EV (54 kWh)', year: 2024, batteryCapacity: 54.0, wltpRange: 360, chemistry: 'LFP', baseDegration: 1.3, efficiency: 17.8, estimatedFleet: 3200 },
  
  // ORA (Great Wall)
  { id: 'ora-good-cat-51', make: 'ORA', model: 'Good Cat (51 kWh)', year: 2024, batteryCapacity: 51.0, wltpRange: 370, chemistry: 'LFP', baseDegration: 1.1, efficiency: 17.3, estimatedFleet: 6400 },
  
  // CUPRA
  { id: 'cupra-born-82', make: 'Cupra', model: 'Born (82 kWh)', year: 2024, batteryCapacity: 82.0, wltpRange: 567, chemistry: 'NMC', baseDegration: 1.4, efficiency: 16.8, estimatedFleet: 2800 },
  
  // OPEL
  { id: 'opel-corsa-50', make: 'Opel', model: 'Corsa-e (50 kWh)', year: 2024, batteryCapacity: 50.0, wltpRange: 357, chemistry: 'NMC', baseDegration: 1.9, efficiency: 17.5, estimatedFleet: 5600 },
  { id: 'opel-astra-60', make: 'Opel', model: 'Astra-e (60 kWh)', year: 2024, batteryCapacity: 60.0, wltpRange: 425, chemistry: 'NMC', baseDegration: 1.7, efficiency: 17.6, estimatedFleet: 3200 },
  
  // LANCIA
  { id: 'lancia-ypsilon-44', make: 'Lancia', model: 'Ypsilon (44 kWh)', year: 2024, batteryCapacity: 44.0, wltpRange: 320, chemistry: 'NMC', baseDegration: 2.0, efficiency: 17.0, estimatedFleet: 2100 },
];

export const getEVById = (id: string): EVDatabaseEntry | undefined => {
  return EV_DATABASE.find(ev => ev.id === id);
};

export const getEVsByMake = (make: string): EVDatabaseEntry[] => {
  return EV_DATABASE.filter(ev => ev.make.toLowerCase() === make.toLowerCase());
};

export const searchEVs = (query: string): EVDatabaseEntry[] => {
  const lowerQuery = query.toLowerCase();
  return EV_DATABASE.filter(ev => 
    ev.make.toLowerCase().includes(lowerQuery) ||
    ev.model.toLowerCase().includes(lowerQuery) ||
    `${ev.make} ${ev.model}`.toLowerCase().includes(lowerQuery)
  );
};

export const EVDatabaseStats = {
  totalVehicles: EV_DATABASE.length,
  makes: Array.from(new Set(EV_DATABASE.map(ev => ev.make))),
  chemistries: Array.from(new Set(EV_DATABASE.map(ev => ev.chemistry))),
};
