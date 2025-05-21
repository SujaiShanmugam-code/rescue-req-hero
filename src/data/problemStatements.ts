
import { ProblemStatement } from "../types/game.types";

export const problemStatements: ProblemStatement[] = [
  {
    id: 1,
    title: "Underground Smoke Detection System",
    description: `Mary is the safety manager at an underground tunnel construction site. Recent incidents have highlighted the need for a smoke detection system to ensure worker safety. The system should detect smoke quickly, alert workers, and provide management with information about the incident.

The system needs to be integrated with existing safety infrastructure and be easy to use by safety personnel.`,
    requirements: [
      { id: 1, name: "Real-time smoke detection", isCorrect: true },
      { id: 2, name: "User interface", isCorrect: true },
      { id: 3, name: "Dashboard", isCorrect: true },
      { id: 4, name: "Cloud integration", isCorrect: false },
      { id: 5, name: "Database system", isCorrect: true },
      { id: 6, name: "Alert mechanism", isCorrect: true },
      { id: 7, name: "Connectivity", isCorrect: false },
      { id: 8, name: "Device compatibility", isCorrect: false },
      { id: 9, name: "Data logging", isCorrect: false },
      { id: 10, name: "Sensor integration module", isCorrect: true },
      { id: 11, name: "Threshold-based alerts", isCorrect: false },
    ],
    level: 1,
    timeLimit: 300 // 5 minutes
  },
  {
    id: 2,
    title: "Hospital Management System",
    description: `Central City Hospital needs a system to manage patient records, appointments, and medical staff schedules. The system should ensure data security, be accessible 24/7, and integrate with existing medical equipment.

The system must comply with healthcare regulations and provide statistical reports for management.`,
    requirements: [
      { id: 1, name: "Patient records management", isCorrect: true },
      { id: 2, name: "Appointment scheduling", isCorrect: true },
      { id: 3, name: "Staff management", isCorrect: true },
      { id: 4, name: "Mobile compatibility", isCorrect: false },
      { id: 5, name: "Data security protocols", isCorrect: true },
      { id: 6, name: "24/7 system availability", isCorrect: true },
      { id: 7, name: "Cloud backup", isCorrect: false },
      { id: 8, name: "Reporting capabilities", isCorrect: true },
      { id: 9, name: "Voice recognition", isCorrect: false },
      { id: 10, name: "Multi-language support", isCorrect: false },
      { id: 11, name: "Equipment integration", isCorrect: false },
    ],
    level: 2,
    timeLimit: 300 // 5 minutes
  }
];
